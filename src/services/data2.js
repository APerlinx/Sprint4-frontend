const board1 = {
    _id: 'b113',
    title: 'Web Development',
    imgUrl:
        'https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
    },
    style: {
        backgroundImage: 'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
    },
    labels: _labelOptions(),
    members: _membersOptions(),
    cover: coverOptions(),
    backGround: backgroundOptions(),

    groups: [
        //requirment
        {
            id: 'g1001',
            title: 'In development',
            tasks: [
                {
                    id: 'c1007',
                    title: 'Responsive design',
                    description: 'Add a responsive design for web and mobile',
                    labels: ['l103', 'l104'],
                    watching: true,
                    cover: { color: '#f87462', imgUrl: '', isFull: false },
                    comments: [
                        {
                            id: 'C1',
                            txt: 'Great job on identifying the project scope! @DesignTeam Could you also take a look and provide your feedback?',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u102',
                                fullname: 'Website Designer',
                                imgUrl: 'http://example.com/designer.jpg',
                            },
                        },
                        {
                            id: 'C2',
                            txt: '@WebsiteDesigner Sure! I will review it tomorrow.',
                            createdAt: 1674968218000,
                            byMember: {
                                _id: 'u101',
                                fullname: 'Project Manager',
                                imgUrl: 'http://example.com/manager.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL1',
                            title: 'Responsive devices',
                            todos: [
                                {
                                    id: 'T101',
                                    title: 'Wide screen',
                                    isDone: false,
                                },
                                {
                                    id: 'T102',
                                    title: 'Regular screen',
                                    isDone: true,
                                },
                                {
                                    id: 'T103',
                                    title: 'Phone',
                                    isDone: true,
                                },
                            ],
                        },
                    ],
                    style: {
                        bgColor: '#26de81',
                    },
                },
                {
                    id: 'c103',
                    title: 'Design a logo',
                    archivedAt: 179983468418,
                    description: 'Design a logo for the app',
                    labels: ['l110', 'l107'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },
                {
                    id: 'c104',
                    title: 'Define Technical Requirements',
                    priority: 'high',
                    description: 'Define the technical requirements and constraints for the website development.',
                    labels: ['l110', 'l107', '105'],
                    watching: false,
                    cover: { color: '#589dff', imgUrl: '', isFull: false },
                    comments: [
                        {
                            id: 'C3',
                            txt: 'These technical requirements are essential and need immediate attention.',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u102',
                                fullname: 'Website Developer',
                                imgUrl: 'http://example.com/developer.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL2',
                            title: 'Technical Requirements Checklist',
                            todos: [
                                {
                                    id: 'T5',
                                    title: 'Select appropriate programming languages',
                                    isDone: false,
                                },
                                {
                                    id: 'T6',
                                    title: 'Identify hosting and server requirements',
                                    isDone: true,
                                },
                                {
                                    id: 'T7',
                                    title: 'Choose database technology',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u101'],
                    labelIds: [],
                    dueDate: Date.now(),
                    byMember: {
                        _id: 'u101',
                        username: 'PM',
                        fullname: 'Project Manager',
                        imgUrl: 'http://example.com/manager.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
                {
                    id: 'c105',
                    title: 'Perform Feasibility Study',
                    description: 'Evaluate the feasibility of the website development project.',
                    labels: ['l102', 'l103'],
                    watching: true,
                    comments: [
                        {
                            id: 'C4',
                            txt: 'I can help with the feasibility study! @PM',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u102',
                                fullname: 'Business Analyst',
                                imgUrl: 'http://example.com/analyst.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL3',
                            title: 'Feasibility Study Checklist',
                            todos: [
                                {
                                    id: 'T8',
                                    title: 'Assess project budget and resources',
                                    isDone: true,
                                },
                                {
                                    id: 'T9',
                                    title: 'Identify potential risks and challenges',
                                    isDone: true,
                                },
                                {
                                    id: 'T10',
                                    title: 'Evaluate project timeline',
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
                    id: 'c106',
                    title: 'Create Requirement Specification Document',
                    description: 'Consolidate all the gathered requirements into a detailed specification document.',
                    labels: ['l104'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },
                {
                    id: 'c108',
                    title: 'Review and Validate Requirements',
                    description: 'Review and validate the documented requirements with the client.',
                    labels: ['l101', 'l102', '103', '104'],
                    cover: { color: '#8591a2', imgUrl: '', isFull: false },
                    checklists: [
                        {
                            id: 'CL4',
                            title: 'Requirements Review Checklist',
                            todos: [
                                {
                                    id: 'T11',
                                    title: 'Schedule meeting with the client',
                                    isDone: false,
                                },
                                {
                                    id: 'T12',
                                    title: 'Present requirements to the client',
                                    isDone: false,
                                },
                                {
                                    id: 'T13',
                                    title: 'Incorporate client feedback',
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
                    title: 'Obtain Client Approval',
                    description: 'Seek client approval on the finalized requirement specification document.',
                    labels: ['l101'],
                    style: {
                        bgColor: '#d62828',
                    },
                },
                {
                    id: 'c110',
                    title: 'Create Requirement Traceability Matrix',
                    description: 'Develop a traceability matrix to link requirements to design and development stages.',
                    labels: ['l103'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },
            ],
            style: {},
        },
        //UX/UI
        {
            id: '105',
            title: 'UX/UI',
            tasks: [
                {
                    id: 'c201',
                    title: 'User Research',
                    description: 'Conduct user research to gather insights and understand user needs.',
                    labels: ['l110', 'l107', 'l105'],
                    watching: false,
                    comments: [
                        {
                            id: 'C5',
                            txt: 'Great start on the user research! @UXDesigner, please collaborate on this and provide your expertise.',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u202',
                                fullname: 'UX Designer',
                                imgUrl: 'http://example.com/uxdesigner.jpg',
                            },
                        },
                        {
                            id: 'C6',
                            txt: '@UXResearcher Sure! I will jump in and assist with the user research.',
                            createdAt: 1674968218000,
                            byMember: {
                                _id: 'u201',
                                fullname: 'UX Researcher',
                                imgUrl: 'http://example.com/uxresearcher.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL5',
                            title: 'User Research Checklist',
                            todos: [
                                {
                                    id: 'T14',
                                    title: 'Create user personas',
                                    isDone: true,
                                },
                                {
                                    id: 'T15',
                                    title: 'Conduct user interviews',
                                    isDone: true,
                                },
                                {
                                    id: 'T16',
                                    title: 'Analyze user feedback',
                                    isDone: true,
                                },
                                {
                                    id: 'T17',
                                    title: 'Identify pain points and needs',
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
                    id: 'c202',
                    title: 'Information Architecture',
                    archivedAt: 1589983468418,
                    description: 'Create a clear and organized information architecture for the user interface.',
                    labels: ['l210', 'l207'],
                    cover: { color: '#faa73d', imgUrl: '', isFull: false },
                    style: {
                        bgColor: '#9c89b8',
                    },
                },

                {
                    id: 'c203',
                    title: 'Wireframing',
                    priority: 'high',
                    description: 'Create wireframes to visualize the layout and structure of the user interface.',
                    labels: ['l112', 'l102', 'l103'],
                    cover: { color: '#d62828', imgUrl: '', isFull: false },
                    comments: [
                        {
                            id: 'C7',
                            txt: 'These wireframes are crucial for the design process. @UXDesigner, could you provide your insights?',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u202',
                                fullname: 'UX Designer',
                                imgUrl: 'http://example.com/uxdesigner.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL6',
                            title: 'Wireframing Checklist',
                            todos: [
                                {
                                    id: 'T18',
                                    title: 'Design low-fidelity wireframes',
                                    isDone: true,
                                },
                                {
                                    id: 'T19',
                                    title: 'Gather feedback from stakeholders',
                                    isDone: true,
                                },
                                {
                                    id: 'T20',
                                    title: 'Refine wireframes based on feedback',
                                    isDone: true,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u201'],
                    labelIds: [],
                    dueDate: Date.now(),
                    byMember: {
                        _id: 'u201',
                        username: 'UXR',
                        fullname: 'UX Researcher',
                        imgUrl: 'http://example.com/uxresearcher.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },

                {
                    id: 'c204',
                    title: 'Visual Design',
                    description: 'Develop the visual design elements and aesthetics for the user interface.',
                    labels: ['l202', 'l203'],
                    watching: true,
                    comments: [
                        {
                            id: 'C8',
                            txt: 'I can contribute to the visual design process. @UXDesigner, let\'s collaborate.',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u202',
                                fullname: 'UX Designer',
                                imgUrl: 'http://example.com/uxdesigner.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL7',
                            title: 'Visual Design Checklist',
                            todos: [
                                {
                                    id: 'T21',
                                    title: 'Create color palettes',
                                    isDone: true,
                                },
                                {
                                    id: 'T22',
                                    title: 'Design typography and iconography',
                                    isDone: true,
                                },
                                {
                                    id: 'T23',
                                    title: 'Develop UI components',
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
                    id: 'c205',
                    title: 'Prototype and Interaction',
                    description: 'Build interactive prototypes to test and validate user interactions.',
                    labels: ['l204', 'l210'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                    cover: {
                        color: '',
                        imgUrl: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
                        isFull: true,
                    },
                },

                {
                    id: 'c206',
                    title: 'Usability Testing',
                    description: 'Conduct usability testing to evaluate the user experience and gather feedback.',
                    labels: ['l112'],
                    cover: { color: '#61c7d2', imgUrl: '', isFull: false },
                    style: {
                        bgColor: '#9c89b8',
                    },
                },
            ],
            style: {},
        },
        //frontend
        {
            id: '106',
            title: 'Frontend Development',
            tasks: [
                {
                    id: 'c301',
                    title: 'Set Up Project Environment',
                    description: 'Create the development environment and set up project dependencies.',
                    labels: ['l108', 'l102', 'l103'],
                    watching: false,
                    cover: { color: '#d62828', imgUrl: '', isFull: false },
                    comments: [
                        {
                            id: 'C9',
                            txt: 'The project environment setup is crucial for smooth development. @FrontendDev, could you handle this task?',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL8',
                            title: 'Project Environment Setup Checklist',
                            todos: [
                                {
                                    id: 'T24',
                                    title: 'Initialize version control system',
                                    isDone: true,
                                },
                                {
                                    id: 'T25',
                                    title: 'Check it',
                                    isDone: true,
                                },
                                {
                                    id: 'T26',
                                    title: 'Reduce amount',
                                    isDone: true,
                                },
                                {
                                    id: 'T25',
                                    title: 'Install necessary development tools',
                                    isDone: true,
                                },
                                {
                                    id: 'T26',
                                    title: 'Configure project settings',
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
                    id: 'c302',
                    title: 'Create Main Layout',
                    archivedAt: 1589983468418,
                    description: 'Build the main layout structure for the front-end application.',
                    labels: ['l310', 'l307'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },

                {
                    id: 'c303',
                    title: 'Implement Navigation',
                    priority: 'high',
                    description: 'Implement navigation components for seamless user experience.',
                    labels: ['l107', 'l108'],
                    comments: [
                        {
                            id: 'C10',
                            txt: 'The navigation is a critical component. @FrontendDev, please handle this task with attention to detail.',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL9',
                            title: 'Navigation Implementation Checklist',
                            todos: [
                                {
                                    id: 'T27',
                                    title: 'Design navigation bar',
                                    isDone: false,
                                },
                                {
                                    id: 'T28',
                                    title: 'Implement responsive navigation',
                                    isDone: true,
                                },
                                {
                                    id: 'T29',
                                    title: 'Add links to main sections',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u301'],
                    labelIds: [],
                    dueDate: '',
                    byMember: {
                        _id: 'u301',
                        username: 'FEDev',
                        fullname: 'Frontend Developer',
                        imgUrl: 'http://example.com/frontenddev.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },

                {
                    id: 'c304',
                    title: 'Build UI Components',
                    description: 'Develop reusable UI components for the front-end application.',
                    labels: ['l302', 'l303'],
                    watching: true,
                    comments: [
                        {
                            id: 'C11',
                            txt: 'I can contribute to the UI component development. @FrontendDev, let\'s work together on this task.',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL10',
                            title: 'UI Component Development Checklist',
                            todos: [
                                {
                                    id: 'T30',
                                    title: 'Design and implement buttons',
                                    isDone: true,
                                },
                                {
                                    id: 'T31',
                                    title: 'Create form elements',
                                    isDone: true,
                                },
                                {
                                    id: 'T32',
                                    title: 'Build modal and popup components',
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
                    id: 'c305',
                    title: 'Implement API Integration',
                    description: 'Integrate with backend APIs to fetch and update data on the front-end.',
                    labels: ['l102', 'l103'],
                    dueDate: Date.now(),
                    style: {
                        bgColor: '#9c89b8',
                    },
                    cover: {
                        color: '',
                        imgUrl: '',
                        isFull: true,
                    },
                },
            ],
            style: {},
        },
        //responsive
        {
            id: '110',
            title: 'Responsive Design',
            tasks: [
                {
                    id: 'c401',
                    title: 'Assess Current Design',
                    description: 'Evaluate the existing design for responsiveness and identify areas for improvement.',
                    labels: ['l102', 'l103', 'l110'],
                    watching: false,
                    cover: { color: '', imgUrl: '', isFull: false },
                    comments: [
                        {
                            id: 'C12',
                            txt: 'Let\'s review the current design and identify opportunities for responsiveness. @FrontendDev, your input is valuable.',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL11',
                            title: 'Responsive Design Assessment Checklist',
                            todos: [
                                {
                                    id: 'T33',
                                    title: 'Check responsiveness on various devices',
                                    isDone: false,
                                },
                                {
                                    id: 'T34',
                                    title: 'Identify design elements that require adjustments',
                                    isDone: true,
                                },
                                {
                                    id: 'T35',
                                    title: 'Review media queries and breakpoints',
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
                    id: 'c402',
                    title: 'Mobile Optimization',
                    archivedAt: 1589983468418,
                    description: 'Optimize the front-end application for a seamless mobile experience.',
                    labels: ['l410', 'l407'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },

                {
                    id: 'c403',
                    title: 'Tablet Support',
                    priority: 'high',
                    description: 'Ensure proper support and display for tablet devices.',
                    labels: ['l410', 'l407'],
                    comments: [
                        {
                            id: 'C13',
                            txt: 'Tablet support is crucial for a broad audience. @FrontendDev, please handle this task with attention to detail.',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL12',
                            title: 'Tablet Support Checklist',
                            todos: [
                                {
                                    id: 'T36',
                                    title: 'Test the application on tablet devices',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u301'],
                    labelIds: [],
                    dueDate: Date.now(),
                    byMember: {
                        _id: 'u301',
                        username: 'FEDev',
                        fullname: 'Frontend Developer',
                        imgUrl: 'http://example.com/frontenddev.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
                {
                    id: 'c404',
                    title: 'Browser Compatibility',
                    description: 'Test and ensure compatibility across different web browsers.',
                    labels: ['l111', 'l101'],
                    watching: true,
                    comments: [
                        {
                            id: 'C14',
                            txt: 'Browser compatibility is critical for a smooth user experience. @FrontendDev, let\'s collaborate on this task.',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL13',
                            title: 'Browser Compatibility Checklist',
                            todos: [
                                {
                                    id: 'T39',
                                    title: 'Test the application on major browsers',
                                    isDone: true,
                                },
                                {
                                    id: 'T40',
                                    title: 'Fix layout and functionality issues',
                                    isDone: true,
                                },
                                {
                                    id: 'T41',
                                    title: 'Verify responsiveness on different browsers',
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
                    id: 'c405',
                    title: 'Performance Optimization',
                    description: 'Optimize front-end performance to ensure faster loading and smoother interactions.',
                    labels: ['l115', 'l105'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                    cover: {
                        color: '',
                        imgUrl: '',
                        isFull: true,
                    },
                },
            ],
            style: {},
        },
        //HTML
        {
            id: '111',
            title: 'HTML Development',
            tasks: [
                {
                    id: 'c601',
                    title: 'Create HTML Structure',
                    description: 'Build the basic HTML structure for the front-end application.',
                    labels: ['l114', 'l101', 'l112'],
                    dueDate: Date.now(),
                    watching: false,
                    labels: ['l111', 'l101'],
                    comments: [
                        {
                            id: 'C18',
                            txt: 'Let\'s start by creating the HTML structure. @FrontendDev, your input is valuable for this task.',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL17',
                            title: 'HTML Structure Checklist',
                            todos: [
                                {
                                    id: 'T51',
                                    title: 'Create the header section',
                                    isDone: false,
                                },
                                {
                                    id: 'T52',
                                    title: 'Build the main content area',
                                    isDone: true,
                                },
                                {
                                    id: 'T53',
                                    title: 'Implement footer section',
                                    isDone: true,
                                },
                                {
                                    id: 'T53',
                                    title: 'Implement main-layout',
                                    isDone: false,
                                },
                                {
                                    id: 'T53',
                                    title: 'Define grid',
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
                    id: 'c602',
                    title: 'Semantic HTML Elements',
                    archivedAt: 1589983468418,
                    description: 'Utilize semantic HTML elements for better accessibility and SEO.',
                    labels: ['l610', 'l607'],
                    cover: { color: '#9f905f', imgUrl: '', isFull: false },
                    style: {
                        bgColor: '#e85151',
                    },
                },
                {
                    id: 'c603',
                    title: 'Forms and Inputs',
                    priority: 'high',
                    description: 'Create forms and implement various input elements for user interactions.',
                    labels: ['l610', 'l607'],
                    comments: [
                        {
                            id: 'C19',
                            txt: 'Forms and inputs are important components. @FrontendDev, please handle this task with attention to detail.',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL18',
                            title: 'Form and Inputs Checklist',
                            todos: [
                                {
                                    id: 'T54',
                                    title: 'Design and create the main contact form',
                                    isDone: false,
                                },
                                {
                                    id: 'T55',
                                    title: 'Implement radio buttons and checkboxes',
                                    isDone: true,
                                },
                                {
                                    id: 'T56',
                                    title: 'Add validation attributes',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u301'],
                    labelIds: [],
                    dueDate: Date.now(),
                    byMember: {
                        _id: 'u301',
                        username: 'FEDev',
                        fullname: 'Frontend Developer',
                        imgUrl: 'http://example.com/frontenddev.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
                {
                    id: 'c604',
                    title: 'Responsive Images',
                    description: 'Implement responsive images for various screen sizes and resolutions.',
                    labels: ['l602', 'l603'],
                    cover: { color: '#9f90ef', imgUrl: '', isFull: false },
                    watching: true,
                    comments: [
                        {
                            id: 'C20',
                            txt: 'Responsive images are important for a better user experience. @FrontendDev, let\'s collaborate on this task.',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL19',
                            title: 'Responsive Images Checklist',
                            todos: [
                                {
                                    id: 'T57',
                                    title: 'Optimize and resize images for different devices',
                                    isDone: true,
                                },
                                {
                                    id: 'T58',
                                    title: 'Implement srcset and sizes attributes',
                                    isDone: true,
                                },
                                {
                                    id: 'T59',
                                    title: 'Test image display on different devices',
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
                    id: 'c605',
                    title: 'HTML Accessibility',
                    description: 'Ensure proper HTML accessibility to make the application usable for everyone.',
                    labels: ['l602'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                    cover: {
                        color: '',
                        imgUrl: '',
                        isFull: true,
                    },
                },
            ],
            style: {},
        },
        // CSS
        {
            id: '114',
            title: 'CSS Development',
            tasks: [
                {
                    id: 'c701',
                    title: 'Create Base Styles',
                    description: 'Set up the basic CSS styles and global styles for the front-end application.',
                    labels: ['l110', 'l106', 'l109'],
                    watching: false,
                    comments: [
                        {
                            id: 'C21',
                            txt: 'Let\'s start by creating the base CSS styles. @FrontendDev, your input is valuable for this task.',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL20',
                            title: 'Base CSS Styles Checklist',
                            todos: [
                                {
                                    id: 'T60',
                                    title: 'Set up global font styles',
                                    isDone: false,
                                },
                                {
                                    id: 'T61',
                                    title: 'Define color palette and variables',
                                    isDone: true,
                                },
                                {
                                    id: 'T62',
                                    title: 'Create base layout styles',
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
                    id: 'c702',
                    title: 'Layout Styling',
                    archivedAt: 1589983468418,
                    description: 'Apply styles to the layout elements and create responsive layouts.',
                    labels: ['l710', 'l707'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },
                {
                    id: 'c703',
                    title: 'Typography',
                    priority: 'high',
                    description: 'Define and apply typography styles for better readability and aesthetics.',
                    labels: ['l03', 'l102'],
                    comments: [
                        {
                            id: 'C22',
                            txt: 'Typography is crucial for a better user experience. @FrontendDev, please handle this task with attention to detail.',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL21',
                            title: 'Typography Checklist',
                            todos: [
                                {
                                    id: 'T63',
                                    title: 'Choose font families for headings and paragraphs',
                                    isDone: false,
                                },
                                {
                                    id: 'T64',
                                    title: 'Set font sizes and line heights',
                                    isDone: true,
                                },
                                {
                                    id: 'T65',
                                    title: 'Define font weights and styles',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u301'],
                    labelIds: [],
                    byMember: {
                        _id: 'u301',
                        username: 'FEDev',
                        fullname: 'Frontend Developer',
                        imgUrl: 'http://example.com/frontenddev.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
                {
                    id: 'c704',
                    title: 'Buttons and Forms',
                    description: 'Style buttons and form elements for better user interactions and aesthetics.',
                    labels: ['l702', 'l703'],
                    watching: true,
                    comments: [
                        {
                            id: 'C23',
                            txt: 'Buttons and forms are important components. @FrontendDev, let\'s collaborate on this task.',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL22',
                            title: 'Buttons and Forms Styling Checklist',
                            todos: [
                                {
                                    id: 'T66',
                                    title: 'Create button styles for primary and secondary actions',
                                    isDone: true,
                                },
                                {
                                    id: 'T67',
                                    title: 'Style form inputs and text areas',
                                    isDone: true,
                                },
                                {
                                    id: 'T68',
                                    title: 'Add hover and focus effects',
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
                    id: 'c705',
                    title: 'Animations and Transitions',
                    description: 'Implement animations and transitions for better user engagement and interactivity.',
                    labels: ['l114'],
                    dueDate: Date.now(),
                    cover: { color: '#e1b304', imgUrl: '', isFull: false },
                    style: {
                        bgColor: '#9c89b8',
                    },
                    cover: {
                        color: '',
                        imgUrl: '',
                        isFull: true,
                    },
                },
            ],
            style: {},
        },
        //javaScript
        {
            id: '113',
            title: 'JavaScript Development',
            tasks: [
                {
                    id: 'c501',
                    title: 'Implement Core Functionality',
                    description: 'Develop the core functionality and logic of the front-end application using JavaScript.',
                    labels: ['l503', 'l504'],
                    watching: false,
                    cover: { color: '#d62828', imgUrl: '', isFull: false },
                    comments: [
                        {
                            id: 'C15',
                            txt: 'The core functionality is a key aspect. @FrontendDev, could you handle this task with attention to detail?',
                            createdAt: 1674927618000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL14',
                            title: 'Core Functionality Implementation Checklist',
                            todos: [
                                {
                                    id: 'T42',
                                    title: 'Create data structures',
                                    isDone: false,
                                },
                                {
                                    id: 'T43',
                                    title: 'Implement event handling',
                                    isDone: true,
                                },
                                {
                                    id: 'T44',
                                    title: 'Test basic functionality',
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
                    id: 'c502',
                    title: 'Data Manipulation',
                    archivedAt: 1589983468418,
                    description: 'Handle data manipulation and interactions with backend APIs using JavaScript.',
                    labels: ['l510', 'l507'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                },
                {
                    id: 'c503',
                    title: 'Form Validation',
                    priority: 'high',
                    description: 'Implement form validation to ensure data integrity and user input validation.',
                    labels: ['l510', 'l507'],
                    comments: [
                        {
                            id: 'C16',
                            txt: 'Form validation is crucial for a seamless user experience. @FrontendDev, please handle this task with attention to detail.',
                            createdAt: 1674968918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL15',
                            title: 'Form Validation Checklist',
                            todos: [
                                {
                                    id: 'T45',
                                    title: 'Validate required fields',
                                    isDone: false,
                                },
                                {
                                    id: 'T46',
                                    title: 'Check input formats (email, phone, etc.)',
                                    isDone: true,
                                },
                                {
                                    id: 'T47',
                                    title: 'Display error messages',
                                    isDone: false,
                                },
                            ],
                        },
                    ],
                    memberIds: ['u301'],
                    labelIds: [],
                    byMember: {
                        _id: 'u301',
                        username: 'FEDev',
                        fullname: 'Frontend Developer',
                        imgUrl: 'http://example.com/frontenddev.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
                {
                    id: 'c504',
                    title: 'Client-Side Data Storage',
                    description: 'Implement client-side data storage using local storage or cookies.',
                    labels: ['l502', 'l503'],
                    watching: true,
                    comments: [
                        {
                            id: 'C17',
                            txt: 'Client-side data storage is essential for a better user experience. @FrontendDev, let\'s collaborate on this task.',
                            createdAt: 1675030918000,
                            byMember: {
                                _id: 'u302',
                                fullname: 'Frontend Developer',
                                imgUrl: 'http://example.com/frontenddev.jpg',
                            },
                        },
                    ],
                    checklists: [
                        {
                            id: 'CL16',
                            title: 'Client-Side Data Storage Checklist',
                            todos: [
                                {
                                    id: 'T48',
                                    title: 'Choose between local storage or cookies',
                                    isDone: true,
                                },
                                {
                                    id: 'T49',
                                    title: 'Implement data saving and retrieval',
                                    isDone: true,
                                },
                                {
                                    id: 'T50',
                                    title: 'Handle data expiration and clearing',
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
                    id: 'c505',
                    title: 'Asynchronous Programming',
                    description: 'Utilize asynchronous JavaScript for smoother user interactions and data fetching.',
                    labels: ['l103', 'l104', 'l101'],
                    style: {
                        bgColor: '#9c89b8',
                    },
                    cover: {
                        color: '',
                        imgUrl: '',
                        isFull: true,
                    },
                },
            ],
            style: {},
        },
    ],

    activities: [
        {
            id: 'a101',
            txt: 'Changed Color',
            createdAt: Date.now(),
            byMember: {
                _id: 'u101',
                fullname: 'Alon Perlin',
                imgUrl:
                    'https://ca.slack-edge.com/T04U05NLZ2M-U053T2NRWQL-ec8cffe84642-192',
            },
            task: {
                id: 'c101',
                title: 'Replace Logo',
            },
        },
        {
            id: 'a102',
            txt: 'Fixed details ui',
            createdAt: Date.now(),
            byMember: {
                _id: 'u101',
                fullname: 'Guy Dahan',
                imgUrl:
                    'https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192',
            },
            task: {
                id: 'c102',
                title: 'Fix button',
            },
        },
    ],

    cmpsOrder: [
        'MemberPicker',
        'LabelsPicker',
        'ChecklistPicker',
        'DatePicker',
        'AttachmentPicker',
        'CoverPicker',
        'CustomFieldsPicker',
    ],
}