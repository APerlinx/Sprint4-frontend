import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
}
window.cs = boardService

async function query(filterBy = { txt: '', price: 0 }) {
  var boards = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    boards = boards.filter(
      (board) => regex.test(board.title) || regex.test(board.description)
    )
  }
  if (filterBy.price) {
    boards = boards.filter((board) => board.price <= filterBy.price)
  }
  return boards
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board)
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser()
    savedBoard = await storageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId)
  if (!board.msgs) board.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function getEmptyBoard(title = '', imgUrl = '') {
  return {
    id: utilService.makeId(),
    title,
    imgUrl,
    bgColor: '',
    isStarred: false,
    archivedAt: Date.now,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: '',
    },
    style: {
      backgroundImage: '',
    },
    labels: _labelOptions(),
    members: _membersOptions(),
    cover: coverOptions(),
    backGround: backgroundOptions(),
    groups: [],
    activities: [],
  }
}
function getEmptyGroup(title) {
  return {
    id: utilService.makeId(),
    title,
    archivedAt: null,
    tasks: [],
    style: {},
  }
}

function getEmptyTask(title) {
  return {
    id: utilService.makeId(),
    title,
    status: '',
    description: '',
    comments: [],
    checklists: [],
    labelIds: [],
    labels: [],
    attachment: [],
    watching: false,
    createdAt: Date.now(),
    dueDate: '',
    byMember: {
      id: 'm102',
      username: 'Guest',
      fullname: '',
      imgUrl: '',
      createdAt: '2023-07-29',
    },
    members: [],
    style: {
      bgColor: '',
      bgImgUrl: '',
    },
  }
}

function getEmptyActivity(activity, task = {}, group = {}) {
  return {
    id: utilService.makeId(),
    txt: activity,
    createdAt: Date.now(),
    task: {
      id: task.id || '',
      title: task.title || '',
    },
    group: {
      id: group.id || '',
      title: group.title || '',
    },
    byMember: {
      _id: 'g100',
      fullname: 'Guest',
      imgUrl: '',
    },
  }
}


// BOARDS

const board1 = {
  _id: 'b103',
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
    {
      id: 'g101',
      title: 'Requirement Gathering',
      tasks: [
        {
          id: 'c107',
          title: 'Identify Project Scope',
          description: 'Analyze client requirements and define the scope of the website project.',
          labels: ['l103', 'l104'],
          watching: false,
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
              title: 'Requirement Gathering Checklist',
              todos: [
                {
                  id: 'T1',
                  title: 'Conduct client interviews',
                  isDone: false,
                },
                {
                  id: 'T2',
                  title: 'Analyze competitor websites',
                  isDone: true,
                },
                {
                  id: 'T3',
                  title: 'Identify target audience',
                  isDone: true,
                },
                {
                  id: 'T4',
                  title: 'Create user personas',
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
          id: 'c103',
          title: 'Document Functional Requirements',
          archivedAt: 1589983468418,
          description: 'Document the functional requirements based on the gathered information.',
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
          labels: ['l109'],
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
          id: 'c132s',
          title: 'Create requirement',
          description: 'Evaluate the feasibility of the website development project.',
          labels: ['l102', 'l103'],
          watching: true,
          cover: { color: '', imgUrl: '', isFull: false },
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
          id: 'c108',
          title: 'Review and Validate Requirements',
          description: 'Review and validate the documented requirements with the client.',
          labels: [],
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
          labels: [],
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
          labels: ['l102','l103'],
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
          labels: [],
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
          labels: [],
          cover: { color: '#61c7d2', imgUrl: '', isFull: false },
          style: {
            bgColor: '#9c89b8',
          },
        },
      ],
      style: {},
    },
    {
      id: '106',
      title: 'Frontend Development',
      tasks: [
        {
          id: 'c301',
          title: 'Set Up Project Environment',
          description: 'Create the development environment and set up project dependencies.',
          labels: ['l108', 'l102','l103'],
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
          labels: [],
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
          labels: [],
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
          labels: ['l102','l103'],
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

    {
      id: '110',
      title: 'Responsive Design',
      tasks: [
        {
          id: 'c401',
          title: 'Assess Current Design',
          description: 'Evaluate the existing design for responsiveness and identify areas for improvement.',
          labels: ['l102','l103','l110'],
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
          labels: [],
          style: {
            bgColor: '#9c89b8',
          },
        },

        {
          id: 'c403',
          title: 'Tablet Support',
          priority: 'high',
          description: 'Ensure proper support and display for tablet devices.',
          labels: [],
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
          labels: [],
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
    {
      id: '111',
      title: 'HTML Development',
      tasks: [
        {
          id: 'c601',
          title: 'Create HTML Structure',
          description: 'Build the basic HTML structure for the front-end application.',
          labels: ['l114', 'l101','l112'],
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
          labels: [],
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
          labels: [],
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
          labels: ['l102'],
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
          labels: ['l105'],
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
    {
      id: '114',
      title: 'CSS Development',
      tasks: [
        {
          id: 'c701',
          title: 'Create Base Styles',
          description: 'Set up the basic CSS styles and global styles for the front-end application.',
          labels: ['l110', 'l106','l109'],
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
          labels: ['l102', 'l108'],
          style: {
            bgColor: '#9c89b8',
          },
        },
        {
          id: 'c703',
          title: 'Typography',
          priority: 'high',
          description: 'Define and apply typography styles for better readability and aesthetics.',
          labels: ['l103', 'l102'],
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
          labels: [],
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
          labels: ['l108'],
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
    {
      id: '113',
      title: 'JavaScript Development',
      tasks: [
        {
          id: 'c501',
          title: 'Implement Core Functionality',
          description: 'Develop the core functionality and logic of the front-end application using JavaScript.',
          labels: ['l109', 'l104'],
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
          labels: [],
          style: {
            bgColor: '#9c89b8',
          },
        },
        {
          id: 'c503',
          title: 'Form Validation',
          priority: 'high',
          description: 'Implement form validation to ensure data integrity and user input validation.',
          labels: [],
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
          labels: [],
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
          labels: ['l103', 'l104','l101'],
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

const board2 = {
  _id: 'b101',
  title: 'dev',
  imgUrl:
    'https://images.unsplash.com/photo-1661956601031-4cf09efadfce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2376&q=80',
  isStarred: false,
  archivedAt: 1589983468418,
  createdBy: {
    _id: 'u101',
    fullname: 'Abi Abambi',
    imgUrl: 'http://some-img',
  },
  style: {
    backgroundImage:
      'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
  },
  labels: _labelOptions(),
  members: _membersOptions(),
  cover: coverOptions(),
  backGround: backgroundOptions(),
  groups: [
    {
      id: 'g104',
      title: 'Frontend Development',
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
          id: 'c103',
          title: 'Fix bug on boardDetails cmp',
          archivedAt: 1589983468418,
          description: 'Fix bug line on moveTask function',
          labels: ['l110', 'l107'],
          style: {
            bgColor: '#9c89b8',
          },
        },
        {
          id: 'c104',
          title: 'Improve board store',
          priority: 'high',
          description: 'description',
          labels: ['l110', 'l107'],
          comments: [
            {
              id: 'C3',
              txt: 'This task is urgent and needs immediate attention.',
              createdAt: 1674968918000,
              byMember: {
                _id: 'u102',
                fullname: 'Alice Smith',
                imgUrl: 'http://example.com/alice.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'CL2',
              title: 'Help Checklist',
              todos: [
                {
                  id: 'T5',
                  title: 'Analyze the issue',
                  isDone: false,
                },
                {
                  id: 'T6',
                  title: 'Provide possible solutions',
                  isDone: true,
                },
                {
                  id: 'T7',
                  title: 'Implement the fix',
                  isDone: false,
                },
              ],
            },
          ],
          labelIds: [],
          dueDate: Date.now(),
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl: 'http://example.com/tal.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
        {
          id: 'c105',
          title: 'Implement new feature',
          description: 'Add a carousel to the homepage',
          labels: ['l102', 'l103'],
          watching: true,
          comments: [
            {
              id: 'C4',
              txt: 'I can help with this task! @Tal',
              createdAt: 1675030918000,
              byMember: {
                _id: 'u102',
                fullname: 'Alice Smith',
                imgUrl: 'http://example.com/alice.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'CL3',
              title: 'Implementation Checklist',
              todos: [
                {
                  id: 'T8',
                  title: 'Research carousel libraries',
                  isDone: true,
                },
                {
                  id: 'T9',
                  title: 'Design carousel UI',
                  isDone: true,
                },
                {
                  id: 'T10',
                  title: 'Implement carousel functionality',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#4d908e',
          },
        },
        {
          id: 'c106',
          title: 'Update documentation',
          description: 'Update the user manual and API documentation',
          labels: ['l108'],
          watching: false,
          cover: { color: '#277da1', imgUrl: '', isFull: false },
          comments: [],
          checklists: [
            {
              id: 'CL4',
              title: 'Documentation Checklist',
              todos: [
                {
                  id: 'T11',
                  title: 'Review existing documentation',
                  isDone: true,
                },
                {
                  id: 'T12',
                  title: 'Identify outdated content',
                  isDone: false,
                },
                {
                  id: 'T13',
                  title: 'Update user manual',
                  isDone: false,
                },
                {
                  id: 'T14',
                  title: 'Update API documentation',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#277da1',
          },
        },
        {
          id: 'c108',
          title: 'Optimize website performance',
          description: 'Improve loading speed and reduce page size',
          labels: ['l102', 'l106'],
          watching: false,
          comments: [],
          checklists: [
            {
              id: 'CL5',
              title: 'Performance Optimization Checklist',
              todos: [
                {
                  id: 'T15',
                  title: 'Identify performance bottlenecks',
                  isDone: false,
                },
                {
                  id: 'T16',
                  title: 'Optimize images',
                  isDone: true,
                },
                {
                  id: 'T17',
                  title: 'Minify CSS and JavaScript',
                  isDone: true,
                },
                {
                  id: 'T18',
                  title: 'Enable caching',
                  isDone: true,
                },
              ],
            },
          ],
          style: {
            bgColor: '#fb6f92',
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
          id: 'c110',
          title: 'Refactor codebase',
          description: 'Improve code structure and maintainability',
          labels: ['l106', 'l107'],
          watching: false,
          cover: { color: '#f9c74f', imgUrl: '', isFull: false },
          comments: [],
          checklists: [
            {
              id: 'CL7',
              title: 'Code Refactoring Checklist',
              todos: [
                {
                  id: 'T22',
                  title: 'Identify code smells',
                  isDone: false,
                },
                {
                  id: 'T23',
                  title: 'Break down complex functions',
                  isDone: false,
                },
                {
                  id: 'T24',
                  title: 'Remove duplicate code',
                  isDone: false,
                },
                {
                  id: 'T25',
                  title: 'Write unit tests',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#f9c74f',
          },
        },
      ],
      style: {},
    },

    {
      id: 'g101',
      title: 'SPRINT',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'FINISH UI',
          description: 'Replace the logo at the header',
          labels: ['l101', 'l102', 'l103'],
          watching: false,
          cover: { color: '#277da1', imgUrl: '', isFull: false },
          comments: [
            {
              id: 'ZdPnm',
              txt: 'Dead line is soon',
              createdAt: 1590999817436,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'Change cards color to something more subtle',
                  isDone: true,
                },
                {
                  id: '212jX',
                  title: 'Replace the old logo with the new one (svg)',
                  isDone: false,
                },
              ],
            },
          ],
        },
        {
          id: 'c102',
          title: 'Add Samples',
          description: 'Add samples to the data',
          labels: ['l104', 'l105'],
          watching: true,
          cover: {
            color: '',
            imgUrl: '',
            isFull: true,
          },
          comments: [
            {
              id: 'c3',
              txt: "I've added some sample data",
              createdAt: 1590999817450,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
            {
              id: 'c4',
              txt: 'I think we need more sample data',
              createdAt: 1590999817455,
              byMember: {
                _id: 'u103',
                fullname: 'Nir Rozenfeld',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'ch2',
              title: 'Checklist',
              todos: [
                {
                  id: 't3',
                  title: 'Prepare sample data',
                  isDone: true,
                },
                {
                  id: 't4',
                  title: 'Insert sample data',
                  isDone: false,
                },
              ],
            },
          ],
        },
      ],
      style: {},
    },

    {
      id: 'g102',
      title: 'Team tasks',
      tasks: [
        {
          id: 'c103',
          title: 'Add dnd for columns',
          labels: ['l104', 'l109', 'l106', 'l107'],
          archivedAt: 1589983468418,
          description: 'Fix bug line on moveTask function',
        },
        {
          id: 'c104',
          title: 'Review data base structure on atlas',
          priority: 'high',
          description: 'description',
          dueDate: Date.now() + 48 * 60 * 60 * 1000,
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: true,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: [],
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
        {
          id: 'c105',
          title: 'Review code changes',
          description: 'Review pull request #123',
          labels: ['l102', 'l104'],
          watching: true,
          cover: { color: '#3a5a40', imgUrl: '', isFull: false },
          comments: [
            {
              id: 'C5',
              txt: 'I can help with the code review! @Tal',
              createdAt: 1675033918000,
              byMember: {
                _id: 'u102',
                fullname: 'Alice Smith',
                imgUrl: 'http://example.com/alice.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'CL8',
              title: 'Code Review Checklist',
              todos: [
                {
                  id: 'T26',
                  title: 'Check coding style',
                  isDone: true,
                },
                {
                  id: 'T27',
                  title: 'Test code changes',
                  isDone: true,
                },
                {
                  id: 'T28',
                  title: 'Review logic',
                  isDone: true,
                },
              ],
            },
          ],
          style: {
            bgColor: '#3a5a40',
          },
        },
        {
          id: 'c106',
          title: 'Discuss project scope',
          description: 'Hold a meeting to clarify project requirements',
          labels: ['l103', 'l105'],
          watching: false,
          comments: [],
          checklists: [
            {
              id: 'CL9',
              title: 'Meeting Checklist',
              todos: [
                {
                  id: 'T29',
                  title: 'Prepare agenda',
                  isDone: false,
                },
                {
                  id: 'T30',
                  title: 'Invite team members',
                  isDone: false,
                },
                {
                  id: 'T31',
                  title: 'Document meeting minutes',
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
          id: 'c107',
          title: 'Implement new feature',
          description: 'Add user authentication',
          labels: ['l102', 'l104'],
          watching: true,
          comments: [
            {
              id: 'C6',
              txt: 'I can take this task! @Tal',
              createdAt: 1675040918000,
              byMember: {
                _id: 'u102',
                fullname: 'Alice Smith',
                imgUrl: 'http://example.com/alice.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'CL10',
              title: 'Authentication Checklist',
              todos: [
                {
                  id: 'T32',
                  title: 'Design user login form',
                  isDone: false,
                },
                {
                  id: 'T33',
                  title: 'Implement backend authentication',
                  isDone: false,
                },
                {
                  id: 'T34',
                  title: 'Implement frontend authentication',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#4d908e',
          },
        },
        {
          id: 'c108',
          title: 'Create user onboarding tutorial',
          description: 'Prepare a tutorial for new users',
          labels: ['l101', 'l103'],
          watching: false,
          cover: { color: '#277da1', imgUrl: '', isFull: false },
          comments: [],
          checklists: [
            {
              id: 'CL11',
              title: 'Onboarding Tutorial Checklist',
              todos: [
                {
                  id: 'T35',
                  title: 'Outline the tutorial content',
                  isDone: false,
                },
                {
                  id: 'T36',
                  title: 'Create tutorial slides',
                  isDone: false,
                },
                {
                  id: 'T37',
                  title: 'Record video tutorial',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#277da1',
          },
        },
        {
          id: 'c109',
          title: 'Update project documentation',
          description: 'Update README and project documentation',
          labels: ['l105', 'l106'],
          watching: false,
          comments: [],
          checklists: [
            {
              id: 'CL12',
              title: 'Documentation Update Checklist',
              todos: [
                {
                  id: 'T38',
                  title: 'Review existing documentation',
                  isDone: false,
                },
                {
                  id: 'T39',
                  title: 'Identify outdated content',
                  isDone: false,
                },
                {
                  id: 'T40',
                  title: 'Update README file',
                  isDone: false,
                },
                {
                  id: 'T41',
                  title: 'Update project wiki',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#f9c74f',
          },
        },
        {
          id: 'c110',
          title: 'Prepare team meeting',
          description: 'Plan the agenda for the upcoming team meeting',
          labels: ['l101', 'l103'],
          watching: false,
          comments: [],
          checklists: [
            {
              id: 'CL13',
              title: 'Meeting Preparation Checklist',
              todos: [
                {
                  id: 'T42',
                  title: 'Gather input from team members',
                  isDone: false,
                },
                {
                  id: 'T43',
                  title: 'Create meeting agenda',
                  isDone: false,
                },
                {
                  id: 'T44',
                  title: 'Share agenda with team',
                  isDone: false,
                },
              ],
            },
          ],
          style: {
            bgColor: '#26de81',
          },
        },
      ],
      style: {},
    },

    {
      id: 'g108',
      title: 'HTML Markup Development',
      tasks: [
        {
          id: 'c115',
          title: 'Develop HTML Structure',
          description:
            'Create the base HTML structure for the new web application, ensuring all necessary tags and elements are included',
          labels: ['l107', 'l106'],
          watching: true,
          cover: { color: '#264653', imgUrl: '', isFull: false },
          comments: [],
          checklists: [],
          dueDate: 1675040918000,
        },
        {
          id: 'c116',
          title: 'HTML Semantics Implementation',
          description:
            'Implement the use of semantic HTML tags to structure the content appropriately for accessibility and SEO',
          labels: ['l108', 'l105'],
          watching: false,
          comments: [],
          checklists: [],
          dueDate: Date.now(),
        },
        {
          id: 'c117',
          title: 'Optimize HTML Loading Performance',
          description:
            'Refactor the HTML structure to minimize loading times, optimize rendering, and improve the overall performance of the website',
          labels: ['l103', 'l109'],
          watching: true,
          comments: [],
          checklists: [],
          dueDate: Date.now() + 12 * 60 * 60 * 1000,
        },
      ],
      style: {},
    },

    {
      id: 'g107',
      title: 'Deployment',
      tasks: [
        {
          id: 'c113',
          title: 'Configure server',
          description: 'Set up and configure the server for deployment',
          labels: ['l103', 'l104'],
          watching: false,
          cover: {
            color: '',
            imgUrl:
              'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1',
            isFull: true,
          },
          comments: [],
          checklists: [],
          dueDate: Date.now(),
        },
        {
          id: 'c114',
          title: 'Deploy application',
          description:
            'Deploy the latest version of the application to production',
          labels: ['l102', 'l108'],
          watching: true,
          comments: [],
          checklists: [],
          dueDate: 1675040918000,
        },
      ],
      style: {},
    },

    {
      id: 'g106',
      title: 'Testing',
      tasks: [
        {
          id: 'c111',
          title: 'Write unit tests',
          description: 'Write unit tests for all the functional components',
          labels: ['l101', 'l102'],
          watching: true,
          cover: { color: '#f77f00', imgUrl: '', isFull: false },
          comments: [
            // Your comment data
          ],
          checklists: [
            // Your checklist data
          ],
        },
        // Your second task data
      ],
      style: {},
    },

    {
      id: 'g105',
      title: 'Database Management',
      tasks: [
        {
          id: 'c109',
          title: 'Create database schema',
          description: 'Create a database schema for the user and posts tables',
          labels: ['l105', 'l106'],
          watching: false,
          cover: {
            color: '',
            imgUrl:
              'https://i.pinimg.com/originals/18/28/4e/18284ec99d85c9ee5afaf05baf77083a.jpg',
            isFull: true,
          },
          comments: [
            // Your comment data
          ],
          checklists: [
            // Your checklist data
          ],
        },
        // Your second task data
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

const board3 = {
  _id: 'b102',
  title: 'Alon & shay &guy',
  imgUrl:
    'https://images.unsplash.com/photo-1690722763462-2ca402aa163f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
  isStarred: false,
  archivedAt: 1589983468418,
  createdBy: {
    _id: 'u101',
    fullname: 'Alon',
    imgUrl: 'http://some-img',
  },
  style: {
    backgroundImage: '',
  },
  labels: [
    {
      id: 'l101',
      title: 'Done',
      color: '#61bd4f',
    },
    {
      id: 'l102',
      title: 'Progress',
      color: '#61bd33',
    },
  ],
  members: [
    {
      _id: 'u101',
      fullname: 'Tal Tarablus',
      imgUrl: 'https://www.google.com',
    },
  ],
  groups: [
    {
      id: 'g101',
      title: 'Group 1',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'Eat',
        },
        {
          id: 'c102',
          title: 'Sleep',
        },
      ],
      style: {},
    },
    {
      id: 'g102',
      title: 'Group 2',
      tasks: [
        {
          id: 'c103',
          title: 'Do that',
          archivedAt: 1589983468418,
        },
        {
          id: 'c104',
          title: 'Help me',
          status: 'in-progress', // monday
          priority: 'high',
          description: 'description',
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: [],
          dueDate: 1890560000,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
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
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      task: {
        id: 'c101',
        title: 'Replace Logo',
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

const board4 = {
  _id: 'b104',
  title: 'WHAT A BOARD',
  imgUrl:
    'https://images.unsplash.com/photo-1690520941460-414d1d930b34?ixlib=rb-4.0.3&https://images.unsplash.com/photo-1690520941460-414d1d930b34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
  isStarred: false,
  archivedAt: 1589983468418,
  createdBy: {
    _id: 'u101',
    fullname: 'Abi Abambi',
    imgUrl: 'http://some-img',
  },
  style: {
    backgroundImage:
      'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
  },
  labels: _labelOptions(),
  members: _membersOptions(),
  cover: coverOptions(),
  backGround: backgroundOptions(),
}

const board5 = {
  _id: 'b105',
  title: 'BEST BOARD EVER',
  imgUrl:
    'https://images.unsplash.com/photo-1683009427500-71296178737f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3271&q=80',
  isStarred: false,
  archivedAt: 1589983468418,
  createdBy: {
    _id: 'u101',
    fullname: 'Abi Abambi',
    imgUrl: 'http://some-img',
  },
  style: {
    backgroundImage:
      'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
  },
  labels: _labelOptions(),
  members: _membersOptions(),
  cover: coverOptions(),
  backGround: backgroundOptions(),
}

// ; (async () => {
//   await storageService.post(STORAGE_KEY, board1)
//   await storageService.post(STORAGE_KEY, board2)
//   await storageService.post(STORAGE_KEY, board3)
//   await storageService.post(STORAGE_KEY, board4)
//   await storageService.post(STORAGE_KEY, board5)
// })()

// const board6 = {
//   _id: 'b106',
//   title: 'Sunset Serenade',
//   imgUrl: 'https://images.https://images.unsplash.com/photo-1481988535861-271139e06469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80.com/photo-1562176741-262311f2f11b',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board7 = {
//   _id: 'b107',
//   title: 'Mountain Majesty',
//   imgUrl: 'https://images.unsplash.com/photo-1516937125873-5b5b79b94267',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board8 = {
//   _id: 'b108',
//   title: 'Urban Vibes',
//   imgUrl: 'https://images.unsplash.com/photo-1547496543-7dfc0b40a1c5',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board9 = {
//   _id: 'b109',
//   title: 'Morning Bliss',
//   imgUrl: 'https://images.unsplash.com/photo-1507822164213-380c4a097f46',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board10 = {
//   _id: 'b110',
//   title: 'Garden Haven',
//   imgUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board11 = {
//   _id: 'b111',
//   title: 'City Lights',
//   imgUrl: 'https://images.unsplash.com/photo-1507748895383-a9e641220f11',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board12 = {
//   _id: 'b112',
//   title: 'Beach Escape',
//   imgUrl: 'https://images.unsplash.com/photo-1473673235501-4242501d994d',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board13 = {
//   _id: 'b113',
//   title: 'Forest Wanderlust',
//   imgUrl: 'https://images.unsplash.com/photo-1565099977174-b66d1b2d4f71',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board14 = {
//   _id: 'b114',
//   title: 'Aqua Adventure',
//   imgUrl: 'https://images.unsplash.com/photo-1521186351196-0eece9d23a9f',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };

// const board15 = {
//   _id: 'b115',
//   title: 'Cosmic Dreams',
//   imgUrl: 'https://images.unsplash.com/photo-1551627707-629020c8142d',
//   isStarred: false,
//   archivedAt: 1589983468418,
//   createdBy: {
//     _id: 'u101',
//     fullname: 'Abi Abambi',
//     imgUrl: 'http://some-img',
//   },
//   style: {
//     backgroundImage:
//       'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
//   },
//   labels: _labelOptions(),
//   members: _membersOptions(),
//   cover: coverOptions(),
//   backGround: backgroundOptions(),
// };







function coverOptions() {
  return {
    coverColors: [
      '#277da1',
      '#4d908e',
      '#fb6f92',
      '#90be6d',
      '#f9c74f',
      '#f9844a',
      '#00b4d8',
      '#3a5a40',
    ],
    coverImgs: [
      'https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg',
      'https://media.istockphoto.com/photos/the-sun-goes-down-behind-the-autumn-forest-picture-id1162998855?k=20&m=1162998855&s=612x612&w=0&h=JLbCH4hLaO5war1ipJXx7eoxXMdhcMXFO9pwXz1NR1Q=',
      'https://wallpaperaccess.com/full/1131217.jpg',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131603.jpg',
      'https://media.istockphoto.com/photos/hydrangea-flowers-in-the-garden-picture-id927499422?k=20&m=927499422&s=612x612&w=0&h=9fZtBAXZ3I8qNRTi87SHTDEjbBjyn_eRoDoLAC7zVvg=',
      'https://i.pinimg.com/originals/18/28/4e/18284ec99d85c9ee5afaf05baf77083a.jpg',
      'https://media.istockphoto.com/photos/colored-ceiling-picture-id1208301897?k=20&m=1208301897&s=612x612&w=0&h=xXFlsJphxez3hgCYRxYmS7yxb5P4-HOtbnsjIVJSSWA=',
      'https://assets.weforum.org/global_future_council/image/xALg-7b0WN5aLOY6aejbKW3NepG-PEipzKnEuyS8ZlI.jpeg',
      'https://media.cntraveler.com/photos/5ca60f7f7b531a5e47949cde/master/w_4000,h_2400,c_limit/NYC_GettyImages-500619014.jpg',
      'https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
  }
}

function _labelOptions() {
  return [
    {
      id: 'l101',
      color: '#f87562',
      title: 'Urgent',
    },
    {
      id: 'l102',
      color: '#2a9d8f',
      title: 'Important',
    },
    {
      id: 'l103',
      color: '#e9c46a',
      title: 'New',
    },
    {
      id: 'l104',
      color: '#48cae4',
      title: 'Nice to have',
    },
    {
      id: 'l106',
      color: '#adc178',
      title: 'Delayed',
    },
    {
      id: 'l107',
      color: '#9c89b8',
      title: 'In progress',
    },
    {
      id: 'l108',
      color: '#0ead69',
      title: 'Done',
    },
    {
      id: 'l109',
      color: '#16697a',
      title: 'Do not forget',
    },
    {
      id: 'l110',
      color: '#70e000',
      title: 'Bug',
    },
    {
      id: 'l111',
      color: '#00a8e8',
      title: 'Take care today',
    },
  ]
}

function _membersOptions() {
  return [
    {
      id: 'm101',
      username: 'guydahan41',
      fullname: 'Guy Dahan',
      imgUrl:
        'https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192',
      backgroundColor: '#e63946',
    },
    {
      id: 'm102',
      username: 'shayzigdon1',
      fullname: 'Shay Zigdon',
      imgUrl:
        'https://ca.slack-edge.com/T04U05NLZ2M-U04UNLA704D-abc56285845d-72',
      backgroundColor: '#2a9d8f',
    },
    {
      id: 'm103',
      username: 'alonp11',
      fullname: 'Alon Perlin',
      imgUrl:
        'https://ca.slack-edge.com/T04U05NLZ2M-U053T2NRWQL-ec8cffe84642-192',
      backgroundColor: '#e9c46a',
    },
    {
      id: 'm104',
      username: 'dimapolo1',
      fullname: 'Dima Polo',
      imgUrl:
        'https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512',
      backgroundColor: '#48cae4',
    },
    {
      id: 'm105',
      username: 'adambercovich',
      fullname: 'Adam Bercovich',
      imgUrl:
        'https://ca.slack-edge.com/T04U05NLZ2M-U04UB8KDZH6-0fbe87aa89af-72',
      backgroundColor: '#adc178',
    },
    // {
    //   id: "m106",
    //   username: "guydahan41",
    //   fullname: "Guy Dahan",
    //   imgUrl: "https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192",
    //   backgroundColor: "#e63946",
    //   bgColor: "#9c89b8",
    // },
    // {
    //   id: "m107",
    //   username: "guydahan41",
    //   fullname: "Guy Dahan",
    //   imgUrl: "https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192",
    //   backgroundColor: "#e63946",
    //   bgColor: "#00a8e8",
    // },
    // {
    //   id: "m108",
    //   username: "guydahan41",
    //   fullname: "Guy Dahan",
    //   imgUrl: "https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192",
    //   backgroundColor: "#e63946",
    //   bgColor: "#0ead69",
    // },
    // {
    //   id: "m109",
    //   username: "guydahan41",
    //   fullname: "Guy Dahan",
    //   imgUrl: "https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192",
    //   backgroundColor: "#e63946",
    //   bgColor: "#16697a",
    // },
    // {
    //   id: "m110",
    //   username: "guydahan41",
    //   fullname: "Guy Dahan",
    //   imgUrl: "https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192",
    //   backgroundColor: "#e63946",
    //   bgColor: "#70e000",
    // },
  ]
}
function backgroundOptions() {
  return {
    gradients: [
      {
        id: 'g101',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg',
        emoji: '❄️',
      },
      {
        id: 'g102',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
        emoji: '🌊',
      },
      {
        id: 'g103',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/crystal.svg',
        emoji: '🔮',
      },
      {
        id: 'g104',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg',
        emoji: '🌈',
      },
      {
        id: 'g106',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/peach.svg',
        emoji: '🍑',
      },
      {
        id: 'g107',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/flower.svg',
        emoji: '🌸',
      },
      {
        id: 'g108',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/earth.svg',
        emoji: '🌍',
      },
      {
        id: 'g109',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/alien.svg',
        emoji: '👽',
      },
      {
        id: 'g110',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/volcano.svg',
        emoji: '🌋',
      },
    ],
    colors: [
      {
        id: 'c101',
        color: 'rgb(137, 96, 158)',
      },
      {
        id: 'c102',
        color: 'rgb(176, 70, 50)',
      },
      {
        id: 'c103',
        color: 'rgb(81, 152, 57)',
      },
      {
        id: 'c104',
        color: 'rgb(210, 144, 52)',
      },
      {
        id: 'c106',
        color: 'rgb(0, 121, 191)',
      },
      {
        id: 'c107',
        color: 'rgb(131, 140, 145)',
      },
      {
        id: 'c108',
        color: 'rgb(0, 174, 204)',
      },
      {
        id: 'c109',
        color: 'rgb(75, 191, 107)',
      },
      {
        id: 'c110',
        color: 'rgb(205, 90, 145)',
      },
    ],
  }
}
