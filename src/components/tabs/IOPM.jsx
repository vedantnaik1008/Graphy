// import { useEffect, useState } from 'react';
// import { app } from '../../FirebaseConfig';
// import { getDatabase, ref, get } from 'firebase/database';
import FileUpload from '../FileUpload';
import useStorage from '../../hooks/useStorage';

const IOPM = () => {
  const { latestFiles,fileLinks, progress, handleFileChange, handleUpload } =
      useStorage('hero');
      console.log(latestFiles[0].url);
      

    return (
        <section className=''>
            <iframe
                width='300'
                height='700'
                className='transition-all duration-300 ease-in-out w-full h-[50dvh] md:h-[77dvh]'
                src={`${fileLinks[0]}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>

            <FileUpload progress={progress} handleFileChange={handleFileChange} handleUpload={handleUpload}/>
        </section>
    );
};

export default IOPM;
