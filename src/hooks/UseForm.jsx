import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateAndPostSeries, uploadAndPostSeries } from '../data/PostData';
import { toast } from 'react-toastify';

const UseMultipleBookSeriesForm = ({
    formCourseData,
    isEditing,
    setIsEditing,
    selectedCourse,
    uniqueId
}) => {
    const initialFormData = {
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
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams();

    // Flag to track component mount status
    const isMounted = useRef(true); // Using useRef to persist value across renders

    // Function to transform course data
    const transformCourseData = (formCourseData) => {
        // Function to recursively transform folders and subfolders
        const transformFolders = (folders) => {
            return folders.map((folder) => ({
                folderName: folder.name || '', // Map folder name
                // files: folder.files || [], // Map files at folder level
                subFolders: folder.subFolders
                    ? folder.subFolders.map((subFolder) => ({
                          subFolderName: subFolder.name || '' // Map subfolder name
                          //   files: subFolder.files || [] // Map files in subfolder
                      }))
                    : [] // If no subfolders, set it to an empty array
            }));
        };

        return {
            series: formCourseData.tabs.map((tab) => ({
                title: formCourseData.title || '', // Map course title
                name: tab.name || '', // Map tab name
                folders: transformFolders(tab.sub || []) // Transform folders with potential subfolders
            }))
        };
    };
    console.log(formData);
    console.log(uniqueId, 'useFOrm');

    useEffect(() => {
        isMounted.current = true; // Mark the component as mounted

        if (isEditing && formCourseData) {
            // When editing, transform the incoming course data
            setFormData(transformCourseData(formCourseData));
        } else {
            // When not editing, reset formData to the initial state
            setFormData(initialFormData);
        }

        return () => {
            isMounted.current = false; // Mark the component as unmounted
        };
    }, [isEditing, formCourseData]); // Runs when isEditing or formCourseData changes

    // Ensure we only update the state if the component is still mounted
    const safeSetState = (update) => {
        if (isMounted.current) {
            setFormData(update);
        }
    };

    const handleChange = (seriesIndex, e) => {
        e.persist();
        if (!e.target) {
            console.error('Event target not found', e);
            return;
        }

        const { name, value } = e.target;

        safeSetState((prevData) => ({
            ...prevData,
            series: prevData.series.map((s, index) =>
                index === seriesIndex ? { ...s, [name]: value } : s
            )
        }));
    };

    const handleFileChange = (seriesIndex, folderIndex, e) => {
        e.persist();

        const files = Array.from(e.target.files);
        safeSetState((prevData) => ({
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
        toast.success(`${files.length} file(s) uploaded successfully!`);
    };

    const handleFolderNameChange = (seriesIndex, folderIndex, e) => {
        e.persist();
        const { value } = e.target;
        safeSetState((prevData) => ({
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
        e.persist();
        const { value } = e.target;
        safeSetState((prevData) => ({
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
        e.persist();

        const files = Array.from(e.target.files);
        safeSetState((prevData) => ({
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
        toast.success(`${files.length} file(s) uploaded successfully!`);
    };

    const addFolder = (seriesIndex) => {
        safeSetState((prevData) => ({
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
        safeSetState((prevData) => ({
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
        safeSetState((prevData) => ({
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
        safeSetState((prevData) => ({
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
        safeSetState((prevData) => ({
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
        safeSetState((prevData) => ({
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
                if (series.name.length < 4) {
                    throw new Error(
                        `Series ${i + 1} name must be at least 4 characters.`
                    );
                }

                if (isEditing) {
                    setIsEditing(true);
                    await updateAndPostSeries(series, selectedCourse, uniqueId);
                } else {
                    setIsEditing(false);
                    await uploadAndPostSeries(series, userId);
                }
            }

            toast.success(
                `Series ${formData.series[0].title} uploaded successfully!`
            );
            navigate(`/dashboard/${userId}`);
        } catch (error) {
            console.error(error);
            toast.error('Upload failed: ' + error.message);
        } finally {
            setLoading(false);
            setFormData(initialFormData); // Reset to initial state after submit
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
        addSeries,
        removeSeries,
        handleSubmit,
        loading,
        formData,
        setFormData
    };
};

export default UseMultipleBookSeriesForm;
