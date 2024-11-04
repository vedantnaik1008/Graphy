/* eslint-disable react/prop-types */

import { render } from '../data/render';
import useStorage from '../hooks/useStorage';

const Experiment = ({ bookUrl }) => {
    const { fileLinks, loading } = useStorage(`Books/Atomic Habits/summary`);

    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
                Loading
            </p>
        );

    return (
        <div className='w-full mx-auto my-4 h-full md:mt-5 md:mb-0'>
            <ol className='flex flex-col'>
                {fileLinks.map((link, index) => (
                    <li key={index} className=''>
                        <object
                            width='300'
                            height='700'
                            className='transition-all
                            duration-300 ease-in-out w-full h-[77dvh]
                            md:h-[83dvh]'
                            data={render(link)}
                            title='YouTube video player'
                            ></object>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Experiment;
