/* eslint-disable react/prop-types */
import { TabsComponents } from '../data/TabsData';
import PMPO from './tabs/PMPO';

const Tabs = ({tabs}) => {
    
    console.log(tabs);
    
    
    return (
        <section className=' overflow-y-scroll overflow-x-hidden h-screen py-20 md:py-10'>
            <div className='transition-all duration-300 ease-in-out w-[90%] mx-auto py-5'>
                {TabsComponents.map((item) => (
                    <div className='' key={item.name}>
                        {tabs === item.name ? item.element : null}
                        {item.sub &&
                        tabs === 'Products Management Point One' ? (
                            <PMPO />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tabs;
