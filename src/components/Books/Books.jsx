/* eslint-disable react/prop-types */

import useStorage from '../../hooks/useStorage';

const Books = ({ bookUrl }) => {
    const { fileLinks } = useStorage(`Books/${bookUrl}`);

    return (
        <div className='w-[90%] mx-auto my-20'>
            <ol className='flex flex-col  gap-8'>
                {fileLinks.map((link, index) => (
                    <li key={index} className=''>
                        {/* <a
                            href={link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className=' max-w-[700px]'>
                            {link.replace(
                                'https://firebasestorage.googleapis.com/v0/b/graphy-c2078.appspot.com/o/Books%2F',
                                ''
                            )}
                            {''}
                            {index + 1}
                        </a> */}
                        <iframe
                            width='300'
                            height='700'
                            className='transition-all
                            duration-300 ease-in-out w-full h-[50dvh]
                            md:h-[77dvh]'
                            src={link}
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
