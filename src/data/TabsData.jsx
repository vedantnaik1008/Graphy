import Books from '../components/Books/Books';
import { sideBar } from './data';

export const TabsComponents = [
    {
        id: 1,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[0].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'Atomic Habits summary'
    },
    {
        id: 2,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[0].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'Atomic Habits audio summary'
    },
    {
        id: 3,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[0].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'Atomic Habits full book'
    },

    {
        id: 4,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[1].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'Better Than Before summary'
    },
    {
        id: 5,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[1].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'Better Than Before audio summary'
    },
    {
        id: 6,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[1].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'Better Than Before full book'
    },

    {
        id: 7,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[2].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'Tiny Habits summary'
    },
    {
        id: 8,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[2].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'Tiny Habits audio summary'
    },
    {
        id: 9,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[2].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'Tiny Habits full book'
    },

    {
        id: 10,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[3].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'Will Power summary'
    },
    {
        id: 11,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[3].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'Will Power audio summary'
    },
    {
        id: 12,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[3].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'Will Power full book'
    },

    {
        id: 13,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[4].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'Habits Of Highly Effective People summary'
    },
    {
        id: 14,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[4].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'Habits Of Highly Effective People audio summary'
    },
    {
        id: 15,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[4].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'Habits Of Highly Effective People full book'
    },

    {
        id: 16,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[5].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'The Habits Blueprint summary'
    },
    {
        id: 17,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[5].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'The Habits Blueprint audio summary'
    },
    {
        id: 18,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[5].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'The Habits Blueprint full book'
    },

    {
        id: 19,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[6].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[0].name
                }
            />
        ),
        name: 'You Are Not Your Brain summary'
    },
    {
        id: 20,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[6].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[1].name
                }
            />
        ),
        name: 'You Are Not Your Brain audio summary'
    },
    {
        id: 21,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[6].name +
                    '/' +
                    sideBar[sideBar.length - 1].tabs[0].sub[2].name
                }
            />
        ),
        name: 'You Are Not Your Brain full book'
    }
];
