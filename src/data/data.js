import stars from '../assets/AIHeadingIcon.svg';
import Video from '../assets/VideoIcon.svg';
import ProductDevelopementLidecycle from '../assets/TextIcon.svg';
import PDF from '../assets/pdfIcon.svg';
import CompetitiveAnalysis from '../assets/QuizIcon.svg';
import completedIcon from '../assets/CompletedIcon.svg';
import HeadingIcon from '../assets/HeadingIcon.svg';

export const sideBar = [
    {
        title: 'Understanding Product Management',
        headingIcon: HeadingIcon,
        tabs: [
            {
                completedIcon: completedIcon,
                completed: false,
                icon: Video,
                name: 'Importance of Product Management'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: ProductDevelopementLidecycle,
                name: 'Product Development Lifecycle'
            }
        ]
    },
    {
        title: 'Market Research and Analysis',
        headingIcon: HeadingIcon,
        tabs: [
            {
                completedIcon: completedIcon,
                completed: false,
                icon: PDF,
                name: 'Market Identification'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: CompetitiveAnalysis,
                name: 'Competitive Analysis'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Consumer Behavior (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Market Trends (coming soon)'
            }
        ]
    },
    {
        title: 'Product Strategy',
        headingIcon: HeadingIcon,
        tabs: [
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Defining Product Vision (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Setting Product Goals (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Roadmapping (coming soon)'
            }
        ]
    },
    {
        title: 'Product Development and Launch',
        headingIcon: HeadingIcon,
        tabs: [
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Cross-functional Collaboration (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Prototyping and MVP (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Launch Strategies (coming soon)'
            }
        ]
    },
    {
        title: 'Product Lifecycle Management',
        headingIcon: HeadingIcon,
        tabs: [
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Managing Product Performance (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'Iterative Improvement (coming soon)'
            },
            {
                completedIcon: completedIcon,
                completed: false,
                icon: stars,
                name: 'End-of-Life Strategies (coming soon)'
            }
        ]
    }
];
