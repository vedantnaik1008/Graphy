import { get, ref, set } from "firebase/database";
import { database } from "../FirebaseConfig";

export const PostData = async(Name) => {
   const tabsRef = ref(database, 'Tabs/0/tabs');
    try {
        // Fetch existing tabs to determine the next ID
        const snapshot = await get(tabsRef);
        let newId = 0; // Start from 0
        if (snapshot.exists()) {
            const tabs = snapshot.val();
            const ids = Object.keys(tabs).map(id => parseInt(id)); // Convert string keys to integers
            newId = Math.max(...ids) + 1; // Increment the highest ID found
        }

        // Create a reference with the new sequential ID
        const newTabRef = ref(database, `Tabs/0/tabs/${newId}`);

        // Set the data
        await set(newTabRef, {
            completed: 'false',
            completedIcon: 'completedIcon',
            icon: 'PDF',
            name: `${Name}`,
            sub: [
                { name: 'full book' },
                { name: 'summary' },
                { name: 'audio summary' }
            ]
        });

        console.log('Data added with sequential ID:', newId);
    } catch (error) {
        console.error('Error adding data:', error);
    }
}