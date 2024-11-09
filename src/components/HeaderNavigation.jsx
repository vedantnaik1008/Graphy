/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import Bar from '../assets/Bar.svg';
import useSideBar from '../hooks/useSideBar';
import FirebaseAuth from './FireBaseAuth';

const HeaderNavigation = ({
    toggle,
    tabs,
    setToggle,
    setTabs,
    currentIndex,
    setCurrentIndex
}) => {
const { tabsArray } = useSideBar();

    const handleNavigation = useCallback(
        (direction) => {
            setCurrentIndex((prevIndex) => {
                let newIndex;
                if (direction === 'next') {
                    newIndex = (prevIndex + 1) % tabsArray?.length;
                } else if (direction === 'prev') {
                    newIndex =
                        (prevIndex - 1 + tabsArray?.length) % tabsArray?.length;
                } else {
                    return prevIndex;
                }
                return newIndex;
            });
        },
        [tabsArray, setCurrentIndex]
    );

    const updateTabs = useCallback(() => {
        if (
            tabsArray?.length > 0 &&
            currentIndex >= 0 &&
            currentIndex < tabsArray.length
        ) {
            setTabs(tabsArray[currentIndex]);
        }
    }, [tabsArray, currentIndex, setTabs]);

    useEffect(() => {
        updateTabs();
    }, [updateTabs]);
    
    return (
        <section className='shadow-[0px_1px] shadow-gray-300 '>
            <div className='flex flex-col gap-2 items-start md:flex-row md:items-center md:gap-1 md:justify-between mx-auto w-[98%] md:w-[90%] py-2 md:py-5'>
                <div className='flex gap-2 items-center'>
                    <img
                        src={Bar}
                        alt=''
                        className='w-5'
                        onClick={() => setToggle(!toggle)}
                    />
                    <h2 className='text-black text-[10px] md:text-sm xl:text-base font-bold truncate block'>
                        {tabs === undefined
                            ? 'Book Reading Marathon'
                            : tabs.replace(/\//g, ' ')}
                    </h2>
                </div>
                <div className='flex items-center gap-6'>
                    <div className='flex gap-2 text-[12px] md:text-base'>
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
                            className={`bg-[#5755d9] text-white px-6 py-1 md:px-8 md:py-2`}
                            disabled={currentIndex === tabsArray?.length - 1}>
                            Next {'>'}
                        </button>
                    </div>

                    <FirebaseAuth />
                </div>
            </div>
        </section>
    );
};

export default HeaderNavigation;
