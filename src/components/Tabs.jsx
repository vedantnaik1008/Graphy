/* eslint-disable react/prop-types */
import useSideBar from '../hooks/useSideBar';
import Books from './Books/Books';

const Tabs = ({tabs: tab}) => {
const { tabsData } = useSideBar()

    return (
        <section className=' overflow-y-scroll overflow-x-hidden h-screen  md:pb-5'>
            <div className='transition-all duration-300 ease-in-out w-[98%] h-full md:w-[90%] mx-auto'>
                {tabsData[0]?.tabs.map((item) => (
                    <div className='' key={`@${item.name}`}>
                        {tab === item.name + ' ' + `${item.sub[0].name}` ? (
                            <Books
                                bookUrl={`${item.name}/${item.sub[0].name}`}
                            />
                        ) : null}
                        {tab === item.name + ' ' + `${item.sub[1].name}` ? (
                            <Books
                                bookUrl={`${item.name}/${item.sub[1].name}`}
                            />
                        ) : null}
                        {tab === item.name + ' ' + `${item.sub[2].name}` ? (
                            <Books
                                bookUrl={`${item.name}/${item.sub[2].name}`}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tabs;
