/* eslint-disable react/prop-types */
import SubFolder from './SubFolder';
import { fileToDelete } from '../../data/PostData';
// import { fileNameToDelete } from '../../data/PostData';

const Folders = ({
    series,
    seriesIndex,
    handleFolderNameChange,
    handleFileChange,
    removeFolder,
    handleSubFolderNameChange,
    handleSubFolderFileChange,
    loading,
    removeSubFolder,
    addSubFolder,
    isEditing,
    userId,
    uniqueId,
    unique,
    deleteFile,
    setDeleteFile
}) => {
    return (
        <>
            {series.folders.map((folder, folderIndex) => (
                <div key={folderIndex} className='w-full mb-8'>
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
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            type='file'
                            id={`files-${seriesIndex}-${folderIndex}`}
                            multiple
                            onChange={(e) =>
                                handleFileChange(seriesIndex, folderIndex, e)
                            }
                            accept='.pdf, video/*'
                            className='hidden'
                        />
                    </label>

                    {/* Display uploaded files */}
                    <ul className='list-disc pl-4 flex flex-col justify-center'>
                        {folder?.files?.map((file, index) => (
                            <div key={index} className='flex justify-between gap-2'>
                                <li>
                                    {file.name?.length > 50
                                        ? file.name.substring(0, 50) + '...'
                                        : file.name}
                                </li>
                                {isEditing && (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            const filePath = `${userId}/${uniqueId}/${unique}/${folderIndex}/${file.name}`;

                                            // Store only the clicked file (not all previous ones)
                                            setDeleteFile([filePath]);

                                            // Delete the file immediately after updating state
                                            fileToDelete([filePath]);
                                        }}
                                        className='text-black text-base font-extrabold'>
                                        {'X'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </ul>
                    {/* Subfolders */}
                    <SubFolder
                        folder={folder}
                        seriesIndex={seriesIndex}
                        folderIndex={folderIndex}
                        handleSubFolderNameChange={handleSubFolderNameChange}
                        handleSubFolderFileChange={handleSubFolderFileChange}
                        loading={loading}
                        removeSubFolder={removeSubFolder}
                        isEditing={isEditing}
                        userId={userId}
                        uniqueId={uniqueId}
                        unique={unique}
                        deleteFile={deleteFile}
                        setDeleteFile={setDeleteFile}
                    />

                    <div className='flex gap-4 items-center mb-4'>
                        <button
                            disabled={loading}
                            type='button'
                            onClick={() =>
                                addSubFolder(seriesIndex, folderIndex)
                            }
                            className='bg-black text-white px-4 py-2 rounded-md'>
                            + Add Subfolder
                        </button>
                        <button
                            disabled={loading}
                            type='button'
                            onClick={() =>
                                removeFolder(seriesIndex, folderIndex)
                            }
                            className='bg-black text-white px-4 py-2 rounded-md'>
                            Remove Folder
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Folders;
