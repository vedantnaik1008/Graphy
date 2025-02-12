/* eslint-disable react/prop-types */
import HeaderNavigation from "./HeaderNavigation";
import Tabs from "./Tabs";


const Content = ({ tabs, toggle, setToggle, setTabs, currentIndex, setCurrentIndex }) => {
    return (
        <section className='overflow-y-scroll transition-all duration-300 ease-in-out flex-grow h-screen'>
            <HeaderNavigation
                toggle={toggle}
                setTabs={setTabs}
                tabs={tabs}
                setToggle={setToggle}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
            <Tabs tabs={tabs} />
        </section>
    );
};

export default Content
