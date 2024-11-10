import { get, ref, remove, set, update } from 'firebase/database';
import { database } from '../FirebaseConfig';

export const PostData = async (userId , title, name, folders) => {
    // Log the inputs to ensure title, name, and folders are correctly received
    console.log('PostData received:', {userId, title, name, folders });

    // Check if title is provided, otherwise return an error
    if (!title || title.trim() === '') {
        console.error('Title is required and cannot be empty');
        return;
    }

    const tabsRef = ref(database, `course/${userId}`); // Reference to the Tabs collection

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
        const titleRef = ref(database, `course/${userId}/${newId}`);

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
            await update(ref(database, `course/${userId}/${newId}`), {
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

            await set(ref(database, `course/${userId}/${newId}`), {
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