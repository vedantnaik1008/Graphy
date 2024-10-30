/* eslint-disable react/prop-types */

import useStorage from '../../hooks/useStorage';

const Books = ({ bookUrl }) => {
    const { fileLinks, loading } = useStorage(`Books/${bookUrl}`);

    // const render = (url) => {
    //     if (
    //         url?.includes(
    //             'https://firebasestorage.googleapis.com/v0/b/graphy-c2078.appspot.com/o/Books%2FAtomic%20Habits%2Fpdf%2FBook%201-Atomic_Habits_by_James_Clear-1.pdf?alt=media&token=77263345-cdf3-4a1a-b451-ce55134e4163'
    //         )
    //     ) {
    //         return 'https://drive.google.com/file/d/1jlurAicrREeP9C5PbsYdJYT9ItyuGevf/preview';
    //     } else if (
    //         url?.includes(
    //             'https://firebasestorage.googleapis.com/v0/b/graphy-c2078.appspot.com/o/Books%2FBetter%20Than%20Before%2Fpdf%2FBook%202-Better-Than-Before-Mastering-the-Habits-of-Our-Everyday-Lives.pdf?alt=media&token=f213b20d-026b-4114-b542-cb14bcd0be62'
    //         )
    //     ) {
    //         return 'https://drive.google.com/file/d/1j5WmlyH9128NK7M0skXOMbQ_KzLGU4fq/preview';
    //     } else if (url?.includes('Tiny Habits Summary .pdf')) {
    //         return 'https://drive.google.com/file/d/1j5WmlyH9128NK7M0skXOMbQ_KzLGU4fq/preview';
    //     } else if (url?.includes('WillPower Summary .pdf')) {
    //         return 'https://drive.google.com/file/d/1j5WmlyH9128NK7M0skXOMbQ_KzLGU4fq/preview';
    //     } else if (url?.includes('The Habit Blueprint summary .pdf')) {
    //         return 'https://drive.google.com/file/d/1j5WmlyH9128NK7M0skXOMbQ_KzLGU4fq/preview';
    //     } else if (url?.includes('You Are Not Your Brain summary .pdf')) {
    //         return 'https://drive.google.com/file/d/1j5WmlyH9128NK7M0skXOMbQ_KzLGU4fq/preview';
    //     } else if (url?.includes('Habits Of Highly Effective People .pdf')) {
    //         return 'https://drive.google.com/file/d/1j5WmlyH9128NK7M0skXOMbQ_KzLGU4fq/preview';
    //     } else if (
    //         url?.includes('Habits Of Highly Effective People summary .pdf')
    //     )
    //         return url;
    // };


    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] mx-auto h-screen align-middle'>
                Loading
            </p>
        );

    return (
        <div className='w-[90%] mx-auto my-20'>
            <ol className='flex flex-col  gap-8'>
                {fileLinks.map((link, index) => (
                    <li key={index} className=''>
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
