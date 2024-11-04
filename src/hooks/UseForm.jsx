import { ref, uploadBytes } from 'firebase/storage';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../FirebaseConfig';
import { PostData } from '../data/PostData';

const UseForm = () => {
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
                PostData(formData.name);
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
    return {
        handleChange,
        handleFileChange,
        handleSubmit,
        loading,
        formData,
        fullBookFileRef,
        summaryFileRef,
        audioSummaryFileRef
    };
};

export default UseForm;
