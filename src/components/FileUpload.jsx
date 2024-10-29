/* eslint-disable react/prop-types */


const FileUpload = ({ progress, handleFileChange, handleUpload }) => {

    return (
        <div className='w-[90%] mx-auto my-20 flex flex-col lg:flex-row gap-4'>
            <h3>Upload File</h3>
            <input type='file' onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                className='rounded-lg bg-blue-500 text-white font-semibold px-8 py-2'>
                Upload
            </button>
            <p>Progress: {progress.toFixed(0)}%</p>
            {/* {downloadURL && (
              <p>
                  File uploaded!{' '}
                  <a
                      href={downloadURL}
                      target='_blank'
                      rel='noopener noreferrer'>
                      View File
                  </a>
              </p>
          )} */}
        </div>
    );
};

export default FileUpload;