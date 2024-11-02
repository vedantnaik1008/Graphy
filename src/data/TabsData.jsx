import Books from '../components/Books/Books';
import { sideBar } from './data';


export const TabsComponents = [
    {
        id: 1,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[0].name + '/' + 'full book'
                }
            />
        ),
        name: 'Atomic Habits full book'
    },
    {
        id: 2,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[0].name + '/' + 'summary'
                }
            />
        ),
        name: 'Atomic Habits summary'
    },
    {
        id: 3,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[0].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'Atomic Habits audio summary'
    },
    {
        id: 4,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[1].name + '/' + 'full book'
                }
            />
        ),
        name: 'Better Than Before full book'
    },
    {
        id: 5,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[1].name + '/' + 'summary'
                }
            />
        ),
        name: 'Better Than Before summary'
    },
    {
        id: 6,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[1].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'Better Than Before audio summary'
    },
    {
        id: 7,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[2].name + '/' + 'full book'
                }
            />
        ),
        name: 'Tiny Habits full book'
    },
    {
        id: 8,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[2].name + '/' + 'summary'
                }
            />
        ),
        name: 'Tiny Habits summary'
    },
    {
        id: 9,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[2].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'Tiny Habits audio summary'
    },
    {
        id: 10,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[3].name + '/' + 'full book'
                }
            />
        ),
        name: 'Will Power full book'
    },
    {
        id: 11,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[3].name + '/' + 'summary'
                }
            />
        ),
        name: 'Will Power summary'
    },
    {
        id: 12,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[3].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'Will Power audio summary'
    },
    {
        id: 13,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[4].name + '/' + 'full book'
                }
            />
        ),
        name: 'Habits Of Highly Effective People full book'
    },
    {
        id: 14,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[4].name + '/' + 'summary'
                }
            />
        ),
        name: 'Habits Of Highly Effective People summary'
    },
    {
        id: 15,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[4].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'Habits Of Highly Effective People audio summary'
    },
    {
        id: 16,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[5].name + '/' + 'full book'
                }
            />
        ),
        name: 'The Habits Blueprint full book'
    },
    {
        id: 17,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[5].name + '/' + 'summary'
                }
            />
        ),
        name: 'The Habits Blueprint summary'
    },
    {
        id: 18,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[5].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'The Habits Blueprint audio summary'
    },
    {
        id: 19,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[6].name + '/' + 'full book'
                }
            />
        ),
        name: 'You Are Not Your Brain full book'
    },
    {
        id: 20,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[6].name + '/' + 'summary'
                }
            />
        ),
        name: 'You Are Not Your Brain summary'
    },
    {
        id: 21,
        element: (
            <Books
                bookUrl={
                    sideBar[sideBar.length - 1].tabs[6].name +
                    '/' +
                    'audio summary'
                }
            />
        ),
        name: 'You Are Not Your Brain audio summary'
    },
];