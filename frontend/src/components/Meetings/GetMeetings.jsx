import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const GetMeetings = () => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userId } = useParams();

    // Replace these with your actual values
    const CLIENT_ID = import.meta.env.VITE_REACT_CLIENT_ID;
    const REDIRECT_URI = `http://localhost:5173/teacher/${userId}`; // Adjust this to match your app's callback URL




    const fetchMeetings = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Starting fetchMeetings...');

            // Check if we're in an Electron environment
            if (
                typeof window !== 'undefined' &&
                typeof window.electron !== 'undefined'
            ) {
                console.log('Running in Electron environment');
                // If in Electron, use ipcRenderer
                const authCode = await window.electron.ipcRenderer.invoke(
                    'get-auth-code'
                );

                console.log('Received auth code:', authCode);

                if (!authCode) {
                    throw new Error('No auth code received');
                }

                // Exchange the auth code for tokens
                const response = await fetch(
                    'http://localhost:3000/api/token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${
                            import.meta.env.VITE_REACT_CLIENT_SECRET
                        }`
                    }
                );

                console.log('Token request response status:', response.status);
                console.log('Token request response ok:', response.ok);

                const tokenResponse = await response.json();
                const accessToken = tokenResponse.access_token;

                console.log('Access Token:', accessToken);

                // Rest of your code...
            } else {
                // Handle non-Electron environment...
            }
        } catch (error) {
            console.error('Error fetching meetings:', error);
            setError('An error occurred while fetching meetings.');
        } finally {
            setLoading(false);
        }
    };



    // Add this useEffect hook at the end of your component
    React.useEffect(() => {
        fetchMeetings();
    }, []);

    return (
        <div className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg absolute bottom-1/2'>
            <h1 className='text-xl font-bold mb-4'>Your Zoom Meetings</h1>
            <button
                onClick={fetchMeetings}
                className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                Fetch Meetings
            </button>

            {loading && (
                <p className='mt-4 text-blue-500'>Loading meetings...</p>
            )}

            {error && <p className='mt-4 text-red-500'>{error}</p>}

            {!loading && meetings.length > 0 && (
                <ul className='mt-4 space-y-4'>
                    {meetings.map((meeting) => (
                        <li
                            key={meeting.id}
                            className='p-4 bg-white shadow rounded-lg border'>
                            <h2 className='font-bold text-lg'>
                                {meeting.topic}
                            </h2>
                            <p>
                                <strong>Start Time:</strong>{' '}
                                {new Date(meeting.start_time).toLocaleString()}
                            </p>
                            <p>
                                <strong>Duration:</strong> {meeting.duration}{' '}
                                minutes
                            </p>
                            <p>
                                <strong>Join URL:</strong>{' '}
                                <a
                                    href={meeting.join_url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-500'>
                                    {meeting.join_url}
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && meetings.length === 0 && !error && (
                <p className='mt-4 text-gray-500'>No meetings found.</p>
            )}
        </div>
    );
};

export default GetMeetings;
