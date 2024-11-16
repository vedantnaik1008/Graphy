import { get, ref, remove, set, update } from 'firebase/database';
import { database, storage } from '../FirebaseConfig';
import { uploadBytes, ref as refs, deleteObject, listAll } from 'firebase/storage';

export const PostData = async (userId , title, name, folders) => {
    // Log the inputs to ensure title, name, and folders are correctly received
    console.log('PostData received:', {userId, title, name, folders });

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

        // Create a reference for the new title
        const titleRef = ref(database, `users/${userId}/course/${newId}`);

        // Fetch all titles to check if the provided title already exists
        const titlesSnapshot = await get(tabsRef);
        let existingTitleData = null;

        // Check if the title already exists
        if (titlesSnapshot.exists()) {
            const titles = titlesSnapshot.val();
            existingTitleData = Object.values(titles).find(
                (tab) => tab.title === title
            );
        }

        // If the title exists, update it with the new tab, otherwise, create a new entry for the title
        if (existingTitleData) {
            // Add the new tab under the existing title
            const updatedTabs = [
                ...existingTitleData.tabs,
                {
                    completed: 'false',
                    completedIcon: 'completedIcon',
                    icon: 'PDF',
                    name: name,
                    sub: folders.map((folder) => ({
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

            // Update the existing title with the new tab
            await update(ref(database, `users/${userId}/course/${newId}`), {
                title: title,
                tabs: updatedTabs
            });
            console.log(`Added new tab to existing title: ${title}`);
        } else {
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
        }
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
    // Loop through each folder to upload files
    for (const folder of series.folders) {
        const baseFolderPath = `Books/${userId}/${series.name}/${folder.folderName}`;

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
    await PostData(userId, series.title, series.name, series.folders);
};

export const updateAndPostSeries = async (series, url, userId) => {
    console.log('Updating existing series:', { series });

    try {
        for (const folder of series.folders) {
            const baseFolderPath = `Books/${userId}/${series.name}/${folder.folderName}`;

            // Cleanup folder

            // Upload new files in the folder
            const uploadPromises = folder.files.map((file) => {
                const fileRef = refs(storage, `${baseFolderPath}/${file.name}`);
                return uploadBytes(fileRef, file).then(() => {
                    console.log(`${file.name} uploaded successfully.`);
                });
            });

            // Handle subfolders
            for (const subFolder of folder.subFolders || []) {
                const subFolderPath = `${baseFolderPath}/${subFolder.subFolderName}`;
                await deleteFolderContents(subFolderPath);

                const subFolderUploadPromises = subFolder.files.map((file) => {
                    const fileRef = refs(
                        storage,
                        `${subFolderPath}/${file.name}`
                    );
                    return uploadBytes(fileRef, file).then(() => {
                        console.log(`${file.name} uploaded to subfolder.`);
                    });
                });

                await Promise.all(subFolderUploadPromises);
            }

            await Promise.all(uploadPromises);
        }

        console.log('All files uploaded.');

        // Update database
        const tabsRef = ref(database, url);
        const snapshot = await get(tabsRef);

        if (snapshot.exists()) {
            const courseData = snapshot.val();
            const updatedTabs = courseData.tabs.map((tab) => {
                if (tab.name === series.name) {
                    return {
                        ...tab,
                        title: series.title,
                        sub: series.folders.map((folder) => ({
                            name: folder.folderName,
                            files: folder.files.map((file) => ({
                                name: file.name,
                                type: file.type,
                                path: `Books/${userId}/${series.name}/${folder.folderName}/${file.name}`
                            })),
                            subFolders: (folder.subFolders || []).map(
                                (subFolder) => ({
                                    name: subFolder.subFolderName,
                                    files: subFolder.files.map((file) => ({
                                        name: file.name,
                                        type: file.type,
                                        path: `Books/${userId}/${series.name}/${folder.folderName}/${subFolder.subFolderName}/${file.name}`
                                    }))
                                })
                            )
                        }))
                    };
                }
                return tab;
            });
            await update(tabsRef, { title: series.title, tabs: updatedTabs });
            console.log('Course updated successfully.');
        } else {
            console.error('Course not found at the specified URL.');
        }
    } catch (error) {
        console.error('Error updating series:', error);
    }
};


           



