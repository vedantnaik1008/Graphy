import { useEffect, useState } from 'react';
import { TabsComponents } from '../data/TabsData';

const useSlideTabs = () => {
    // const [tabs, setTabs] = useState('Atomic Habits full book');
    const defaultTabIndex = TabsComponents.findIndex(
        (tab) => tab.name === 'Atomic Habits full book'
    );
    // const [toggle, setToggle] = useState({
    //     one: true,
    //     two: false,
    //     three: false,
    //     four: false,
    //     five: false,
    //     six: false,
    //     seven: false
    // });

    const [currentIndex, setCurrentIndex] = useState(
        defaultTabIndex !== -1 ? defaultTabIndex : 0
    );
    const [tabs, setTabs] = useState(TabsComponents[currentIndex].name);

    const updateCurrentIndex = (Name) => {
        const foundIndex = TabsComponents.findIndex((tab) => tab.name === Name);

        setCurrentIndex(foundIndex !== -1 ? foundIndex : 0);
    };
    // useEffect(() => {
    //     // Set the default tab on mount
    //     setTabs(TabsComponents[currentIndex].name);
    //     const newToggle = {
    //         one: false,
    //         two: false,
    //         three: false,
    //         four: false,
    //         five: false,
    //         six: false,
    //         seven: false
    //     };

    //     // Assuming you want to map indices 0-6 to the toggle properties
    //     if (currentIndex >= 0 && currentIndex < 7) {
    //         const key = Object.keys(newToggle)[currentIndex];
    //         newToggle[key] = true; // Set the corresponding toggle to true
    //     }

    //     setToggle(newToggle); // Update the toggle state
    // }, [currentIndex, setTabs]);

    // const handleNavigation = (direction) => {
    //     setCurrentIndex((prevIndex) => {
    //         let newIndex;
    //         if (direction === 'next') {
    //             newIndex = (prevIndex + 1) % TabsComponents.length; // Loop to the start
    //         } else if (direction === 'prev') {
    //             newIndex =
    //                 (prevIndex - 1 + TabsComponents.length) %
    //                 TabsComponents.length; // Loop to the end
    //         } else {
    //             return prevIndex;
    //         }
    //         setTabs(TabsComponents[newIndex].name); // Set the new tab name
    //         return newIndex;
    //     });
    // };
    // const ToggleArrowDown = (index) => {
    //     setToggle((prev) => {
    //         const newToggle = {
    //             one: false,
    //             two: false,
    //             three: false,
    //             four: false,
    //             five: false,
    //             six: false,
    //             seven: false
    //         };

    //         const key = Object.keys(newToggle)[index];

    //         // Toggle the clicked index
    //         newToggle[key] = !prev[key];
    //         return newToggle;
    //     });
    // };
    // console.log(tabs, currentIndex);
    return {
        // handleNavigation,
        currentIndex,
        updateCurrentIndex,
        // toggle,
        // setToggle,
        tabs,
        setTabs,
        // ToggleArrowDown,
        setCurrentIndex
    };
};

export default useSlideTabs;
