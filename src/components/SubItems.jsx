/* eslint-disable react/prop-types */
import { memo, useState } from 'react';

const SubItems = ({
    title,
    headingIcon,
    tabs,
    isExpanded,
    toggle,
    setTabs
}) => {
  
    const [click, setClick] = useState(false)
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
                        <div className='' key={`${tab.name}-${tabIndex}`}>
                            <div
                                onClick={() =>{ setTabs(tab.name); setClick((prev)=> !prev)}}
                                className='flex gap-2 items-center'>
                                <img
                                    src={tab.icon || tab.completedIcon}
                                    alt=''
                                    className=''
                                />
                                <p>{tab.name}</p>
                                {tab?.sub > 0 && <img
                                    onClick={toggle}
                                    src={headingIcon}
                                    alt=''
                                    className={`w-5 transition-all duration-200 ease-in-out ${
                                        isExpanded ? 'rotate-90' : 'rotate-0'
                                    }`}
                                />}
                            </div>
                            {click && (
                                <div className='flex gap-2 items-center ml-8'>
                                    {tab?.sub?.map((item, Index) => (
                                        <div
                                            key={`${item.name}-${Index}`}
                                            className='flex gap-2 items-center'>
                                            <img
                                                src={
                                                    item.icon ||
                                                    item.completedIcon
                                                }
                                                alt=''
                                                className=''
                                            />
                                            <p
                                                onClick={() =>
                                                    setTabs(item.name)
                                                }>
                                                {item.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
;

export default memo(SubItems);

