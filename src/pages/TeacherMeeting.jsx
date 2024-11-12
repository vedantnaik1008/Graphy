/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoom/meetingsdk';

const TeacherMeeting = ({ payload }) => {
    // const [meetingInfo, setMeetingInfo] = useState({
    //     meetingNumber: '123456789', // replace with dynamic meeting number
    //     passcode: '123456',
    //     role: 1 // Role as host
    // });
    console.log(payload);

    useEffect(() => {
        const generateSignature = async () => {
            ZoomMtg.setZoomJSLib('https://source.zoom.us/3.9.2/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareWebSDK();

            ZoomMtg.generateSDKSignature({
                meetingNumber: payload.meetingNumber,
                role: payload.role,
                sdkKey: payload.sdkKey,
                sdkSecret: payload.sdkSecret,
                success: function (signature) {
                    ZoomMtg.init({
                        leaveUrl: payload.leaveUrl,
                        success: function (data) {
                            ZoomMtg.join({
                                meetingNumber: payload.meetingNumber,
                                signature: signature.result,
                                userName: payload.userName,
                                userEmail: payload.userEmail,
                                passWord: payload.passWord,
                                tk: '',
                                sdkKey: payload.sdkKey,
                                success: function () {
                                    console.log('-- Joined --');
                                },
                                error: function (error) {
                                    console.error(error);
                                }
                            });
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                },
                error: function (error) {
                    console.error(error);
                }
            });
        };

        generateSignature();
    }, []);

    return (
        <React.Fragment>
            <link
                type='text/css'
                rel='stylesheet'
                href='https://source.zoom.us/3.9.2/css/bootstrap.css'></link>
            <link
                type='text/css'
                rel='stylesheet'
                href='https://source.zoom.us/3.9.2/css/react-select.css'></link>
        </React.Fragment>
    );
};

export default TeacherMeeting;
