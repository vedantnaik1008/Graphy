import { useEffect, useState } from 'react';
import Content from './Content';
import SideBar from './SideBar';
import useSideBar from '../hooks/useSideBar';

const DashBoard = () => {
    const { tabsArray } = useSideBar();
    const [tabs, setTabs] = useState(tabsArray && tabsArray[0]);
    const [toggle, setToggle] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (tabsArray?.length > 0) {
            const newIndex = tabsArray.indexOf(tabs);
        }
    }, [tabs, tabsArray]);

    return (
        <section className='lg:flex'>
            <SideBar
                setTabs={setTabs}
                tabs={tabs}
                toggle={toggle}
                setToggle={setToggle}
                setCurrentIndex={setCurrentIndex}
            />
            <Content
                tabs={tabs}
                setTabs={setTabs}
                toggle={toggle}
                setToggle={setToggle}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </section>
    );
};

export default DashBoard;
