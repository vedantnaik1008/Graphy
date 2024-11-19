import React, { useState } from 'react';

const CreateMeeting = () => {
    const [formData, setFormData] = useState({
        clientId: '',
        clientSecret: '',
        meetingNumber: '',
        meetingPassword: '',
        zoomAccessToken: '',
        role: 1 // Default role set to 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to create the meeting (e.g., call Zoom API with formData)
        console.log('Form Data Submitted:', formData);
        alert('Meeting created successfully!');
    };

    return (
        <div className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h1 className='text-xl font-bold mb-4'>Create a Zoom Meeting</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Client ID</label>
                    <input
                        type='text'
                        name='clientId'
                        value={formData.clientId}
                        onChange={handleChange}
                        placeholder='Enter your Zoom Client ID'
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Client Secret</label>
                    <input
                        type='text'
                        name='clientSecret'
                        value={formData.clientSecret}
                        onChange={handleChange}
                        placeholder='Enter your Zoom Client Secret'
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>
                        Meeting Number
                    </label>
                    <input
                        type='text'
                        name='meetingNumber'
                        value={formData.meetingNumber}
                        onChange={handleChange}
                        placeholder='Enter Meeting Number'
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
                        placeholder='Enter Meeting Password'
                        className='w-full px-3 py-2 border rounded-lg'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                    <input
                        type='number'
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border rounded-lg'
                        disabled // Role is fixed to 1 by default
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
