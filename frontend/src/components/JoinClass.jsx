// import StudentMeeting from "./StudentMeeting"

import { useState } from "react";
import Meeting from "../pages/Meeting";
import { useParams } from "react-router-dom";

const JoinClass = () => {
    const { userId } = useParams();
    const [click, setClick] = useState(false)
    let payload = {
        meetingNumber: 82549809031,
        role: 0,
        sdkKey: import.meta.env.VITE_REACT_CLIENT_ID,
        sdkSecret: import.meta.env.VITE_REACT_CLIENT_SECRET,
        passWord: 'iGP5wT',
        userName: 'Vedant Naik',
        userEmail: 'vedunaik777@gmail.com',
        leaveUrl: `http://localhost:5173/dashboard/${userId}`
    };
  return (
      <>
          <section>
              <button
                  onClick={() => setClick(!click)}
                  className='bg-red-500 px-8 py-2 rounded-md text-white font-semibold'>
                      Join Class
              </button>
              <p className='my-2'>{''}</p>
          </section>
          {click && (
              <div className='absolute left-0 top-0 w-full h-screen mx-auto z-[1000] bg-white'>
                  <Meeting payload={payload} />
              </div>
          )}
      </>
  );
}

export default JoinClass
