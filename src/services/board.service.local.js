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

function getEmptyBoard(title = '', imgUrl = '', bgColor = '') {
  return {
    id: utilService.makeId(),
    title,
    imgUrl,
    isStarred: false,
    archivedAt: Date.now,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundImage: '',
    },
    labels: _labelOptions(),
    members: _membersOptions(),
    cover: coverOptions(),
    groups:[],
    activities:[]
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
    attachments: [],
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

const board = {
  _id: 'b101',
  title: 'Robot dev proj',
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
    backgroundImage: '',
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
          memberIds: ['u101'],
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
            imgUrl: 'https://wallpaperaccess.com/full/1131217.jpg',
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
      title: 'Documentation',
      tasks: [
        {
          id: 'c115',
          title: 'Write API documentation',
          description:
            'Document all the API endpoints with their respective request and response formats',
          labels: ['l107', 'l106'],
          watching: true,
          cover: { color: '#264653', imgUrl: '', isFull: false },
          comments: [],
          checklists: [],
          dueDate: 1675040918000,
        },
        {
          id: 'c116',
          title: 'Create User Guide',
          description: 'Prepare a comprehensive user guide for the application',
          labels: ['l108', 'l105'],
          watching: false,
          comments: [],
          checklists: [],
          dueDate: Date.now(),
        },
        {
          id: 'c117',
          title: 'Update Release Notes',
          description:
            'Compile release notes for the latest version of the software',
          labels: ['l103', 'l109'],
          watching: true,
          cover: { color: '#2a9d8f', imgUrl: '', isFull: false },
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
      createdAt: 154514,
      byMember: {
        _id: 'u101',
        fullname: 'Guest',
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
    'CheckList',
    'DatePicker',
    'AttachmentPicker',
    'CoverPicker',
    'CustomFieldsPicker',
  ],
}

// ; (async () => {
//   await storageService.post(STORAGE_KEY, board)
//   await storageService.post(STORAGE_KEY, board2)
// })()

const board2 = {
  _id: 'b102',
  title: 'Alon,shay,guy',
  imgUrl:
    'https://images.unsplash.com/photo-1660162129606-c12ece87e967?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
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
      createdAt: 154514,
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

// ; (async () => {
//   await storageService.post(STORAGE_KEY, board)
//   await storageService.post(STORAGE_KEY, board2)
// })()

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
          emoji:'❄️'
      },
      {
        id: 'g102',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg',
          emoji:'🌊'
      },
      {
        id: 'g103',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/crystal.svg',
          emoji:'🔮'
      },
      {
        id: 'g104',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg',
          emoji:'🌈'
      },
      {
        id: 'g106',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/peach.svg',
          emoji:'🍑'
      },
      {
        id: 'g107',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/flower.svg',
          emoji:'🌸'
      },
      {
        id: 'g108',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/earth.svg',
          emoji:'🌍'
      },
      {
        id: 'g109',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/alien.svg',
          emoji:'👽'
      },
      {
        id: 'g110',
        color:
          'https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/volcano.svg',
          emoji:'🌋'
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
