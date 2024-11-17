import { get, ref, remove, set, update } from 'firebase/database';
import { database, storage } from '../FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { uploadBytes, ref as refs, listAll, deleteObject } from 'firebase/storage';

export const PostData = async (userId, title, name, folders, uniqueId) => {
    // Log the inputs to ensure title, name, and folders are correctly received
    console.log('PostData received:', {
        userId,
        title,
        name,
        folders,
        uniqueId
    });

    // Check if title is provided, otherwise return an error
    if (!title || title.trim() === '') {
        console.error('Title is required and cannot be empty');
        return;
    }

    const tabsRef = ref(database, `users/${userId}/course`); // Reference to the Tabs collection

    try {
        // Fetch all existing tabs to check if the title already exists
        const snapshot = await get(tabsRef);
        let newId = 0; // Default value if no tabs exist

        if (snapshot.exists()) {
            const tabs = snapshot.val();
            const ids = Object.keys(tabs).map((id) => parseInt(id, 10)); // Convert keys to integers
            newId = Math.max(...ids) + 1; // Get next available ID
        }

        // Log the new ID for the course
        console.log('Next available ID:', newId);

        // Title doesn't exist, create a new title with tabs
        const subTabs = folders.map((folder) => ({
            name: folder.folderName,
            files: folder.files.map((file) => ({
                name: file.name,
                type: file.type
            })),
            subFolders: folder.subFolders
                .filter((subFolder) => subFolder.files.length > 0) // Only include non-empty subfolders
                .map((subFolder) => ({
                    name: subFolder.subFolderName,
                    files: subFolder.files.map((file) => ({
                        name: file.name,
                        type: file.type
                    }))
                }))
        }));

        await set(ref(database, `users/${userId}/course/${newId}`), {
            title: title,
            uniqueId: uniqueId,
            tabs: [
                {
                    completed: 'false',
                    completedIcon: 'completedIcon',
                    icon: 'PDF',
                    name: name,
                    sub: subTabs
                }
            ]
        });
        console.log(`Created new title and added new tab: ${title}`);
    } catch (error) {
        // Log the error and rethrow
        console.error('Error adding data:', error);
        throw new Error('Error adding data to Firebase: ' + error.message);
    }
};

export const postUserData = async (email, userId, role) => {
    try {
        await set(ref(database, 'users/' + userId), {
            email: email,
            role: role,
            lastLogin: Date.now(),
            createdAt: Date.now()
        });
        console.log('User data posted successfully');
    } catch (error) {
        console.error('Error posting user data:', error);
    }
};

export const removeUserData = async (userId) => {
    try {
        await remove(ref(database, 'users/' + userId));
        console.log(`User data removed for ${userId}`);
    } catch (error) {
        console.error('Error removing user data:', error);
    }
};

export const getUserData = async (userId) => {
    try {
        const snapshot = await get(ref(database, 'users/' + userId));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const uploadAndPostSeries = async (series, userId) => {
    // Generate a unique ID for this upload session
    const uniqueId = uuidv4();

    console.log(`Generated unique ID: ${uniqueId}`); // Log the unique ID for reference

    // Loop through each folder to upload files
    for (const folder of series.folders) {
        const baseFolderPath = `Books/${userId}/${uniqueId}/${series.title}/${series.name}/${folder.folderName}`;

        // Upload files in the main folder
        const uploadPromises = folder.files.map((file) => {
            const fileRef = refs(storage, `${baseFolderPath}/${file.name}`);
            return uploadBytes(fileRef, file).then(() => {
                console.log(`${file.name} uploaded successfully`);
            });
        });

        // Loop through each subfolder to upload files, if any
        for (const subFolder of folder.subFolders || []) {
            const subFolderPath = `${baseFolderPath}/${subFolder.subFolderName}`;
            const subFolderUploadPromises = subFolder.files.map((file) => {
                const fileRef = refs(storage, `${subFolderPath}/${file.name}`);
                return uploadBytes(fileRef, file).then(() => {
                    console.log(
                        `${file.name} uploaded successfully in ${subFolder.subFolderName}`
                    );
                });
            });

            // Upload all files in the current subfolder in parallel
            await Promise.all(subFolderUploadPromises);
        }

        // Upload all files in the main folder in parallel
        await Promise.all(uploadPromises);
    }

    console.log('All files uploaded to Firebase.');

    // Save data with the auto-generated unique ID
    await PostData(userId, series.title, series.name, series.folders, uniqueId);
};

const deleteFilesInPath = async (folderPath) => {
    const folderRef = refs(storage, folderPath);

    try {
        // List all files and subfolders
        const listResult = await listAll(folderRef);

        // Delete all files in the current folder
        const fileDeletionPromises = listResult.items.map((itemRef) =>
            deleteObject(itemRef)
        );

        // Recursively delete all subfolders
        const folderDeletionPromises = listResult.prefixes.map((subFolderRef) =>
            deleteFilesInPath(subFolderRef.fullPath)
        );

        // Wait for all deletions to complete
        await Promise.all([...fileDeletionPromises, ...folderDeletionPromises]);

        console.log(`Deleted all files and folders in ${folderPath}`);
    } catch (error) {
        console.error(
            `Failed to delete files in ${folderPath}: ${error.message}`
        );
        throw error; // Re-throw to allow upstream handling
    }
};


const updateBooks = async (series, userId, uniqueId) => {
    try {
        const baseFolderPath = `Books/${userId}/${uniqueId}`;
        await deleteFilesInPath(baseFolderPath);
        // Loop through each folder in the series to upload files and subfolders
        const folderUpdates = series.folders.map((folder) => {
            const folderPath = `${baseFolderPath}/${series.title}/${series.name}/${folder.folderName}`;

            // Upload files in the main folder
            const uploadPromises = folder.files.map((file) => {
                const fileRef = refs(
                    storage,
                    `${folderPath}/${file.name}`
                );
                return uploadBytes(fileRef, file)
                    .then(() => {
                        console.log(
                            `${file.name} uploaded successfully to ${folderPath}`
                        );
                    })
                    .catch((error) => {
                        console.error(
                            `Failed to upload ${file.name} to ${folderPath}: ${error.message}`
                        );
                    });
            });

            // Upload files in subfolders if any
            const subFolderUpdates = folder.subFolders.map((subFolder) => {
                const subFolderPath = `${folderPath}/${subFolder.subFolderName}`;
                const subFolderPromises = subFolder.files.map((file) => {
                    const fileRef = refs(
                        storage,
                        `${subFolderPath}/${file.name}`
                    );
                    return uploadBytes(fileRef, file)
                        .then(() => {
                            console.log(
                                `${file.name} uploaded successfully to ${subFolderPath}`
                            );
                        })
                        .catch((error) => {
                            console.error(
                                `Failed to upload ${file.name} in subfolder ${subFolder.subFolderName}: ${error.message}`
                            );
                        });
                });
                return Promise.all(subFolderPromises);
            });

            // Wait for all subfolder uploads and folder uploads to complete
            return Promise.all([
                Promise.all(uploadPromises),
                ...subFolderUpdates
            ]);
        });

        // Wait for all file uploads to complete
        await Promise.all(folderUpdates);
        console.log('All files uploaded successfully to Firebase Storage.');
    } catch (error) {
        console.error(
            'Failed to update books in Firebase Storage:',
            error.message
        );
        throw error; // Re-throw to allow upstream handling
    }
};


export const updateAndPostSeries = async (series, url, uniqueId) => {
    try {
        if (!url || typeof url !== 'string') {
            throw new Error('Invalid URL.');
        }
        const tabsRef = ref(database, url); // Reference to the Tabs collection
        const updatedTabs = [
            {
                completed: 'false',
                completedIcon: 'completedIcon',
                icon: 'PDF',
                name: series.name,
                sub: series.folders.map((folder) => ({
                    name: folder.folderName,
                    files: folder.files.map((file) => ({
                        name: file.name,
                        type: file.type
                    })),
                    subFolders: folder.subFolders
                        .filter((subFolder) => subFolder.files.length > 0) // Only include non-empty subfolders
                        .map((subFolder) => ({
                            name: subFolder.subFolderName,
                            files: subFolder.files.map((file) => ({
                                name: file.name,
                                type: file.type
                            }))
                        }))
                }))
            }
        ];

        await update(tabsRef, {
            uniqueId: uniqueId,
            title: series.title,
            tabs: updatedTabs
        });
        console.log('Series updated successfully:', updatedTabs);
        const userId = url.split('/').slice(1, 2);
        await updateBooks(series, userId, uniqueId);
    } catch (error) {
        console.error('Failed to update series:', error.message);
        throw error; // Re-throw to allow upstream handling
    }
};
