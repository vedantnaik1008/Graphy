/* eslint-disable react/prop-types */

import useStorage from '../../hooks/useStorage';

const Books = ({ bookUrl }) => {
    const { fileLinks, loading } = useStorage(`Books/${bookUrl}`);
    console.log(fileLinks);

    if(loading) return <p className='text-5xl text-black w-[90%] mx-auto h-screen align-middle'>Loading</p>;
    
    return (
        <div className='w-[90%] mx-auto my-20'>
            <ol className='flex flex-col  gap-8'>
                {fileLinks.map((link, index) => (
                    <li key={index} className=''>
                        <embed
                            width='300'
                            height='700'
                            className='transition-all
                            duration-300 ease-in-out w-full h-[50dvh]
                            md:h-[77dvh]'
                            src={link}
                            title='YouTube video player'
                            ></embed>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Books;
