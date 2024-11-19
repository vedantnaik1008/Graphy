import React, { useState } from 'react';

const CreateMeeting = () => {
    const [formData, setFormData] = useState({
        topic: '',
        startTime: '',
        meetingPassword: '',
        duration: 30 // Default to 30 minutes
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'https://api.zoom.us/v2/users/me/meetings',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiI8S0lEPiJ9.eyJ2ZXIiOiI2IiwiY2xpZW50SWQiOiI8Q2xpZW50X0lEPiIsImNvZGUiOiI8Q29kZT4iLCJpc3MiOiJ1cm46em9vbTpjb25uZWN0OmNsaWVudGlkOjxDbGllbnRfSUQ-IiwiYXV0aGVudGljYXRpb25JZCI6IjxBdXRoZW50aWNhdGlvbl9JRD4iLCJ1c2VySWQiOiI8VXNlcl9JRD4iLCJncm91cE51bWJlciI6MCwiYXVkIjoiaHR0cHM6Ly9vYXV0aC56b29tLnVzIiwiYWNjb3VudElkIjoiPEFjY291bnRfSUQ-IiwibmJmIjoxNTgwMTQ2OTkzLCJleHAiOjE1ODAxNTA1OTMsInRva2VuVHlwZSI6ImFjY2Vzc190b2tlbiIsImlhdCI6MTU4MDE0Njk5MywianRpIjoiPEpUST4iLCJ0b2xlcmFuY2VJZCI6MjV9.F9o_w7_lde4Jlmk_yspIlDc-6QGmVrCbe_6El-xrZehnMx7qyoZPUzyuNAKUKcHfbdZa6Q4QBSvpd6eIFXvjHw` // Replace with your Zoom API token
                    },
                    mode: 'no-cors',
                    body: JSON.stringify({
                        topic: formData.topic,
                        type: 2, // Scheduled meeting
                        start_time: formData.startTime,
                        duration: formData.duration,
                        password: formData.meetingPassword
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(
                    `Meeting created successfully! Join URL: ${data.join_url}`
                );
                console.log('Meeting Details:', data);
            } else {
                console.error('Error creating meeting:', data);
                alert(`Failed to create meeting: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the meeting.');
        }
    };

    return (
        <div className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h1 className='text-xl font-bold mb-4'>Create a Zoom Meeting</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Meeting Topic</label>
                    <input
                        type='text'
                        name='topic'
                        value={formData.topic}
                        onChange={handleChange}
                        placeholder='Enter meeting topic'
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Start Time</label>
                    <input
                        type='datetime-local'
                        name='startTime'
                        value={formData.startTime}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>
                        Meeting Password
                    </label>
                    <input
                        type='password'
                        name='meetingPassword'
                        value={formData.meetingPassword}
                        onChange={handleChange}
                        placeholder='Enter meeting password'
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>
                        Duration (in minutes)
                    </label>
                    <input
                        type='number'
                        name='duration'
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder='Enter duration'
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                    Create Meeting
                </button>
            </form>
        </div>
    );
};

export default CreateMeeting;
