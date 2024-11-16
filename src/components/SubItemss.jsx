/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import useSideBar from '../hooks/useSideBar';
import PDF from '../assets/pdfIcon.svg';
import HeadingIcon from '../assets/HeadingIcon.svg';
import JoinClass from './JoinClass';

const SubItemss = ({ setTabs, setCurrentIndex }) => {
    const { tabsData, tabsArray } = useSideBar();
    const initialToggleState = useMemo(
        () =>
            tabsData?.reduce((acc, item) => {
                if (item.tabs) {
                    item.tabs.forEach((tab, firstIndex) => {
                        acc[`firstIndex-${item.title}-${firstIndex}`] = false; // Track toggle state for each course

                        if (item.tabs) {
                            item.tabs.forEach((tab, tabIndex) => {
                                acc[`tab-${item.name}-${tabIndex}`] = false; // Track toggle state for each tab
                                if (tab.sub) {
                                    tab.sub.forEach((subItem, subIndex) => {
                                        acc[
                                            `subItem-${item.name}-${tabIndex}-${subIndex}`
                                        ] = false; // Track toggle state for each subItem
                                    });
                                }
                            });
                        }
                    });
                }
                return acc;
            }, {}),
        [tabsData]
    );

    const [toggleState, setToggleState] = useState(initialToggleState);

    const ToggleArrowDown = (type, index) => {
        setToggleState((prevState) => ({
            ...prevState,
            [type]: !prevState[type]
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
        <div className='border-t-1px border-gray-300 p-5 flex flex-col gap-3 relative'>
            {tabsData?.map((item, firstIndex) => (
                <div className='pl-8' key={'@' + item.title}>
                    <div className='cursor-pointer flex gap-2 items-center justify-between'>
                        <h3
                            onClick={() =>
                                ToggleArrowDown(
                                    `firstIndex${item.title}`,
                                    firstIndex
                                )
                            }
                            className='font-semibold'>
                            {item.title}
                        </h3>
                        <img
                            onClick={() =>
                                ToggleArrowDown(
                                    `firstIndex${item.title}`,
                                    firstIndex
                                )
                            }
                            src={HeadingIcon}
                            alt=''
                            className={` transition-all duration-200 ease-in-out w-[8%] ${
                                toggleState[`firstIndex${item.title}`]
                                    ? 'rotate-90'
                                    : 'rotate-0'
                            }`}
                        />
                    </div>
                    {toggleState[`firstIndex${item.title}`] && (
                        <div
                            className={`ml-4  transition-all duration-200 ease-in-out ${
                                toggleState[`firstIndex${item.title}`]
                                    ? 'flex flex-col gap-4 py-2'
                                    : 'flex flex-col gap-4 py-2'
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
                                                    ToggleArrowDown(
                                                        `tab${tab.name}`,
                                                        tabIndex
                                                    )
                                                }
                                                className='text-sm md:text-base'>
                                                {tab.name}
                                            </p>
                                        </div>

                                        <img
                                            src={HeadingIcon}
                                            alt=''
                                            onClick={() =>
                                                ToggleArrowDown(
                                                    `tab${tab.name}`,
                                                    tabIndex
                                                )
                                            }
                                            className={`cursor-pointer w-[8%] transition-all duration-200 ease-in-out ${
                                                toggleState[`tab${tab.name}`]
                                                    ? 'rotate-90'
                                                    : 'rotate-0'
                                            }`}
                                        />
                                    </div>

                                    {toggleState[`tab${tab.name}`] && (
                                        <div className='flex flex-col gap-1 ml-4 mt-1'>
                                            {tab.sub?.map(
                                                (subItem, subIndex) => (
                                                    <div
                                                        key={`${subItem.name}-${subIndex}`}
                                                        className='flex flex-col gap-0 relative'>
                                                        <p
                                                            onClick={() => {
                                                                changeTabsAndSetCurrentIndex(
                                                                    tab.name,
                                                                    subItem.name
                                                                );
                                                            }}
                                                            className='cursor-pointer text-sm'>
                                                            {subItem.name}
                                                        </p>
                                                        {subItem?.subFolders
                                                            ?.length > 0 && (
                                                            <img
                                                                src={
                                                                    HeadingIcon
                                                                }
                                                                onClick={() =>
                                                                    ToggleArrowDown(
                                                                        `subFolder-${subItem?.subFolders?.map(
                                                                            (
                                                                                subFolder
                                                                            ) =>
                                                                                subFolder.name
                                                                        )}`,
                                                                        subIndex
                                                                    )
                                                                }
                                                                alt=''
                                                                className={`cursor-pointer w-[8%] transition-all duration-200 ease-in-out absolute right-0 ${
                                                                    toggleState[
                                                                        `subFolder-${subItem?.subFolders?.map(
                                                                            (
                                                                                subFolder
                                                                            ) =>
                                                                                subFolder.name
                                                                        )}`
                                                                    ]
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
                                                                        {toggleState[
                                                                            `subFolder-${subFolder.name}`
                                                                        ] && (
                                                                            <p
                                                                                onClick={() =>
                                                                                    changeTabsAndSetCurrentIndex(
                                                                                        tab.name +
                                                                                            ' ' +
                                                                                            subItem.name,
                                                                                        subFolder.name
                                                                                    )
                                                                                }
                                                                                className='cursor-pointer text-sm'>
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
                            <JoinClass />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SubItemss;
