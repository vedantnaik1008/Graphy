/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import useSideBar from '../hooks/useSideBar';
import PDF from '../assets/pdfIcon.svg';
import HeadingIcon from '../assets/HeadingIcon.svg';

const SubItemss = ({ setTabs, setCurrentIndex, currentIndex }) => {
    const [click, setClick] = useState(true);
    const [clickOne, setClickOne] = useState(false);
    const { tabsData, tabsArray } = useSideBar();
    const initialToggleState = useMemo(
        () =>
            Array.from({ length: tabsData.length }).reduce(
                (acc, _, index) => ({
                    ...acc,
                    [`tab${index}`]: false
                }),
                {}
            ),
        [tabsData]
    );
    const [toggle, setToggle] = useState(initialToggleState);

    const ToggleArrowDown = (index) => {
        setToggle((prevState) => ({
            ...prevState,
            [`tab${index}`]: !prevState[`tab${index}`]
        }));
    };

    const changeTabsAndSetCurrentIndex = (tab, item) => {
        const newTabName = `${tab} ${item}`;
        setTabs(newTabName);
        
        
        setCurrentIndex(() => {
            if (tabsArray?.length > 0) {
                const newIndex = tabsArray.findIndex(
                    (tab) => tab.replace(/\//g, ' ') === newTabName
                );
                return newIndex !== -1 ? newIndex : 0;
            }
            return 0;
        });
        
    };

    return (
        <div className='border-t-1px border-gray-300 p-5 flex flex-col gap-5 relative'>
            {tabsData?.map((item) => (
                <div className='pl-8' key={'@' + item.name}>
                    <div className='cursor-pointer flex gap-2 items-center justify-between'>
                        <h3
                            onClick={() => setClick((prevState) => !prevState)}
                            className='font-semibold'>
                            Book Reading Marathon
                        </h3>
                        <img
                            onClick={() => setClick((prevState) => !prevState)}
                            src={HeadingIcon}
                            alt=''
                            className={` transition-all duration-200 ease-in-out w-[8%] ${
                                click ? 'rotate-90' : 'rotate-0'
                            }`}
                        />
                    </div>
                    {click && (
                        <div
                            className={`ml-4 mt-3 transition-all duration-200 ease-in-out ${
                                click ? 'flex flex-col gap-4 py-2' : 'hidden'
                            }`}>
                            {item.tabs.map((tab, tabIndex) => (
                                <div
                                    className=''
                                    key={`${tab.name}-${tabIndex}`}>
                                    <div className='flex gap-2 items-center justify-between'>
                                        <div className='flex gap-2 items-center cursor-pointer'>
                                            <img
                                                src={PDF}
                                                alt=''
                                                className='cursor-pointer'
                                            />
                                            <p
                                                onClick={() =>
                                                    ToggleArrowDown(tabIndex)
                                                }
                                                className='text-sm md:text-base'>
                                                {tab.name}
                                            </p>
                                        </div>

                                        <img
                                            src={HeadingIcon}
                                            alt=''
                                            onClick={() =>
                                                ToggleArrowDown(tabIndex)
                                            }
                                            className={`cursor-pointer w-[8%] transition-all duration-200 ease-in-out ${
                                                toggle[`tab${tabIndex}`]
                                                    ? 'rotate-90'
                                                    : 'rotate-0'
                                            }`}
                                        />
                                    </div>

                                    {toggle[`tab${tabIndex}`] && (
                                        <div className='flex flex-col gap-1 ml-4'>
                                            {tab.sub?.map(
                                                (subItem, subIndex) => (
                                                    <div
                                                        key={`${subItem.name}-${subIndex}`}
                                                        className='flex flex-col gap-2 relative'>
                                                        <p
                                                            onClick={() => {
                                                                changeTabsAndSetCurrentIndex(
                                                                    tab.name,
                                                                    subItem.name
                                                                );
                                                            }}
                                                            className='cursor-pointer'>
                                                            {subItem.name}
                                                        </p>
                                                        {subItem?.subFolders
                                                            ?.length > 0 && (
                                                            <img
                                                                src={
                                                                    HeadingIcon
                                                                }
                                                                onClick={() =>
                                                                    setClickOne(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                                alt=''
                                                                className={`cursor-pointer w-[8%] transition-all duration-200 ease-in-out absolute right-0 ${
                                                                    clickOne
                                                                        ? 'rotate-90'
                                                                        : 'rotate-0'
                                                                }`}
                                                            />
                                                        )}

                                                        <div className='ml-4 flex flex-col gap-2'>
                                                            {subItem?.subFolders?.map(
                                                                (
                                                                    subFolder,
                                                                    subFolderIndex
                                                                ) => (
                                                                    <React.Fragment
                                                                        key={`subFolder-${subFolderIndex}`}>
                                                                        {clickOne && (
                                                                            <p
                                                                                onClick={() =>
                                                                                    changeTabsAndSetCurrentIndex(
                                                                                        tab.name +
                                                                                            ' ' +
                                                                                            subItem.name,
                                                                                        subFolder.name
                                                                                    )
                                                                                }
                                                                                className='cursor-pointer'>
                                                                                {
                                                                                    subFolder.name
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </React.Fragment>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubItemss;
