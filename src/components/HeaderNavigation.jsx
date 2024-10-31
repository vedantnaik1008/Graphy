/* eslint-disable react/prop-types */
import Bar from '../assets/Bar.svg';

const HeaderNavigation = ({ toggle, setToggle }) => {
    return (
        <section className='shadow-[0px_1px] shadow-gray-300 '>
            <div className='flex items-center justify-between mx-auto w-[90%] py-10'>
                <div className='flex gap-2 items-center'>
                    <img
                        src={Bar}
                        alt=''
                        className='w-5'
                        onClick={() => setToggle(!toggle)}
                    />
                    <h2 className='text-black text-lg font-bold hidden md:truncate md:block'>
                        Introduction to Product Management
                    </h2>
                </div>
                <div className='flex items-center gap-6'>
                    {/* <p className='text-[#5755d9] text-[12px] md:text-base'>
                        Discuss {'('}
                        <span className='font-bold'>0</span>
                        {')'}
                    </p> */}
                    <div className='flex gap-2  text-[12px] md:text-base'>
                        <button className={`text-[#5755d9]`}>
                            {'<'} Previous
                        </button>
                        <button className={`bg-[#5755d9] text-white px-8 py-2`}>
                            Next {'>'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeaderNavigation;
