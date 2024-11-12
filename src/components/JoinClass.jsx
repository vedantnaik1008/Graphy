// import StudentMeeting from "./StudentMeeting"

const JoinClass = () => {
  return (
      <section>
          <button className='bg-red-500 px-8 py-2 rounded-md text-white font-semibold'>
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
  );
}

export default JoinClass
