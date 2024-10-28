import AtomicHabits from "../components/Books/AtomicHabits";
import Books from "../components/Books/Books";
import IOPM from "../components/tabs/IOPM";
import PDLC from "../components/tabs/PDLC";
import PMPO from "../components/tabs/PMPO";
import { sideBar } from "./data";

export const TabsComponents = [
    {
        element: <IOPM />,
        name: 'Importance of Product Management',
        sub: [
            {
                element: <PMPO />,
                name: 'Products Management Point One'
            }
        ]
    },
    { element: <PDLC />, name: 'Product Development Lifecycle' },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[0].name} />,
        name: 'Atomic Habits'
    },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[1].name} />,
        name: 'Better Than Before'
    },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[2].name} />,
        name: 'Tiny Habits'
    },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[3].name} />,
        name: 'Will Power'
    },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[4].name} />,
        name: 'Habits Of Highly Effective People'
    },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[5].name} />,
        name: 'The Habits Blueprint'
    },
    {
        element: <Books bookUrl={sideBar[sideBar.length - 1].tabs[6].name} />,
        name: 'You Are Not Your Brain'
    }
    // { element: < />, name: 'Market Identification' },
    // {
    //     element: < />, name: 'Competitive Analysis'
    // },
    // {
    //     element: < />, name: 'Consumer Behavior (coming soon)'
    // },
    // {
    //     element: < />, name: 'Market Trends (coming soon)'
    // },
    // {
    //     element: < />, name: 'Defining Product Vision (coming soon)'
    // },
    // {
    //     element: < />, name: 'Setting Product Goals (coming soon)'
    // },
    // {
    //     element: < />, name: 'Roadmapping (coming soon)'
    // },

    // {
    //     element: < />, name: 'Cross-functional Collaboration (coming soon)'
    // },
    // {
    //     element: < />, name: 'Prototyping and MVP (coming soon)'
    // },
    // {
    //     element: < />, name: 'Launch Strategies (coming soon)'
    // },
    // {
    //     element: < />, name: 'Managing Product Performance (coming soon)'
    // },
    // {
    //     element: < />, name: 'Iterative Improvement (coming soon)'
    // },
    // {
    //     element: < />, name: 'End-of-Life Strategies (coming soon)'
    // }
];
