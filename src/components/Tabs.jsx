/* eslint-disable react/prop-types */
import useSideBar from '../hooks/useSideBar';
import Books from './Books/Books';

const Tabs = ({tabs: tab}) => {
const { tabsArrayUrl } = useSideBar();
console.log(tabsArrayUrl, tab, 'tabsArrayUrl');
const data = tabsArrayUrl?.map((url) => url.split('/').slice(2).join(' '));
console.log(data, 'data');

    
    return (
        <section className=' overflow-y-scroll overflow-x-hidden h-screen'>
            <div className='transition-all duration-300 ease-in-out w-[98%] h-full md:w-[90%] mx-auto'>
                {tabsArrayUrl?.map((item) => (
                    <div className='' key={`@${item}`}>
                        {tab?.replace(/\//g, ' ') ===
                        item.split('/').slice(2).join(' ') ? (
                            <Books bookUrl={`${item}`} />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tabs;
