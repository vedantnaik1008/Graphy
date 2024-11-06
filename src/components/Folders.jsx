import UseForm from '../hooks/UseForm';

const Folders = () => {
    const {
        handleFileChange,
        handleFolderNameChange,
        handleSubFolderFileChange,
        handleSubFolderNameChange,
        addFolder,
        addSubFolder,
        removeSubFolder,
        removeFolder,
        loading,
        formData
    } = UseForm();
  return (
      <>
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
                              handleFolderNameChange(folderIndex, e)
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
                              PDF OR ANY MEDIA FILES
                          </p>
                      </div>
                      <input
                          type='file'
                          id={`files-${folderIndex}`}
                          multiple
                          onChange={(e) => handleFileChange(folderIndex, e)}
                          accept='.pdf, video/*'
                          className='hidden'
                      />
                  </label>

                  {/* Subfolders */}
                  {folder.subFolders?.map((subFolder, subFolderIndex) => (
                      <div key={subFolderIndex} className='w-full'>
                          <label
                              htmlFor={`subFolderName-${folderIndex}-${subFolderIndex}`}
                              className='w-full'>
                              <input
                                  type='text'
                                  name='subFolderName'
                                  value={subFolder.subFolderName}
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
                                      PDF OR ANY MEDIA FILES
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
                                  removeSubFolder(folderIndex, subFolderIndex)
                              }
                              className='bg-black text-white my-2 px-4 py-2 rounded-md text-[12px] md:text-base'>
                              Remove Subfolder
                          </button>
                      </div>
                  ))}

                  <div className='flex gap-4 items-center text-[12px] md:text-base'>
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
                          onClick={() => removeFolder(folderIndex)}
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
              className='bg-black text-white px-4 py-2 rounded-md text-[12px] md:text-base'>
              + Add Folder
          </button>
      </>
  );
}

export default Folders
