/* eslint-disable react/prop-types */
import { memo } from 'react';

const SubItems = ({
    title,
    headingIcon,
    tabs,
    isExpanded,
    toggle,
    setTabs
}) => {
    return (
        <div className=''>
            <div className='flex gap-2 items-center '>
                <img
                    onClick={toggle}
                    src={headingIcon}
                    alt=''
                    className={`w-5 transition-all duration-200 ease-in-out ${
                        isExpanded ? 'rotate-90' : 'rotate-0'
                    }`}
                />
                <h3>{title}</h3>
            </div>
            {isExpanded && (
                <div
                    className={`ml-8 transition-all duration-200 ease-in-out ${
                        isExpanded ? 'flex flex-col gap-2 py-2' : 'hidden'
                    }`}>
                    {tabs.map((tab, tabIndex) => (
                        <div
                        onClick={()=> setTabs(tab.name)}
                            key={`${tab.name}-${tabIndex}`}
                            className='flex gap-2 items-center'>
                            <img
                                src={tab.icon || tab.completedIcon}
                                alt=''
                                className=''
                            />
                            <p>{tab.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
;

export default memo(SubItems);

