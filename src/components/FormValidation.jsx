import { Link } from 'react-router-dom';
import UseForm from '../hooks/UseForm';
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
        handleSubmit,
        loading,
        formData
    } = UseForm();

    return (
        <>
            <Link
                to={'/dashboard'}
                className='absolute top-2 left-2 rounded-full px-3 py-1 z-40 text-xl border-black border'>
                {'<'}
            </Link>
            <div className=''>
                <div className='px-3  h-[80dvh] py-6 md:p-10 rounded-2xl border-black border-2 bg-white  text-black font-mono mx-auto w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-y-scroll overflow-x-hidden'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-8 items-center justify-center '>
                        <h2 className='text-[30px] font-mono font-bold text-center'>
                            Collection Hub
                        </h2>

                        <label htmlFor='name' className='w-full'>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                id='name'
                                onChange={handleChange}
                                placeholder='book name'
                                className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full'
                            />
                            {formData.nameError && (
                                <p className='text-red-500 text-[10px] my-1 text-center mx-auto w-[95%]'>
                                    {formData.nameError}
                                </p>
                            )}
                        </label>

                        {formData.folders.map((folder, folderIndex) => (
                            <div key={folderIndex} className='w-full  '>
                                {/* Folder Name Input */}
                                <label
                                    htmlFor={`folderName-${folderIndex}`}
                                    className='w-full'>
                                    <input
                                        type='text'
                                        name='folderName'
                                        value={folder.folderName}
                                        id={`folderName-${folderIndex}`}
                                        onChange={(e) =>
                                            handleFolderNameChange(
                                                folderIndex,
                                                e
                                            )
                                        }
                                        placeholder='Folder Name'
                                        className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full'
                                    />
                                </label>
                                {/* Folder Files Input */}
                                <label
                                    htmlFor={`files-${folderIndex}`}
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
                                        id={`files-${folderIndex}`}
                                        multiple
                                        onChange={(e) =>
                                            handleFileChange(folderIndex, e)
                                        }
                                        accept='.pdf, video/*'
                                        className='hidden'
                                    />
                                </label>

                                {/* Subfolders */}
                                {folder.subFolders?.map(
                                    (subFolder, subFolderIndex) => (
                                        <div
                                            key={subFolderIndex}
                                            className='w-full'>
                                            <label
                                                htmlFor={`subFolderName-${folderIndex}-${subFolderIndex}`}
                                                className='w-full'>
                                                <input
                                                    type='text'
                                                    name='subFolderName'
                                                    value={
                                                        subFolder.subFolderName
                                                    }
                                                    id={`subFolderName-${folderIndex}-${subFolderIndex}`}
                                                    onChange={(e) =>
                                                        handleSubFolderNameChange(
                                                            folderIndex,
                                                            subFolderIndex,
                                                            e
                                                        )
                                                    }
                                                    placeholder='Subfolder Name'
                                                    className='border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 w-full'
                                                />
                                            </label>
                                            {/* Subfolder Files Input */}
                                            <label
                                                htmlFor={`subFiles-${folderIndex}-${subFolderIndex}`}
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
                                                        SVG, PNG, JPG or GIF
                                                        (MAX. 800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    type='file'
                                                    id={`subFiles-${folderIndex}-${subFolderIndex}`}
                                                    multiple
                                                    onChange={(e) =>
                                                        handleSubFolderFileChange(
                                                            folderIndex,
                                                            subFolderIndex,
                                                            e
                                                        )
                                                    }
                                                    accept='.pdf, video/*'
                                                    className='hidden'
                                                />
                                            </label>
                                            {/* Remove Subfolder Button */}
                                            <button
                                                disabled={loading}
                                                type='button'
                                                onClick={() =>
                                                    removeSubFolder(
                                                        folderIndex,
                                                        subFolderIndex
                                                    )
                                                }
                                                className='bg-black text-white px-4 py-2 rounded-md'>
                                                Remove Subfolder
                                            </button>
                                        </div>
                                    )
                                )}

                                <div className='flex gap-4 items-center'>
                                    <button
                                        disabled={loading}
                                        type='button'
                                        onClick={() => {
                                            addSubFolder(folderIndex);
                                            console.log(formData.folders);
                                        }}
                                        className='bg-black text-white px-4 py-2 rounded-md'>
                                        + Add Subfolder
                                    </button>
                                    <button
                                        disabled={loading}
                                        type='button'
                                        onClick={() =>
                                            removeFolder(folderIndex)
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
                            onClick={addFolder}
                            className='bg-black text-white px-4 py-2 rounded-md'>
                            + Add Folder
                        </button>

                        <button
                            disabled={!formData.name || loading}
                            className='bg-blue-500 rounded-lg w-full font-medium disabled:bg-gray-500 text-white py-3 px-6 flex gap-2 justify-center items-center transition-all ease-in-out'
                            type='submit'>
                            {loading ? 'Submitting' : 'Submit'}{' '}
                            {loading ? <Spinner /> : null}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormValidation;
