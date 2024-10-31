/* eslint-disable react/prop-types */

import { render } from '../../data/render';
import useStorage from '../../hooks/useStorage';

const Books = ({ bookUrl }) => {
    const { fileLinks, loading } = useStorage(`Books/${bookUrl}`);
    console.log(fileLinks[0]);

    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
                Loading
            </p>
        );

    return (
        <div className='w-full md:w-[90%] xl:w-[80%] mx-auto my-4 h-full md:mt-5'>
            <ol className='flex flex-col'>
                {fileLinks.map((link, index) => (
                    <li key={index} className=''>
                        <iframe
                            width='300'
                            height='700'
                            className='transition-all
                            duration-300 ease-in-out w-full h-[77dvh]
                            md:h-[77dvh]'
                            src={render(link)}
                            title='YouTube video player'
                            allow='accelerometer;
                             clipboard-write; encrypted-media;
                            gyroscope; picture-in-picture'
                            allowFullScreen></iframe>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Books;
