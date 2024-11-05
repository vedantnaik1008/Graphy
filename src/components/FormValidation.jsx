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
            <div className='px-3 py-6 md:p-10 rounded-2xl border-black border-2 bg-white text-black font-mono mx-auto h-[80dvh] w-[90%] md:w-[60%] lg:w-[60%] xl:w-[40%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-8 items-center justify-center h-full'>
                    <h2 className='text-[30px] font-mono font-bold text-center'>
                        Book Series
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
                        className='bg-blue-500 rounded-lg w-full font-medium disabled:bg-gray-500 text-white py-3 px-6'
                        type='submit'>
                        {loading ? 'Submitting' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormValidation;