import { ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../FirebaseConfig';
import { PostData } from '../data/PostData';

const UseForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        nameError: '',
        folders: [
            {
                folderName: '',
                files: [],
                subFolders: [
                    {
                        subFolderName: '',
                        files: []
                    }
                ]
            }
        ]
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

    const handleSubFolderNameChange = (folderIndex, subFolderIndex, e) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const updatedFolders = [...prevData.folders];
            updatedFolders[folderIndex].subFolders[
                subFolderIndex
            ].subFolderName = value;
            return { ...prevData, folders: updatedFolders };
        });
    };

    const handleSubFolderFileChange = (folderIndex, subFolderIndex, e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => {
            const updatedFolders = [...prevData.folders];
            updatedFolders[folderIndex].subFolders[subFolderIndex].files =
                files;
            return { ...prevData, folders: updatedFolders };
        });
    };

    const addFolder = () => {
        setFormData((prevData) => ({
            ...prevData,
            folders: [
                ...prevData.folders,
                { folderName: '', files: [], subFolders: [] }
            ]
        }));
    };

    const addSubFolder = (folderIndex) => {
        setFormData((prevData) => {
            const updatedFolders = [...prevData.folders];
            updatedFolders[folderIndex].subFolders.push({
                subFolderName: '',
                files: []
            });
            return { ...prevData, folders: updatedFolders };
        });
    };

    const removeFolder = (folderIndex) => {
        setFormData((prevData) => ({
            ...prevData,
            folders: prevData.folders.filter(
                (_, index) => index !== folderIndex
            )
        }));
    };

    const removeSubFolder = (folderIndex, subFolderIndex) => {
        setFormData((prevData) => {
            const updatedFolders = [...prevData.folders];
            updatedFolders[folderIndex].subFolders = updatedFolders[
                folderIndex
            ].subFolders.filter((_, index) => index !== subFolderIndex);
            return { ...prevData, folders: updatedFolders };
        });
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

                // Upload files in the main folder
                const uploadPromises = folder.files.map((file) => {
                    const fileRef = ref(
                        storage,
                        `${baseFolderPath}/${file.name}`
                    );
                    return uploadBytes(fileRef, file).then(() => {
                        console.log(`${file.name} uploaded successfully`);
                    });
                });

                // Loop through each subfolder to upload files, if any
                for (const subFolder of folder.subFolders || []) {
                    const subFolderPath = `${baseFolderPath}/${subFolder.subFolderName}`;
                    const subFolderUploadPromises = subFolder.files.map(
                        (file) => {
                            const fileRef = ref(
                                storage,
                                `${subFolderPath}/${file.name}`
                            );
                            return uploadBytes(fileRef, file).then(() => {
                                console.log(
                                    `${file.name} uploaded successfully in ${subFolder.subFolderName}`
                                );
                            });
                        }
                    );

                    // Upload all files in the current subfolder in parallel
                    await Promise.all(subFolderUploadPromises);
                }

                // Upload all files in the main folder in parallel
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
                folders: [{ folderName: '', files: [], subFolders: [] }]
            });
        }
    };

    return {
        handleChange,
        handleFileChange,
        handleFolderNameChange,
        handleSubFolderNameChange,
        handleSubFolderFileChange,
        addFolder,
        addSubFolder,
        removeFolder,
        removeSubFolder,
        handleSubmit,
        loading,
        formData
    };
};

export default UseForm;
