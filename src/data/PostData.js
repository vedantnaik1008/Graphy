import { get, ref, remove, set, update } from 'firebase/database';
import { database, storage } from '../FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import {
    uploadBytes,
    ref as refs,
    listAll,
    deleteObject
} from 'firebase/storage';
import { toast } from 'react-toastify';

export const checkUserExistence = async (uid) => {
    const userRef = ref(database, `/users/${uid}`);

    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return true; // User exists
        } else {
            return false; // User doesn't exist
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false; // Error occurred, assume user doesn't exist
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

const unique = uuidv4();

export const PostData = async (
    userId,
    series,
    title,
    name,
    folders,
    uniqueId
) => {
    // Log the inputs to ensure title, name, and folders are correctly received
    console.log('PostData received:', {
        userId,
        title,
        series,
        name,
        folders,
        uniqueId
    });

    // Check if title is provided, otherwise return an error
    // if (!title || title.trim() === '') {
    //     console.error('Title is required and cannot be empty');
    //     return;
    // }

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
        const subTabs = folders.map((folder, index) => ({
            name: folder.folderName,
            id: index,
            files: folder.files.map((file, index) => ({
                name: file.name,
                id: index,
                type: file.type
            })),
            subFolders: folder.subFolders
                .filter((subFolder) => subFolder.files.length > 0) // Only include non-empty subfolders
                .map((subFolder, index) => ({
                    name: subFolder.subFolderName,
                    id: index,
                    files: subFolder.files.map((file, index) => ({
                        name: file.name,
                        id: index,
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
                    id: unique,
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

export const uploadAndPostSeries = async (series, userId) => {
    // Generate a unique ID for this upload session
    const uniqueId = uuidv4();

    console.log(`Generated unique ID: ${uniqueId}`); // Log the unique ID for reference

    // Loop through each folder to upload files
    for (const [folderIndex, folder] of series.folders.entries()) {
        // Use index instead of series.name and folder name
        const baseFolderPath = `Books/${userId}/${uniqueId}/${unique}/${folderIndex}`;

        // Upload files in the main folder
        const uploadPromises = folder.files.map((file, fileIndex) => {
            const fileRef = refs(storage, `${baseFolderPath}/${file.name}`);
            return uploadBytes(fileRef, file).then(() => {
                toast.success(`File ${file.name} uploaded successfully`);
            });
        });

        // Loop through each subfolder to upload files, if any
        for (const [subFolderIndex, subFolder] of folder.subFolders.entries()) {
            const subFolderPath = `${baseFolderPath}/${subFolderIndex}`;
            const subFolderUploadPromises = subFolder.files.map(
                (file, fileIndex) => {
                    const fileRef = refs(
                        storage,
                        `${subFolderPath}/${file.name}`
                    );
                    return uploadBytes(fileRef, file).then(() => {
                        toast.success(
                            `File ${file.name} uploaded successfully`
                        );
                    });
                }
            );

            // Upload all files in the current subfolder in parallel
            await Promise.all(subFolderUploadPromises);
        }

        // Upload all files in the main folder in parallel
        await Promise.all(uploadPromises);
        toast.success('All files uploaded successfully');
    }

    await PostData(
        userId,
        series,
        series.title,
        series.name,
        series.folders,
        uniqueId
    );
};

const listFilesInPath = async (folderPath) => {
    const folderRef = refs(storage, folderPath);
    try {
        const listResult = await listAll(folderRef);
        return listResult.items.map((item) => item.name);
    } catch (error) {
        console.error(
            `Failed to list files in ${folderPath}: ${error.message}`
        );
        return []; // Return empty if the folder doesn't exist
    }
};

export const updateBooks = async (
    series,
    userId,
    uniqueId,
    unique,
    selectedCourse
) => {
    try {
        const baseFolderPath = `Books/${userId}/${uniqueId}/${unique}`;
        const existingFiles = await listFilesInPath(baseFolderPath);

        // Fetch existing course data from Firebase Realtime Database
        const courseRef = ref(database, selectedCourse);
        const courseSnapshot = await get(courseRef);
        let courseData = courseSnapshot.exists()
            ? courseSnapshot.val()
            : { tabs: [] };

        console.log(series);

        const courseInfo = [series][0];
        if (!courseInfo) {
            console.error('Series data is empty or incorrect');
            toast.error('Series data is missing.');
            return;
        }

        for (const folderIndex in courseInfo.folders) {
            const folder = courseInfo.folders[folderIndex];
            const folderPath = `${baseFolderPath}/${folderIndex}`;
            const existingFolderFiles = await listFilesInPath(folderPath);

            for (const file of folder.files) {
                if (!file || !(file instanceof Blob) || !file.name) {
                    console.warn(`Skipping invalid file:`, file);
                    continue;
                }

                const fileRef = refs(storage, `${folderPath}/${file.name}`);

                if (!existingFolderFiles.includes(file.name)) {
                    try {
                        await uploadBytes(fileRef, file);
                        toast.success(
                            `File ${file.name} uploaded successfully`
                        );
                    } catch (error) {
                        console.error(
                            `Failed to upload file ${file.name}:`,
                            error.message
                        );
                        toast.error(`Failed to upload ${file.name}`);
                        throw error;
                    }
                }
            }

            for (const subFolderIndex in folder.subFolders) {
                const subFolder = folder.subFolders[subFolderIndex];
                const subFolderPath = `${folderPath}/${subFolderIndex}`;
                const existingSubFolderFiles = await listFilesInPath(
                    subFolderPath
                );

                for (const file of subFolder.files) {
                    if (!file || !(file instanceof Blob) || !file.name) {
                        console.warn(`Skipping invalid file:`, file);
                        continue;
                    }

                    const fileRef = refs(
                        storage,
                        `${subFolderPath}/${file.name}`
                    );

                    if (!existingSubFolderFiles.includes(file.name)) {
                        try {
                            await uploadBytes(fileRef, file);
                            toast.success(
                                `File ${file.name} uploaded successfully`
                            );
                        } catch (error) {
                            console.error(
                                `Failed to upload file ${file.name}:`,
                                error.message
                            );
                            toast.error(`Failed to upload ${file.name}`);
                            throw error;
                        }
                    }
                }
            }
        }

        const updatedSubTabs = courseInfo.folders.map((folder, index) => ({
            name: folder.folderName,
            id: index,
            files: folder.files.map((file, fileIndex) => ({
                name: file.name,
                id: fileIndex,
                type: file.type
            })),
            subFolders: folder.subFolders
                .filter((subFolder) => subFolder.files.length > 0)
                .map((subFolder, subFolderIndex) => ({
                    name: subFolder.subFolderName,
                    id: subFolderIndex,
                    files: subFolder.files.map((file, fileIndex) => ({
                        name: file.name,
                        id: fileIndex,
                        type: file.type
                    }))
                }))
        }));

        const updatedCourseData = {
            title: courseInfo.title,
            uniqueId: uniqueId,
            tabs: [
                {
                    completed: 'false',
                    completedIcon: 'completedIcon',
                    icon: 'PDF',
                    id: unique,
                    name: courseInfo.name,
                    sub: updatedSubTabs
                }
            ]
        };

        await update(courseRef, updatedCourseData);

        console.log(
            'Updated files uploaded and course data updated successfully.'
        );
        toast.success(
            'Updated files uploaded and course data updated successfully.'
        );
    } catch (error) {
        console.error('Failed to update books:', error.message);
        toast.error('Failed to update books');
        throw error;
    }
};


export const fileToDelete = async (deleteFile) => {
    try {
        if (!deleteFile || deleteFile.length === 0) {
            console.log('No files to delete.');
            return;
        }
        console.log('Trying to delete:', deleteFile);
        const deletePromises = deleteFile.map(async (path) => {
            const fileRef = refs(storage, `Books/${path}`);
            console.log(`Trying to delete it: Books/${path}`);
            
            try {
                await deleteObject(fileRef);
                console.log(`Deleted: ${path}`);
            } catch (error) {
                console.error(`Failed to delete ${path}:`, error.message);
            }
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises);
        toast.success('File deleted successfully.');
        console.log('All selected files deleted successfully.');
    } catch (error) {
        if (error.code === "storage/object-not-found") {
      console.error("Error: File does not exist");}
        toast.error('Error deleting file.');

        console.error('Error deleting files:', error.message);
    }
};
