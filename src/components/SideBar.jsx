/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SubItemss from './SubItemss';
import useUserData from '../hooks/useUserData';

const SideBar = ({
    tabs,
    setTabs,
    toggle,
    setToggle,
    setCurrentIndex
}) => {
    const {userData} = useUserData() 
    console.log(userData);
    
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
                <SubItemss
                    setTabs={setTabs}
                    tabs={tabs}
                    setCurrentIndex={setCurrentIndex}
                />
                <div className='w-[98%] mx-auto flex items-center flex-grow'>
                    {userData?.role === 'teacher' && <Link
                        to={'/teacher'}
                        className='bg-[#5755d9] text-center rounded-lg text-white py-2 w-full'>
                        Create Your Course
                    </Link>}
                </div>
            </aside>
        </>
    );
};

export default SideBar;
