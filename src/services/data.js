groups: [
    {
        id: 'g104',
        title: 'Responsive Design: Make the website responsive',
        tasks: [
            {
                id: 'c107',
                title: 'Design homepage',
                description: 'Create the design layout for the homepage',
                labels: ['l103', 'l104'],
                watching: false,
                cover: { color: '#d62828', imgUrl: '', isFull: false },
                comments: [
                    {
                        id: 'C1',
                        txt: 'Great job on the initial design! @JohnDoe Could you also take a look and provide your feedback?',
                        createdAt: 1674927618000,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Alice Smith',
                            imgUrl: 'http://example.com/alice.jpg',
                        },
                    },
                    {
                        id: 'C2',
                        txt: '@AliceSmith Sure! I will review it tomorrow.',
                        createdAt: 1674968218000,
                        byMember: {
                            _id: 'u101',
                            fullname: 'John Doe',
                            imgUrl: 'http://example.com/john.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL1',
                        title: 'Design Checklist',
                        todos: [
                            {
                                id: 'T1',
                                title: 'Create wireframes',
                                isDone: false,
                            },
                            {
                                id: 'T2',
                                title: 'Choose color scheme',
                                isDone: true,
                            },
                            {
                                id: 'T3',
                                title: 'Select fonts',
                                isDone: true,
                            },
                            {
                                id: 'T4',
                                title: 'Finalize layout',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#26de81',
                },
            },
            {
                id: 'c109',
                title: 'Implement responsive design',
                description: 'Make the website compatible with various devices',
                labels: ['l104', 'l105'],
                watching: false,
                comments: [],
                checklists: [
                    {
                        id: 'CL6',
                        title: 'Responsive Design Checklist',
                        todos: [
                            {
                                id: 'T19',
                                title: 'Test on mobile devices',
                                isDone: false,
                            },
                            {
                                id: 'T20',
                                title: 'Apply media queries',
                                isDone: false,
                            },
                            {
                                id: 'T21',
                                title: 'Adjust layout for different screen sizes',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#90be6d',
                },
            },
            {
                id: 'c118',
                title: 'Optimize typography for mobile',
                description: 'Adjust font sizes and spacing for better readability on small screens',
                labels: ['l104', 'l109'],
                watching: true,
                comments: [
                    {
                        id: 'C5',
                        txt: 'I have some suggestions for the font sizes. @ResponsiveTeam',
                        createdAt: 1675098918000,
                        byMember: {
                            _id: 'u103',
                            fullname: 'Emma Johnson',
                            imgUrl: 'http://example.com/emma.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL8',
                        title: 'Typography Optimization Checklist',
                        todos: [
                            {
                                id: 'T26',
                                title: 'Analyze font size readability on mobile',
                                isDone: false,
                            },
                            {
                                id: 'T27',
                                title: 'Adjust line-height and letter-spacing',
                                isDone: false,
                            },
                            {
                                id: 'T28',
                                title: 'Test font legibility on various devices',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#f15bb5',
                },
            },
            {
                id: 'c121',
                title: 'Enhance image responsiveness',
                description: 'Optimize images and use responsive image techniques',
                labels: ['l104', 'l106'],
                watching: true,
                comments: [
                    {
                        id: 'C6',
                        txt: 'We should also consider using webP format for better image compression. @ResponsiveTeam',
                        createdAt: 1675117318000,
                        byMember: {
                            _id: 'u103',
                            fullname: 'Emma Johnson',
                            imgUrl: 'http://example.com/emma.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL9',
                        title: 'Image Optimization Checklist',
                        todos: [
                            {
                                id: 'T29',
                                title: 'Compress images for faster loading',
                                isDone: false,
                            },
                            {
                                id: 'T30',
                                title: 'Implement lazy loading for images',
                                isDone: false,
                            },
                            {
                                id: 'T31',
                                title: 'Use responsive image tags',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#fdae61',
                },
            },
        ],
        style: {},
    },

    {
        id: 'g201',
        title: 'Cross-Browser and Device Testing: Perform thorough testing',
        tasks: [
            {
                id: 'c203',
                title: 'Test website on major browsers',
                description: 'Perform testing on Chrome, Firefox, Safari, and Edge browsers',
                labels: ['l207', 'l210'],
                watching: false,
                cover: { color: '#d62828', imgUrl: 'https://example.com/testing-chrome.png', isFull: true },
                comments: [
                    {
                        id: 'C11',
                        txt: 'Testing completed on Chrome. @QAteam',
                        createdAt: 1675127618000,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Alice Smith',
                            imgUrl: 'http://example.com/alice.jpg',
                        },
                    },
                    {
                        id: 'C12',
                        txt: '@AliceSmith Great job! Please proceed with testing on other browsers.',
                        createdAt: 1675168218000,
                        byMember: {
                            _id: 'u101',
                            fullname: 'John Doe',
                            imgUrl: 'http://example.com/john.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL11',
                        title: 'Browser Testing Checklist',
                        todos: [
                            {
                                id: 'T43',
                                title: 'Test website functionality on Chrome',
                                isDone: true,
                            },
                            {
                                id: 'T44',
                                title: 'Verify compatibility on Firefox',
                                isDone: false,
                            },
                            {
                                id: 'T45',
                                title: 'Check rendering on Safari',
                                isDone: false,
                            },
                            {
                                id: 'T46',
                                title: 'Test user experience on Edge',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#26de81',
                },
            },
            {
                id: 'c209',
                title: 'Test website on different devices',
                description: 'Ensure compatibility on various devices - smartphones, tablets, and desktops',
                labels: ['l207', 'l212'],
                watching: false,
                cover: { color: '#4d908e', imgUrl: 'https://example.com/testing-devices.png', isFull: true },
                comments: [
                    {
                        id: 'C13',
                        txt: 'Devices testing in progress. @QAteam',
                        createdAt: 1675188918000,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Alice Smith',
                            imgUrl: 'http://example.com/alice.jpg',
                        },
                    },
                    {
                        id: 'C14',
                        txt: '@AliceSmith Thanks for the update! Let me know if you need any assistance.',
                        createdAt: 1675228218000,
                        byMember: {
                            _id: 'u101',
                            fullname: 'John Doe',
                            imgUrl: 'http://example.com/john.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL12',
                        title: 'Device Testing Checklist',
                        todos: [
                            {
                                id: 'T47',
                                title: 'Test website responsiveness on smartphones',
                                isDone: true,
                            },
                            {
                                id: 'T48',
                                title: 'Verify usability on tablets',
                                isDone: false,
                            },
                            {
                                id: 'T49',
                                title: 'Check layout on various desktop resolutions',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#90be6d',
                },
            },
        ],
        style: {},
    },
    {
        id: 'g301',
        title: 'Optimization and Performance: Improve website performance',
        tasks: [
            {
                id: 'c303',
                title: 'Minimize CSS and JavaScript files',
                description: 'Reduce file sizes to improve loading speed',
                labels: ['l310', 'l307'],
                watching: false,
                cover: { color: '#d62828', imgUrl: 'https://example.com/optimize-css-js.png', isFull: true },
                comments: [
                    {
                        id: 'C21',
                        txt: 'CSS and JS files successfully minimized. @OptimizationTeam',
                        createdAt: 1675247318000,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Alice Smith',
                            imgUrl: 'http://example.com/alice.jpg',
                        },
                    },
                    {
                        id: 'C22',
                        txt: '@AliceSmith Excellent work! Now let\'s focus on caching optimization.',
                        createdAt: 1675268218000,
                        byMember: {
                            _id: 'u101',
                            fullname: 'John Doe',
                            imgUrl: 'http://example.com/john.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL21',
                        title: 'CSS and JavaScript Optimization Checklist',
                        todos: [
                            {
                                id: 'T63',
                                title: 'Minify CSS files',
                                isDone: true,
                            },
                            {
                                id: 'T64',
                                title: 'Compress JavaScript files',
                                isDone: true,
                            },
                            {
                                id: 'T65',
                                title: 'Combine CSS and JS files',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#26de81',
                },
            },
            {
                id: 'c309',
                title: 'Leverage browser caching',
                description: 'Set caching headers to reduce server requests',
                labels: ['l310', 'l307'],
                watching: false,
                cover: { color: '#4d908e', imgUrl: 'https://example.com/leverage-caching.png', isFull: true },
                comments: [
                    {
                        id: 'C23',
                        txt: 'Caching headers applied successfully. @OptimizationTeam',
                        createdAt: 1675288918000,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Alice Smith',
                            imgUrl: 'http://example.com/alice.jpg',
                        },
                    },
                    {
                        id: 'C24',
                        txt: '@AliceSmith Great job! Let\'s also optimize image loading.',
                        createdAt: 1675308218000,
                        byMember: {
                            _id: 'u101',
                            fullname: 'John Doe',
                            imgUrl: 'http://example.com/john.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL22',
                        title: 'Caching Optimization Checklist',
                        todos: [
                            {
                                id: 'T66',
                                title: 'Set caching headers for CSS and JS files',
                                isDone: true,
                            },
                            {
                                id: 'T67',
                                title: 'Enable caching for static assets',
                                isDone: false,
                            },
                            {
                                id: 'T68',
                                title: 'Specify expiration time for cached resources',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#90be6d',
                },
            },
            {
                id: 'c315',
                title: 'Optimize image loading',
                description: 'Compress and lazy load images to reduce page size',
                labels: ['l310', 'l306'],
                watching: true,
                cover: { color: '#f15bb5', imgUrl: 'https://example.com/optimize-images.png', isFull: true },
                comments: [
                    {
                        id: 'C25',
                        txt: 'Image optimization completed. @OptimizationTeam',
                        createdAt: 1675328918000,
                        byMember: {
                            _id: 'u102',
                            fullname: 'Alice Smith',
                            imgUrl: 'http://example.com/alice.jpg',
                        },
                    },
                    {
                        id: 'C26',
                        txt: '@AliceSmith Awesome! Now let\'s focus on code splitting.',
                        createdAt: 1675348218000,
                        byMember: {
                            _id: 'u101',
                            fullname: 'John Doe',
                            imgUrl: 'http://example.com/john.jpg',
                        },
                    },
                ],
                checklists: [
                    {
                        id: 'CL23',
                        title: 'Image Loading Optimization Checklist',
                        todos: [
                            {
                                id: 'T69',
                                title: 'Compress images for faster loading',
                                isDone: true,
                            },
                            {
                                id: 'T70',
                                title: 'Implement lazy loading for images',
                                isDone: true,
                            },
                            {
                                id: 'T71',
                                title: 'Optimize image formats (e.g., WebP)',
                                isDone: false,
                            },
                        ],
                    },
                ],
                style: {
                    bgColor: '#fdae61',
                },
            },
        ],
        style: {},
    },
]
