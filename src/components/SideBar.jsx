/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useState } from 'react';
import { sideBar } from '../data/data';
import { useMemo } from 'react';
import SubItemss from './SubItemss';
// import { Link } from 'react-router-dom';

const SideBar = ({
    tabs,
    setTabs,
    toggle,
    setToggle,
    // defaultTabIndex,
    currentIndex,
    setCurrentIndex
}) => {

 

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
                    <SubItemss setTabs={setTabs} tabs={tabs} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
            </aside>
        </>
    );
};

export default SideBar;
