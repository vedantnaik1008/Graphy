/* eslint-disable react/prop-types */
import { TabsComponents } from '../data/TabsData';

const Tabs = ({tabs}) => {
    console.log(tabs);
    return (
        <section className=''>
            <div className='transition-all duration-300 ease-in-out w-[90%] mx-auto py-5'>
                {TabsComponents.map((item) => (
                    <div className='' key={item.name}>
                        {tabs === item.name ? item.element : null}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tabs;
