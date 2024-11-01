/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useState } from 'react';
import { sideBar } from '../data/data';
import SubItems from './SubItems';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({
    tabs: changeTabs,
    setTabs,
    toggle,
    setToggle,
    defaultTabIndex,
    currentIndex,
    setCurrentIndex
}) => {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleItem = useCallback((sidebarIndex, tabIndex) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [`${sidebarIndex}-${tabIndex}`]:
                !prevState[`${sidebarIndex}-${tabIndex}`]
        }));
    }, []);

    const sidebarItems = useMemo(
        () =>
            sideBar.map((item, index) => ({
                ...item,
                isExpanded: !!expandedItems[index],
                tabs: item.tabs.map((tab, tabIndex) => ({
                    ...tab,
                    isExpanded: !!expandedItems[`${index}-${tabIndex}`]
                }))
            })),
        [expandedItems]
    );

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
                <div className='border-t-1px border-gray-300 p-5 flex flex-col gap-5'>
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
                </div>
                <Link to={'/teacher'} className="bg-purple-700 rounded-sm w-full fixed bottom-0 left-0 font-medium py-4 text-white text-center"><button>Upload</button></Link>
            </aside>
        </>
    );
};

export default SideBar;
