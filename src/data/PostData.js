import { get, ref, set } from "firebase/database";
import { database } from "../FirebaseConfig";

export const PostData = async (name, folders) => {
    const tabsRef = ref(database, 'Tabs/0/tabs');

    try {
        // Fetch existing tabs to determine the next available ID
        const snapshot = await get(tabsRef);
        let newId = 0; // Start from 0
        if (snapshot.exists()) {
            const tabs = snapshot.val();
            const ids = Object.keys(tabs).map((id) => parseInt(id, 10)); // Convert keys to integers
            newId = Math.max(...ids) + 1; // Get next ID
        }

        // Create a reference with the new sequential ID
        const newTabRef = ref(database, `Tabs/0/tabs/${newId}`);

        // Map the folder names to the `sub` structure
        const subTabs = folders.map((folder) => ({
            name: folder.folderName,
            files: folder.files.map((file) => ({
                name: file.name,
                type: file.type
            }))
        }));

        // Set the data with dynamic folders and files
        await set(newTabRef, {
            completed: 'false',
            completedIcon: 'completedIcon',
            icon: 'PDF',
            name: name,
            sub: subTabs
        });

        console.log('Data added with sequential ID:', newId);
    } catch (error) {
        console.error('Error adding data:', error);
    }
};