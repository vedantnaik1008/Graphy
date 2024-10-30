/* eslint-disable react/prop-types */
import { memo, useState } from 'react';

const SubItems = ({ title, headingIcon, tabs, setTabs }) => {
    const [click, setClick] = useState(false);
    const [toggle, setToggle] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false
    });

    const ToggleArrowDown = (index) => {
        setToggle((prev) => {
            const newToggle = {
                one: false,
                two: false,
                three: false,
                four: false,
                five: false,
                six: false,
                seven: false
            };

            const key = Object.keys(newToggle)[index];

            // Toggle the clicked index
            newToggle[key] = !prev[key];
            return newToggle;
        });
    };

    return (
        <div className='pl-8'>
            <div className='flex gap-2 items-center justify-between'>
                <h3 className='font-semibold'>{title}</h3>
                <img
                    onClick={() => setClick((prevState) => !prevState)}
                    src={headingIcon}
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
                    {tabs.map((tab, tabIndex) => (
                        <div className='' key={`${tab.name}-${tabIndex}`}>
                            <div className='flex gap-2 items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={tab.icon || tab.completedIcon}
                                        alt=''
                                        className=''
                                    />
                                    <p className='text-sm md:text-base'>
                                        {tab.name}
                                    </p>
                                </div>

                                <img
                                    src={headingIcon}
                                    alt=''
                                    onClick={() => ToggleArrowDown(tabIndex)}
                                    className={`w-[8%] transition-all duration-200 ease-in-out ${
                                        toggle[Object.keys(toggle)[tabIndex]]
                                            ? 'rotate-90'
                                            : 'rotate-0'
                                    }`}
                                />
                            </div>

                            {toggle[Object.keys(toggle)[tabIndex]] && (
                                <div className='flex flex-col gap-1 ml-4'>
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
                                                    setTabs(
                                                        tab.name +
                                                            ' ' +
                                                            item.name
                                                    )
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
export default memo(SubItems);
