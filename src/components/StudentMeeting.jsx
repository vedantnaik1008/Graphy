// /* eslint-disable react/prop-types */
// import React, { useEffect } from 'react';
// import { ZoomMtg } from '@zoomus/websdk';
// import { useLocation } from 'react-router-dom';

// ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.3/lib', '/av'); 
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

// const StudentMeeting = ({ apiKey, apiSecret }) => {
//   const query = new URLSearchParams(useLocation().search);
//   const meetingNumber = query.get("meetingNumber");
//   const passcode = query.get("passcode");

//   useEffect(() => {
//     if (!meetingNumber || !passcode) return;

//     const generateSignature = () => {
//       ZoomMtg.generateSignature({
//         meetingNumber,
//         apiKey,
//         apiSecret,
//         role: 0, // Role as participant
//         success: function (res) {
//           joinMeeting(res.result);
//         },
//       });
//     };

//     const joinMeeting = (signature) => {
//       ZoomMtg.init({
//         leaveUrl: "https://yourapp.com",
//         isSupportAV: true,
//         success: () => {
//           ZoomMtg.join({
//             meetingNumber,
//             userName: "Student",
//             signature,
//             apiKey,
//             passcode,
//             success: () => console.log("Student joined successfully"),
//           });
//         },
//       });
//     };

//     generateSignature();
//   }, [apiKey, apiSecret, meetingNumber, passcode]);

//   return (
//     <div id="zoom-student-container">
//       <h2>Student Meeting</h2>
//       <div id="zmmtg-root"></div>
//     </div>
//   );
// };

// export default StudentMeeting;
