import { ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../FirebaseConfig';
import { PostData } from '../data/PostData';

const UseForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        nameError: '',
        folders: [{ folderName: '', files: [] }]
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (folderIndex, e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => {
            const updatedFolders = [...prevData.folders];
            updatedFolders[folderIndex].files = files;
            return { ...prevData, folders: updatedFolders };
        });
    };

    const handleFolderNameChange = (index, e) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const updatedFolders = [...prevData.folders];
            updatedFolders[index].folderName = value;
            return { ...prevData, folders: updatedFolders };
        });
    };

    const addFolder = () => {
        setFormData((prevData) => ({
            ...prevData,
            folders: [...prevData.folders, { folderName: '', files: [] }]
        }));
    };

    const removeFolder = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            folders: prevData.folders.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.name.length <= 3) {
            setFormData((prevData) => ({
                ...prevData,
                nameError: 'Name must be at least 4 characters.'
            }));
            setLoading(false);
            return;
        }

        try {
            // Loop through each folder to upload files
            for (const folder of formData.folders) {
                const baseFolderPath = `Books/${formData.name}/${folder.folderName}`;

                // Prepare file upload promises for this folder
                const uploadPromises = folder.files.map((file) => {
                    const fileRef = ref(
                        storage,
                        `${baseFolderPath}/${file.name}`
                    );
                    return uploadBytes(fileRef, file).then(() => {
                        console.log(`${file.name} uploaded successfully`);
                    });
                });

                // Upload all files in the current folder in parallel
                await Promise.all(uploadPromises);
            }

            console.log('All files uploaded to Firebase.');
            PostData(formData.name, formData.folders);
            alert('Files Uploaded Successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Upload failed: ', error);
            alert('File Upload failed');
        } finally {
            setLoading(false);
            setFormData({
                name: '',
                nameError: '',
                folders: [{ folderName: '', files: [] }]
            });
        }
    };

    return {
        handleChange,
        handleFileChange,
        handleFolderNameChange,
        addFolder,
        removeFolder,
        handleSubmit,
        loading,
        formData
    };
};

export default UseForm;