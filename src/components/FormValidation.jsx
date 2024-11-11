import UseMultipleBookSeriesForm from '../hooks/UseForm';
import Spinner from './Spinner';

const FormValidation = () => {
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
    } = UseMultipleBookSeriesForm();




    return (
        <>
            {/* ... (keep the existing code for the back link) */}

            <div className=''>
                <div className='px-3  h-[80dvh] py-6 md:p-10 rounded-2xl border-black border-2 bg-white  text-black font-mono mx-auto w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-y-scroll overflow-x-hidden'>
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
                                value={formData.series[0].title}
                                id={`title`}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        series: prev.series.map((s, index) =>
                                            index === 0
                                                ? {
                                                      ...s,
                                                      title: e.target.value
                                                  }
                                                : s
                                        )
                                    }))
                                }
                                placeholder='Course Name'
                                className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full '
                            />
                        </label>

                        {formData.series.map((series, seriesIndex) => (
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

                                {series.folders.map((folder, folderIndex) => (
                                    <div
                                        key={folderIndex}
                                        className='w-full mb-8'>
                                        {/* Folder Name Input */}
                                        <label
                                            htmlFor={`folderName-${seriesIndex}-${folderIndex}`}
                                            className='w-full'>
                                            <input
                                                type='text'
                                                name='folderName'
                                                value={folder.folderName}
                                                id={`folderName-${seriesIndex}-${folderIndex}`}
                                                onChange={(e) =>
                                                    handleFolderNameChange(
                                                        seriesIndex,
                                                        folderIndex,
                                                        e
                                                    )
                                                }
                                                placeholder='Folder Name'
                                                className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full mb-4'
                                            />
                                        </label>
                                        {/* Folder Files Input */}
                                        <label
                                            htmlFor={`files-${seriesIndex}-${folderIndex}`}
                                            className='my-2 flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                <svg
                                                    className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                                    aria-hidden='true'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 20 16'>
                                                    <path
                                                        stroke='currentColor'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth='2'
                                                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                                    />
                                                </svg>
                                                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                                    <span className='font-semibold'>
                                                        Click to upload
                                                    </span>{' '}
                                                    or drag and drop
                                                </p>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                    SVG, PNG, JPG or GIF (MAX.
                                                    800x400px)
                                                </p>
                                            </div>
                                            <input
                                                type='file'
                                                id={`files-${seriesIndex}-${folderIndex}`}
                                                multiple
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        seriesIndex,
                                                        folderIndex,
                                                        e
                                                    )
                                                }
                                                accept='.pdf, video/*'
                                                className='hidden'
                                            />
                                        </label>

                                        {/* Display uploaded files */}
                                        <ul className='list-disc pl-4 mb-4'>
                                            {folder.files.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>

                                        {/* Subfolders */}
                                        {folder.subFolders?.map(
                                            (subFolder, subFolderIndex) => (
                                                <div
                                                    key={subFolderIndex}
                                                    className='w-full mb-4'>
                                                    <label
                                                        htmlFor={`subFolderName-${seriesIndex}-${folderIndex}-${subFolderIndex}`}
                                                        className='w-full'>
                                                        <input
                                                            type='text'
                                                            name='subFolderName'
                                                            value={
                                                                subFolder.subFolderName
                                                            }
                                                            id={`subFolderName-${seriesIndex}-${folderIndex}-${subFolderIndex}`}
                                                            onChange={(e) =>
                                                                handleSubFolderNameChange(
                                                                    seriesIndex,
                                                                    folderIndex,
                                                                    subFolderIndex,
                                                                    e
                                                                )
                                                            }
                                                            placeholder='Subfolder Name'
                                                            className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full mb-4'
                                                        />
                                                    </label>
                                                    {/* Subfolder Files Input */}
                                                    <label
                                                        htmlFor={`subFiles-${seriesIndex}-${folderIndex}-${subFolderIndex}`}
                                                        className='my-2 flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                            <svg
                                                                className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                                                aria-hidden='true'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                fill='none'
                                                                viewBox='0 0 20 16'>
                                                                <path
                                                                    stroke='currentColor'
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    strokeWidth='2'
                                                                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                                                />
                                                            </svg>
                                                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                                                <span className='font-semibold'>
                                                                    Click to
                                                                    upload
                                                                </span>{' '}
                                                                or drag and drop
                                                            </p>
                                                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                                                SVG, PNG, JPG or
                                                                GIF (MAX.
                                                                800x400px)
                                                            </p>
                                                        </div>
                                                        <input
                                                            type='file'
                                                            id={`subFiles-${seriesIndex}-${folderIndex}-${subFolderIndex}`}
                                                            multiple
                                                            onChange={(e) =>
                                                                handleSubFolderFileChange(
                                                                    seriesIndex,
                                                                    folderIndex,
                                                                    subFolderIndex,
                                                                    e
                                                                )
                                                            }
                                                            accept='.pdf, video/*'
                                                            className='hidden'
                                                        />
                                                    </label>

                                                    {/* Display uploaded subfolder files */}
                                                    <ul className='list-disc pl-4 mb-4'>
                                                        {subFolder.files.map(
                                                            (file, index) => (
                                                                <li key={index}>
                                                                    {file.name}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>

                                                    <button
                                                        disabled={loading}
                                                        type='button'
                                                        onClick={() =>
                                                            removeSubFolder(
                                                                seriesIndex,
                                                                folderIndex,
                                                                subFolderIndex
                                                            )
                                                        }
                                                        className='bg-red-500 text-white px-4 py-2 rounded-md mt-2'>
                                                        Remove Subfolder
                                                    </button>
                                                </div>
                                            )
                                        )}

                                        <div className='flex gap-4 items-center mb-4'>
                                            <button
                                                disabled={loading}
                                                type='button'
                                                onClick={() =>
                                                    addSubFolder(
                                                        seriesIndex,
                                                        folderIndex
                                                    )
                                                }
                                                className='bg-black text-white px-4 py-2 rounded-md'>
                                                + Add Subfolder
                                            </button>
                                            <button
                                                disabled={loading}
                                                type='button'
                                                onClick={() =>
                                                    removeFolder(
                                                        seriesIndex,
                                                        folderIndex
                                                    )
                                                }
                                                className='bg-black text-white px-4 py-2 rounded-md'>
                                                Remove Folder
                                            </button>
                                        </div>
                                    </div>
                                ))}

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
                                        onClick={() =>
                                            removeSeries(seriesIndex)
                                        }
                                        className='bg-red-500 text-white px-4 py-2 rounded-md mb-4 md:ml-4'>
                                        Remove Series
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            disabled={
                                !formData.series.some((s) => s.name.trim()) ||
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
            </div>
        </>
    );
};

export default FormValidation;
