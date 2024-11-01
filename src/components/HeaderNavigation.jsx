/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import Bar from '../assets/Bar.svg';
import { TabsComponents } from '../data/TabsData';
const HeaderNavigation = ({
    toggle,
    tabs,
    setToggle,
    setTabs,
    defaultTabIndex,
    currentIndex,
    setCurrentIndex
}) => {
    useEffect(() => {
        // Set the default tab on mount
        setTabs(TabsComponents[currentIndex].name);
    }, [currentIndex, setTabs]);

    const handleNavigation = (direction) => {
        setCurrentIndex((prevIndex) => {
            let newIndex;
            if (direction === 'next') {
                newIndex = (prevIndex + 1) % TabsComponents.length; // Loop to the start
            } else if (direction === 'prev') {
                newIndex =
                    (prevIndex - 1 + TabsComponents.length) %
                    TabsComponents.length; // Loop to the end
            } else {
                return prevIndex;
            }
            setTabs(TabsComponents[newIndex].name); // Set the new tab name
            return newIndex;
        });
    };

    console.log(tabs, defaultTabIndex);

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
                        <button
                            onClick={() => {
                                handleNavigation('prev');
                            }}
                            className={`text-[#5755d9]`}
                            disabled={currentIndex === 0}>
                            {'<'} Previous
                        </button>
                        <button
                            onClick={() => {
                                handleNavigation('next');
                            }}
                            className={`bg-[#5755d9] text-white px-8 py-2`}
                            disabled={
                                currentIndex === TabsComponents.length - 1
                            }>
                            Next {'>'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeaderNavigation;
