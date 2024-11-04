/* eslint-disable react/prop-types */
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import useStorage from '../../hooks/useStorage';

const Books = ({ bookUrl }) => {
    const { fileLinks, loading } = useStorage(`Books/${bookUrl}`);
const defaultLayoutPluginInstance = defaultLayoutPlugin();
console.log(fileLinks[0]);
    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
                Loading
            </p>
        );

    return (
        <div className='w-full mx-auto my-4 h-full md:mt-5 md:mb-0'>
            {fileLinks[0]?.includes('.pdf') ? (
                <Viewer
                    fileUrl={fileLinks[0]}
                    plugins={[defaultLayoutPluginInstance]}
                />
            ) : (
                <iframe
                    width='300'
                    height='700'
                    className='transition-all
                            duration-300 ease-in-out w-full h-[77dvh]
                            md:h-[83dvh]'
                    src={fileLinks[0]}
                    title='YouTube video player'
                    allow='accelerometer;
                             clipboard-write; encrypted-media;
                            gyroscope; picture-in-picture'
                    allowFullScreen></iframe>
            )}
        </div>
    );
};

export default Books;
