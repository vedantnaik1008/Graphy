/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useState } from 'react';
import { sideBar } from '../data/data';
import SubItems from './SubItems';
import { useMemo } from 'react';

const SideBar = ({setTabs, toggle, setToggle}) => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleItem = useCallback((index) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }, []);

    const sidebarItems = useMemo(
        () =>
            sideBar.map((item, index) => ({
                ...item,
                isExpanded: !!expandedItems[index],
                toggle: () => toggleItem(index)
            })),
        [expandedItems, toggleItem]
    );
     useEffect(() => {
         console.log('SideBar rendered');
     }, []);

    return (
        <><div className={`${!toggle ? 'absolute left-0 top-0 z-30 w-screen h-screen lg:hidden' : 'hidden'}`} onClick={()=> setToggle(!toggle)}/>
        <aside
            className={`w-[290px] lg:w-[320px] bg-[#F7F9FA] h-screen transition-all duration-300 ease-in-out ${!toggle
                    ? 'translate-x-0 absolute left-0 z-30 lg:relative'
                    : '-translate-x-full absolute left-0'}`}>
            <div className='border-b-1px border-gray-300'>
                <img src='' alt='' />
            </div>
            <div className='border-y-1px border-gray-300'>
                <p className='w-full bg-black rounded-md'></p>
                <p>13% completed in 22m</p>
            </div>
            <div className='border-y-1px border-gray-300'>
                <div className=''>
                    <img src='' alt='' className='' />
                    <p></p>
                </div>
                <img src='' alt='' className='' />
            </div>
            <div className='border-t-1px border-gray-300 p-5 flex flex-col gap-5 overflow-y-scroll '>
                {sidebarItems.map((item) => (
                    <SubItems key={item.title} {...item} setTabs={setTabs} />
                ))}
            </div>
        </aside></>
    );
};

export default SideBar;
