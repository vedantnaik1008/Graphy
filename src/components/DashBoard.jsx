import { useState } from 'react';
import Content from './Content';
import SideBar from './SideBar';

const DashBoard = () => {
    const [tabs, setTabs] = useState('Importance of Product Management');
    const [toggle, setToggle] = useState(false)

    return (
        <section className='flex w-full'>
            <SideBar setTabs={setTabs} toggle={toggle} setToggle={setToggle} />
            <Content tabs={tabs} toggle={toggle} setToggle={setToggle} />
        </section>
    );
};

export default DashBoard
