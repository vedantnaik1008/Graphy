/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import Bar from '../assets/Bar.svg';
import useSideBar from '../hooks/useSideBar';

const HeaderNavigation = ({
    toggle,
    tabs,
    setToggle,
    setTabs,
    // defaultTabIndex,
    currentIndex,
    setCurrentIndex
}) => {
const { tabsData, tabsArray } = useSideBar();

    const handleNavigation = useCallback(
        (direction) => {
            console.log('Navigating:', direction);
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
                console.log('New index:', newIndex);
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
            console.log('Updated tabs:', tabsArray[currentIndex]);
        }
    }, [tabsArray, currentIndex, setTabs]);

    useEffect(() => {
        updateTabs();
    }, [updateTabs]);
    
    return (
        <section className='shadow-[0px_1px] shadow-gray-300 '>
            <div className='flex items-center justify-between mx-auto w-[90%] py-5'>
                <div className='flex gap-2 items-center'>
                    <img
                        src={Bar}
                        alt=''
                        className='w-5'
                        onClick={() => setToggle(!toggle)}
                    />
                    <h2 className='text-black text-base font-bold hidden md:truncate md:block'>
                        {tabs === undefined ? 'Book Reading Marathon' : tabs}
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
                                currentIndex === tabsArray?.length - 1
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
