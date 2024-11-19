import UseMultipleBookSeriesForm from '../hooks/UseForm';
import Folders from './CourseForm/Folders';
import Spinner from './Spinner';
import useFetchCourse from '../hooks/useFetchCourse';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const FormValidation = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { userId } = useParams();
    const [selectedCourse, setSelectedCourse] = useState(
        `users/${userId}/course/0`
    );
    const { courseList, formCourse } = useFetchCourse({
        course: selectedCourse,
        isEditing
    });
    const selectedCourseIndex = selectedCourse
        .split('/')
        .slice(3, 4)
        .toString();

    const uniqueId = courseList && courseList[selectedCourseIndex]?.uniqueId;
    const {
        handleChange,
        handleFileChange,
        handleFolderNameChange,
        handleSubFolderFileChange,
        handleSubFolderNameChange,
        addSubFolder,
        removeSubFolder,
        addFolder,
        removeFolder,
        addSeries,
        removeSeries,
        handleSubmit,
        loading,
        formData,
        setFormData
    } = UseMultipleBookSeriesForm({
        formCourseData: formCourse,
        isEditing,
        setIsEditing,
        selectedCourse,
        uniqueId: uniqueId
    });

    const handleCourseSelect = async (e) => {
        const courseValue = e.target.value;
        setSelectedCourse(courseValue);

        if (courseValue) {
            // Set editing mode and fetch data for the selected course
            setIsEditing(true);
            setFormData(formCourse);
        } else {
            setIsEditing(false);
            setFormData({
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
            }); // Reset form if no course is selected
        }
    };
 
        

console.log(uniqueId);


    return (
        <>
            {formCourse !== null && (
                <div className=''>
                    <button
                        className='px-8 py-2 text-sm rounded-lg bg-blue-500 my-2 mx-2 text-white'
                        onClick={() => setIsEditing((prev) => !prev)}>
                        Update Course
                    </button>

                    {isEditing && (
                        <select
                            onChange={handleCourseSelect}
                            value={selectedCourse}
                            className='ml-2 w-40 p-1 md:w-64 md:p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option
                                className='text-black font-normal'
                                value={`users/${userId}/course/0`}>
                                Select a course
                            </option>
                            {courseList &&
                                courseList.map((course, index) => (
                                    <option
                                        key={course.title}
                                        className='text-black font-normal'
                                        value={`users/${userId}/course/${index}`}>
                                        {course.title}
                                    </option>
                                ))}
                        </select>
                    )}
                </div>
            )}
            <div className='mt-8 md:mt-0 px-3  h-[80dvh] py-6 md:p-10 rounded-2xl border-black border-2 bg-white  text-black font-mono mx-auto w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-y-scroll overflow-x-hidden'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-8 items-center justify-center'>
                    <h2 className='text-[30px] font-mono font-bold text-center'>
                        Collection Hub
                    </h2>

                    <label htmlFor={`title`} className='w-full'>
                        <input
                            type='text'
                            name='title'
                            value={
                                formData.series?.map((item) => item.title) || ''
                            }
                            id={`title`}
                            onChange={(e, seriesIndex = 0) => {
                                const { name, value } = e.target;
                                setFormData((prevData) => ({
                                    ...prevData,
                                    series: prevData?.series?.map((s, idx) =>
                                        idx === seriesIndex
                                            ? { ...s, [name]: value }
                                            : s
                                    )
                                }));
                            }}
                            placeholder='Course Name'
                            className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full '
                        />
                    </label>

                    {formData.series?.map((series, seriesIndex) => (
                        <div
                            key={seriesIndex}
                            className='border-b-2 border-gray-300 pb-8 mb-8 w-full'>
                            <h3 className='text-xl font-bold mb-4'>
                                Series {seriesIndex + 1}
                            </h3>

                            <label
                                htmlFor={`name-${seriesIndex}`}
                                className='w-full'>
                                <input
                                    type='text'
                                    name='name'
                                    value={series.name}
                                    id={`name-${seriesIndex}`}
                                    onChange={(e) =>
                                        handleChange(seriesIndex, e)
                                    }
                                    placeholder='Series Name'
                                    className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full mb-6'
                                />
                            </label>

                            <Folders
                                series={series}
                                seriesIndex={seriesIndex}
                                handleFolderNameChange={handleFolderNameChange}
                                handleFileChange={handleFileChange}
                                removeFolder={removeFolder}
                                handleSubFolderNameChange={
                                    handleSubFolderNameChange
                                }
                                handleSubFolderFileChange={
                                    handleSubFolderFileChange
                                }
                                loading={loading}
                                removeSubFolder={removeSubFolder}
                                addSubFolder={addSubFolder}
                                isEditing={isEditing}
                            />

                            <button
                                disabled={loading}
                                type='button'
                                onClick={() => addFolder(seriesIndex)}
                                className='bg-black text-white px-4 py-2 rounded-md mb-4'>
                                + Add Folder
                            </button>

                            {seriesIndex > 0 && (
                                <button
                                    disabled={loading}
                                    type='button'
                                    onClick={() => removeSeries(seriesIndex)}
                                    className='bg-red-500 text-white px-4 py-2 rounded-md mb-4 md:ml-4'>
                                    Remove Series
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        disabled={
                            !formData.series?.some((s) => s.name.trim()) ||
                            loading
                        }
                        className='bg-blue-500 rounded-lg w-full font-medium disabled:bg-gray-500 text-white py-3 px-6 flex gap-2 justify-center items-center transition-all ease-in-out'
                        type='submit'>
                        {loading ? 'Submitting' : 'Submit'}{' '}
                        {loading ? <Spinner /> : null}
                    </button>

                    {!loading && (
                        <button
                            type='button'
                            onClick={addSeries}
                            className='mt-4 bg-black text-white px-4 py-2 rounded-md'>
                            + Add Another Series
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default FormValidation;
