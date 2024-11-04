import { useEffect, useState } from 'react';
import Content from './Content';
import SideBar from './SideBar';
import { TabsComponents } from '../data/TabsData';
import useSideBar from '../hooks/useSideBar';

const DashBoard = () => {
    const [tabs, setTabs] = useState('Atomic Habits full book');
    const [toggle, setToggle] = useState(false);
    const { tabsData, tabsArray } = useSideBar();

    const [currentIndex, setCurrentIndex] = useState(0);

     useEffect(() => {
         if (tabsArray?.length > 0) {
             const newIndex = tabsArray.indexOf(tabs);
              console.log('Updating currentIndex:', newIndex);
         }
     }, [tabs, tabsArray]);

      console.log('Rendered with currentIndex:', currentIndex);


    return (
        <section className='lg:flex'>
            <SideBar
                setTabs={setTabs}
                tabs={tabs}
                toggle={toggle}
                setToggle={setToggle}
                // defaultTabIndex={defaultTabIndex}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
            <Content
                tabs={tabs}
                setTabs={setTabs}
                toggle={toggle}
                setToggle={setToggle}
                // defaultTabIndex={defaultTabIndex}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </section>
    );
};

export default DashBoard
