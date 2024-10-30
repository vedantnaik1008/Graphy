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
        name: 'Atomic Habits video'
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
        name: 'Atomic Habits pdf'
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
        name: 'Better Than Before video'
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
        name: 'Better Than Before pdf'
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
        name: 'Tiny Habits video'
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
        name: 'Tiny Habits pdf'
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
        name: 'Will Power video'
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
        name: 'Will Power pdf'
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
        name: 'Habits Of Highly Effective People video'
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
        name: 'Habits Of Highly Effective People pdf'
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
        name: 'The Habits Blueprint video'
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
        name: 'The Habits Blueprint pdf'
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
        name: 'You Are Not Your Brain video'
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
        name: 'You Are Not Your Brain pdf'
    }
];
