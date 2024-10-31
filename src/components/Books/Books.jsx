/* eslint-disable react/prop-types */

import { render } from '../../data/render';
import useStorage from '../../hooks/useStorage';

const Books = ({ bookUrl }) => {
    const { fileLinks, loading } = useStorage(`Books/${bookUrl}`);
    console.log(fileLinks[0]);

    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] mx-auto h-screen align-middle'>
                Loading
            </p>
        );

    return (
        <div className='w-full md:w-[90%] mx-auto my-4 h-full md:my-20'>
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
