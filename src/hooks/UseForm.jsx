import { ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../FirebaseConfig';
import { PostData } from '../data/PostData';
import useUserData from './useUserData';

const UseMultipleBookSeriesForm = () => {
    const [formData, setFormData] = useState({
        series: [
            {
                title: '',
                name: '',
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
            }
        ]
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {userID} = useUserData()

    const handleChange = (seriesIndex, e) => {
        if (!e.target) {
            console.error('Event target not found', e);
            return;
        }

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, index) =>
                index === seriesIndex ? { ...s, [name]: value } : s
            )
        }));
    };


    const handleFileChange = (seriesIndex, folderIndex, e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.map((f, fIdx) =>
                              fIdx === folderIndex ? { ...f, files } : f
                          )
                      }
                    : s
            )
        }));
    };

    const handleFolderNameChange = (seriesIndex, folderIndex, e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.map((f, fIdx) =>
                              fIdx === folderIndex
                                  ? { ...f, folderName: value }
                                  : f
                          )
                      }
                    : s
            )
        }));
    };

    const handleSubFolderNameChange = (
        seriesIndex,
        folderIndex,
        subFolderIndex,
        e
    ) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.map((f, fIdx) =>
                              fIdx === folderIndex
                                  ? {
                                        ...f,
                                        subFolders: f.subFolders.map(
                                            (sf, sfIdx) =>
                                                sfIdx === subFolderIndex
                                                    ? {
                                                          ...sf,
                                                          subFolderName: value
                                                      }
                                                    : sf
                                        )
                                    }
                                  : f
                          )
                      }
                    : s
            )
        }));
    };

    const handleSubFolderFileChange = (
        seriesIndex,
        folderIndex,
        subFolderIndex,
        e
    ) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.map((f, fIdx) =>
                              fIdx === folderIndex
                                  ? {
                                        ...f,
                                        subFolders: f.subFolders.map(
                                            (sf, sfIdx) =>
                                                sfIdx === subFolderIndex
                                                    ? { ...sf, files }
                                                    : sf
                                        )
                                    }
                                  : f
                          )
                      }
                    : s
            )
        }));
    };

    const addFolder = (seriesIndex) => {
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: [
                              ...s.folders,
                              {
                                  folderName: '',
                                  files: [],
                                  subFolders: []
                              }
                          ]
                      }
                    : s
            )
        }));
    };

    const addSubFolder = (seriesIndex, folderIndex) => {
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.map((f, fIdx) =>
                              fIdx === folderIndex
                                  ? {
                                        ...f,
                                        subFolders: [
                                            ...f.subFolders,
                                            {
                                                subFolderName: '',
                                                files: []
                                            }
                                        ]
                                    }
                                  : f
                          )
                      }
                    : s
            )
        }));
    };

    const removeFolder = (seriesIndex, folderIndex) => {
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.filter(
                              (_, index) => index !== folderIndex
                          )
                      }
                    : s
            )
        }));
    };

    const removeSubFolder = (seriesIndex, folderIndex, subFolderIndex) => {
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, idx) =>
                idx === seriesIndex
                    ? {
                          ...s,
                          folders: s.folders.map((f, fIdx) =>
                              fIdx === folderIndex
                                  ? {
                                        ...f,
                                        subFolders: f.subFolders.filter(
                                            (_, index) =>
                                                index !== subFolderIndex
                                        )
                                    }
                                  : f
                          )
                      }
                    : s
            )
        }));
    };

    const addSeries = () => {
        setFormData((prevData) => ({
            ...prevData,
            series: [
                ...prevData.series,
                {
                    name: '',
                    folders: [
                        {
                            folderName: '',
                            files: [],
                            subFolders: []
                        }
                    ]
                }
            ]
        }));
    };

    const removeSeries = (seriesIndex) => {
        setFormData((prevData) => ({
            ...prevData,
            series: prevData.series.filter((_, index) => index !== seriesIndex)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            for (let i = 0; i < formData.series.length; i++) {
                const series = formData.series[i];
                if (series.name.length <= 3) {
                    throw new Error(
                        `Series ${i + 1} name must be at least 4 characters.`
                    );
                }

                await uploadAndPostSeries(series);
            }

            alert('All series uploaded successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Upload failed: ' + error.message);
        } finally {
            setLoading(false);
            setFormData({
                series: [
                    {
                        name: '',
                        folders: [
                            {
                                folderName: '',
                                files: [],
                                subFolders: []
                            }
                        ]
                    }
                ]
            });
        }
    };

    const uploadAndPostSeries = async (series) => {
        // Loop through each folder to upload files
        for (const folder of series.folders) {
            const baseFolderPath = `Books/${userID}/${series.name}/${folder.folderName}`;

            // Upload files in the main folder
            const uploadPromises = folder.files.map((file) => {
                const fileRef = ref(storage, `${baseFolderPath}/${file.name}`);
                return uploadBytes(fileRef, file).then(() => {
                    console.log(`${file.name} uploaded successfully`);
                });
            });

            // Loop through each subfolder to upload files, if any
            for (const subFolder of folder.subFolders || []) {
                const subFolderPath = `${baseFolderPath}/${subFolder.subFolderName}`;
                const subFolderUploadPromises = subFolder.files.map((file) => {
                    const fileRef = ref(
                        storage,
                        `${subFolderPath}/${file.name}`
                    );
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
        await PostData(userID, series.title, series.name, series.folders);
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
        addSeries,
        removeSeries,
        handleSubmit,
        loading,
        formData,
        setFormData,
    };
};

export default UseMultipleBookSeriesForm;
