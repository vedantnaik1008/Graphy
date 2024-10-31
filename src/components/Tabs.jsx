/* eslint-disable react/prop-types */
import { TabsComponents } from '../data/TabsData';

const Tabs = ({tabs}) => {

    return (
        <section className=' overflow-y-scroll overflow-x-hidden h-screen  md:pb-5'>
            <div className='transition-all duration-300 ease-in-out w-[98%] h-full md:w-[90%] mx-auto'>
                {TabsComponents.map((item) => (
                    <div className='' key={`@${item.id}`}>
                        {tabs === item.name ? item.element : null}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tabs;
