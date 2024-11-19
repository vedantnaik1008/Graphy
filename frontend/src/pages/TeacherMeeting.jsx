/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
// import CreateMeeting from '../components/Meetings/CreateMeeting';

const TeacherMeeting = ({ payload }) => {
    useEffect(() => {
        const initializeZoomSDK = async () => {
            const { ZoomMtg } = await import('@zoomus/websdk');

            ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.0/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareWebSDK();
            try {
                ZoomMtg.generateSDKSignature({
                    meetingNumber: payload.meetingNumber,
                    role: payload.role,
                    sdkKey: payload.sdkKey,
                    sdkSecret: payload.sdkSecret,
                    success: function (signature) {
                        ZoomMtg.init({
                            leaveUrl: payload.leaveUrl,
                            isSupportAV: true,
                            success: function () {
                                ZoomMtg.join({
                                    meetingNumber: payload.meetingNumber,
                                    signature: signature.result,
                                    userName: payload.userName,
                                    userEmail: payload.userEmail,
                                    passWord: payload.passWord,
                                    sdkKey: payload.sdkKey,
                                    success: function () {
                                        console.log('-- Joined Meeting --');
                                    },
                                    error: function (joinError) {
                                        console.error(
                                            'Error joining meeting:',
                                            joinError
                                        );
                                    }
                                });
                            },
                            error: function (initError) {
                                console.error(
                                    'Error initializing Zoom SDK:',
                                    initError
                                );
                            }
                        });
                    },
                    error: function (signatureError) {
                        console.error(
                            'Error generating signature:',
                            signatureError
                        );
                    }
                });
            } catch (error) {
                console.error('Error importing Zoom SDK:', error);
            }
        };

        initializeZoomSDK();
    }, [
        payload.leaveUrl,
        payload.meetingNumber,
        payload.passWord,
        payload.role,
        payload.sdkKey,
        payload.sdkSecret,
        payload.userEmail,
        payload.userName
    ]);

    return (
        <React.Fragment>
            <link
                type='text/css'
                rel='stylesheet'
                href='https://source.zoom.us/2.18.0/css/bootstrap.css'
            />
            <link
                type='text/css'
                rel='stylesheet'
                href='https://source.zoom.us/2.18.0/css/react-select.css'
            />
            {/* <div className="relative z-[10000001]">
                <CreateMeeting />
            </div> */}
        </React.Fragment>
    );
};

export default TeacherMeeting;
