import { useState } from 'react';
import Content from './Content';
import SideBar from './SideBar';
import { TabsComponents } from '../data/TabsData';

const DashBoard = () => {
    const [tabs, setTabs] = useState('Atomic Habits full book');
    const [toggle, setToggle] = useState(false)
    const defaultTabIndex = TabsComponents.findIndex(
        (tab) => tab.name === tabs
    );

    const [currentIndex, setCurrentIndex] = useState(
        defaultTabIndex !== -1 ? defaultTabIndex : 0
    );

    return (
        <section className='lg:flex'>
            <SideBar
                setTabs={setTabs}
                tabs={tabs}
                toggle={toggle}
                setToggle={setToggle}
                defaultTabIndex={defaultTabIndex}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
            <Content
                tabs={tabs}
                setTabs={setTabs}
                toggle={toggle}
                setToggle={setToggle}
                defaultTabIndex={defaultTabIndex}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </section>
    );
};

export default DashBoard
