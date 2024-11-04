import { ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import { storage } from '../FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { PostData } from '../data/PostData';

const FormValidation = () => {
    const [formData, setFormData] = useState({
        name: '',
        nameError: '',
        fullBookFile: null,
        summaryFile: null,
        audioSummaryFile: null
    });

    const [loading, setLoading] = useState(false);
    const fullBookFileRef = useRef(null);
    const summaryFileRef = useRef(null);
    const audioSummaryFileRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let nameError = '';

        if (formData.name.length <= 3)
            nameError = 'Name must be at least 4 characters.';
        setFormData({ ...formData, nameError });

        if (
            !nameError &&
            formData.fullBookFile &&
            formData.summaryFile &&
            formData.audioSummaryFile
        ) {
            try {
                // Define base path for the book folder inside "Books"
                const baseBookFolderPath = `Books/${formData.name}`;

                // Define paths for full book and summary within the book folder
                const fullBookRef = ref(
                    storage,
                    `${baseBookFolderPath}/full book/${formData.fullBookFile.name}`
                );
                const summaryRef = ref(
                    storage,
                    `${baseBookFolderPath}/summary/${formData.summaryFile.name}`
                );

                 const audioSummaryRef = ref(
                     storage,
                     `${baseBookFolderPath}/audio summary/${formData.audioSummaryFile.name}`
                 );

                // Upload full book
                await uploadBytes(fullBookRef, formData.fullBookFile);
                console.log('Full book uploaded successfully');

                // Upload summary
                await uploadBytes(summaryRef, formData.summaryFile);
                console.log('Summary uploaded successfully');

                await uploadBytes(audioSummaryRef, formData.audioSummaryFile);
                console.log('Audio (video) summary uploaded successfully');

                console.log('Book and summary uploaded to Firebase.');
                 PostData(formData.name)
                alert('Book Uploaded Successfully');  
                navigate('/dashboard');
            } catch (error) {
                console.error('Upload failed: ', error);
                alert('Book Upload failed');
            }
        }
        setLoading(false);
        setFormData({
            name: '',
            nameError: '',
            fullBookFile: null,
            summaryFile: null
        });
        if (fullBookFileRef.current) fullBookFileRef.current.value = '';
        if (summaryFileRef.current) summaryFileRef.current.value = '';
        if (audioSummaryFileRef.current) audioSummaryFileRef.current.value = '';
    };
console.log(formData);

    return (
        <>
            <Link
                to={'/dashboard'}
                className='absolute top-2 left-2 rounded-full px-3 py-1 z-40 text-xl border-black  border'>
                {'<'}
            </Link>
            <div className='px-3 py-6 md:p-10 rounded-2xl border-black border-2 bg-white text-black font-mono mx-auto h-[80dvh] w-[90%] md:w-[60%] lg:w-[40%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
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
                            className=' border-b-2 border-b-gray-500 bg-white focus-visible:outline-none focus-visible:border-b-blue-500 text-white w-full'
                        />
                        {formData.nameError && (
                            <p className='text-red-500 text-[10px] my-1 text-center mx-auto w-[95%]'>
                                {formData.nameError}
                            </p>
                        )}
                    </label>

                    <label htmlFor='fullBookFile' className='w-full'>
                        <input
                            type='file'
                            name='fullBookFile'
                            id='fullBookFile'
                            ref={fullBookFileRef}
                            onChange={handleFileChange}
                            accept='.pdf'
                            className='file-input'
                            placeholder='full book'
                        />
                    </label>

                    <label htmlFor='summaryFile' className='w-full'>
                        <input
                            type='file'
                            name='summaryFile'
                            id='summaryFile'
                            ref={summaryFileRef}
                            onChange={handleFileChange}
                            accept='.pdf'
                            className='file-input'
                            placeholder='summary'
                        />
                    </label>

                    <label htmlFor='audioSummaryFile' className='w-full'>
                        <input
                            type='file'
                            name='audioSummaryFile'
                            id='audioSummaryFile'
                            ref={audioSummaryFileRef}
                            onChange={handleFileChange}
                            accept='video/*'
                            className='file-input'
                            placeholder='audio summary'
                        />
                    </label>

                    <button
                        disabled={
                            !formData.name ||
                            !formData.fullBookFile ||
                            !formData.summaryFile ||
                            !formData.audioSummaryFile
                        }
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
