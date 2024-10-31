/* eslint-disable react/prop-types */
import HeaderNavigation from "./HeaderNavigation";
import Tabs from "./Tabs";


const Content = ({tabs, toggle, setToggle, setTabs}) => {
  return (
      <section className='transition-all duration-300 ease-in-out flex-grow'>
          <HeaderNavigation
              toggle={toggle}
              setTabs={setTabs}
              tabs={tabs}
              setToggle={setToggle}
          />
          <Tabs tabs={tabs} />
      </section>
  );
}

export default Content
