/* eslint-disable react/prop-types */
import useSideBar from '../hooks/useSideBar';
import Books from './Books/Books';

const Tabs = ({tabs: tab}) => {
const { tabsArrayUrl } = useSideBar();
console.log(tabsArrayUrl, tab, 'tabsArrayUrl');
 const data = tabsArrayUrl?.map((item) => (item === tab ? true : false));
console.log(tab, data, 'tab??????????');

    
    return (
        <section className='overflow-x-hidden'>
            <div className='transition-all duration-300 ease-in-out w-[98%] h-full md:w-[90%] mx-auto'>
                {tabsArrayUrl?.map((item) => (
                    <div className='' key={`@${item}`}>
                        {tab.toString() === item.toString() ? (
                            <Books bookUrl={`${item}`} />
                        ) : null}
                        {/* <Books bookUrl={`${item}`} /> */}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tabs;
