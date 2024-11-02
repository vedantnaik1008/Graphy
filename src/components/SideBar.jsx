/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useState } from 'react';
import { sideBar } from '../data/data';
import { useMemo } from 'react';
import SubItemss from './SubItemss';
// import { Link } from 'react-router-dom';

const SideBar = ({
    tabs: changeTabs,
    setTabs,
    toggle,
    setToggle,
    defaultTabIndex,
    currentIndex,
    setCurrentIndex
}) => {

    useEffect(() => {
        console.log('SideBar rendered');
    }, []);

    return (
        <>
            <div
                className={`${
                    !toggle
                        ? 'absolute left-0 top-0 z-30 w-screen h-screen lg:hidden'
                        : 'hidden'
                }`}
                onClick={() => setToggle(!toggle)}
            />
            <aside
                className={` overflow-y-scroll  w-[290px] lg:w-[320px] bg-[#F7F9FA] h-screen transition-all duration-300 ease-in-out ${
                    !toggle
                        ? 'translate-x-0 absolute left-0 z-30 lg:relative'
                        : '-translate-x-full absolute left-0'
                }`}>
                {/* <div className='border-t-1px hidden border-gray-300 p-5  md:hidden gap-5'>
                    {sidebarItems.map((item) => (
                        <SubItems
                            key={item.title}
                            {...item}
                            setTabs={setTabs}
                            changeTabs={changeTabs}
                            defaultTabIndex={defaultTabIndex}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                        />
                    ))}
                </div> */}
                    <SubItemss setTabs={setTabs} currentIndex={currentIndex} />
                {/* <Link to={'/teacher'} className="bg-purple-700 rounded-sm w-full mt-5  font-medium py-4 text-white text-center"><button className='w-full'>Upload</button></Link> */}
            </aside>
        </>
    );
};

export default SideBar;
