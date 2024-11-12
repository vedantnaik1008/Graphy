// import StudentMeeting from "./StudentMeeting"

import { useState } from "react";

const JoinClass = () => {
    const [click, setClick] = useState(false)
  return (
      <>
          <section>
              <button
                  onClick={() => setClick(!click)}
                  className='bg-red-500 px-8 py-2 rounded-md text-white font-semibold'>
                  <a href='https://us05web.zoom.us/j/84455284950?pwd=KncTAMdfOd22udB83LXDAEehYVbfMo.1'>
                      Join Class
                  </a>
              </button>
              <p className='my-2'>{''}</p>
              {/* <StudentMeeting
        apiKey={'9rpnPUyQGaoHcg0zCrylg'}
        apiSecret={'ipM8QJ8btL3HO3FHLDTIx7iZcVxUHz3v'}
    /> */}
          </section>
          <button className="text-lg text-red-500 absolute right-0 top-0">X</button>
          {click && <div className='absolute left-0 top-0 w-[80%] mx-auto'>
              <iframe src='https://us05web.zoom.us/j/88687991153?pwd=6jpTHbdDNBbLR131B17N3CgR3yNAzb.1'></iframe>
          </div>}
      </>
  );
}

export default JoinClass
