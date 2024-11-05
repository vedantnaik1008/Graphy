import { Link } from 'react-router-dom';
import UseForm from '../hooks/UseForm';

const FormValidation = () => {
    const {
        handleChange,
        handleFileChange,
        handleFolderNameChange,
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
            <div className='px-3 py-6 md:p-10 overflow-y-auto rounded-2xl border-black border-2 bg-white text-black font-mono mx-auto h-[80dvh] w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-8 items-center justify-center h-full'>
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

                    {formData.folders.map((folder, index) => (
                        <div key={index} className='w-full'>
                            <label
                                htmlFor={`folderName-${index}`}
                                className='w-full'>
                                <input
                                    type='text'
                                    name='folderName'
                                    value={folder.folderName}
                                    id={`folderName-${index}`}
                                    onChange={(e) =>
                                        handleFolderNameChange(index, e)
                                    }
                                    placeholder='Folder Name'
                                    className='border-b-2 border-b-gray-500 bg-white w-full'
                                />
                            </label>
                            <label
                                htmlFor={`files-${index}`}
                                className='w-full'>
                                <input
                                    type='file'
                                    id={`files-${index}`}
                                    multiple
                                    onChange={(e) => handleFileChange(index, e)}
                                    accept='.pdf, video/*'
                                    className='custom-file-input'
                                />
                            </label>
                            <button
                                disabled={loading}
                                type='button'
                                onClick={() => removeFolder(index)}
                                className='text-red-500'>
                                Remove Folder
                            </button>
                        </div>
                    ))}

                    <button
                        disabled={loading}
                        type='button'
                        onClick={addFolder}
                        className='text-blue-500'>
                        + Add Folder
                    </button>

                    <button
                        disabled={!formData.name || loading}
                        className='bg-blue-500 rounded-lg w-full font-medium disabled:bg-gray-500 text-white py-3 px-6 flex gap-2 justify-center items-center transition-all ease-in-out'
                        type='submit'>
                        {loading ? 'Submitting' : 'Submit'}{' '}
                        {loading ? (
                            <div role='status'>
                                <svg
                                    aria-hidden='true'
                                    className='inline w-4 h-4 text-white animate-spin dark:text-gray-600 fill-gray-600 dark:fill-white'
                                    viewBox='0 0 100 101'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                        fill='currentColor'
                                    />
                                    <path
                                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                        fill='currentFill'
                                    />
                                </svg>
                                <span className='sr-only'>Loading...</span>
                            </div>
                        ) : null}
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormValidation;
