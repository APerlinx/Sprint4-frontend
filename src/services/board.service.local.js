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
}
window.cs = boardService


async function query(filterBy = { txt: '', price: 0 }) {
  var boards = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
  }
  if (filterBy.price) {
    boards = boards.filter(board => board.price <= filterBy.price)
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
    txt
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function getEmptyBoard(title = '', imgUrl = 'https://images.unsplash.com/photo-1600691792883-dc29f53f6b17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80') {
  return {
    title,
    imgUrl
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

const board = {
  _id: "b101",
  title: "Robot dev proj",
  imgUrl: "https://images.unsplash.com/photo-1661956601031-4cf09efadfce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2376&q=80",
  isStarred: false,
  archivedAt: 1589983468418,
  createdBy: {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "imgUrl": "http://some-img"
  },
  style: {
    backgroundImage: ""
  },
  labels: [
    {
      "id": "l101",
      "title": "Done",
      "color": "#61bd4f"
    },
    {
      "id": "l102",
      "title": "Progress",
      "color": "#61bd33"
    }
  ],
  members: [
    {
      "_id": "u101",
      "fullname": "Tal Tarablus",
      "imgUrl": "https://www.google.com"
    }
  ],
  groups: [
    {
      "id": "g101",
      "title": "Group 1",
      "archivedAt": 1589983468418,
      "tasks": [
        {
          "id": "c101",
          "title": "Replace logo"
        },
        {
          "id": "c102",
          "title": "Add Samples"
        }
      ],
      "style": {}
    },
    {
      "id": "g102",
      "title": "Group 2",
      "tasks": [
        {
          "id": "c103",
          "title": "Do that",
          "archivedAt": 1589983468418,
        },
        {
          "id": "c104",
          "title": "Help me",
          "status": "in-progress", // monday
          "priority": "high",
          "description": "description",
          "comments": [
            {
              "id": "ZdPnm",
              "txt": "also @yaronb please CR this",
              "createdAt": 1590999817436,
              "byMember": {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
              }
            }
          ],
          "checklists": [
            {
              "id": "YEhmF",
              "title": "Checklist",
              "todos": [
                {
                  "id": "212jX",
                  "title": "To Do 1",
                  "isDone": false
                }
              ]
            }
          ],
          "memberIds": ["u101"],
          "labelIds": ["l101", "l102"],
          "dueDate": 16156215211,
          "byMember": {
            "_id": "u101",
            "username": "Tal",
            "fullname": "Tal Tarablus",
            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
          },
          "style": {
            "bgColor": "#26de81"
          }
        }
      ],
      "style": {}
    }
  ],
  activities: [
    {
      "id": "a101",
      "txt": "Changed Color",
      "createdAt": 154514,
      "byMember": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
      },
      "task": {
        "id": "c101",
        "title": "Replace Logo"
      }
    }
  ],

  cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
}

const board2 = {
  _id: "b102",
  title: "Alon,shay,guy",
  imgUrl: "https://images.unsplash.com/photo-1660162129606-c12ece87e967?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
  isStarred: false,
  archivedAt: 1589983468418,
  createdBy: {
    "_id": "u101",
    "fullname": "Alon",
    "imgUrl": "http://some-img"
  },
  style: {
    backgroundImage: ""
  },
  labels: [
    {
      "id": "l101",
      "title": "Done",
      "color": "#61bd4f"
    },
    {
      "id": "l102",
      "title": "Progress",
      "color": "#61bd33"
    }
  ],
  members: [
    {
      "_id": "u101",
      "fullname": "Tal Tarablus",
      "imgUrl": "https://www.google.com"
    }
  ],
  groups: [
    {
      "id": "g101",
      "title": "Group 1",
      "archivedAt": 1589983468418,
      "tasks": [
        {
          "id": "c101",
          "title": "Eat"
        },
        {
          "id": "c102",
          "title": "Sleep"
        }
      ],
      "style": {}
    },
    {
      "id": "g102",
      "title": "Group 2",
      "tasks": [
        {
          "id": "c103",
          "title": "Do that",
          "archivedAt": 1589983468418,
        },
        {
          "id": "c104",
          "title": "Help me",
          "status": "in-progress", // monday
          "priority": "high",
          "description": "description",
          "comments": [
            {
              "id": "ZdPnm",
              "txt": "also @yaronb please CR this",
              "createdAt": 1590999817436,
              "byMember": {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
              }
            }
          ],
          "checklists": [
            {
              "id": "YEhmF",
              "title": "Checklist",
              "todos": [
                {
                  "id": "212jX",
                  "title": "To Do 1",
                  "isDone": false
                }
              ]
            }
          ],
          "memberIds": ["u101"],
          "labelIds": ["l101", "l102"],
          "dueDate": 16156215211,
          "byMember": {
            "_id": "u101",
            "username": "Tal",
            "fullname": "Tal Tarablus",
            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
          },
          "style": {
            "bgColor": "#26de81"
          }
        }
      ],
      "style": {}
    }
  ],
  activities: [
    {
      "id": "a101",
      "txt": "Changed Color",
      "createdAt": 154514,
      "byMember": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
      },
      "task": {
        "id": "c101",
        "title": "Replace Logo"
      }
    }
  ],

  cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
}

// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, board)
//     await storageService.post(STORAGE_KEY, board2)
// })()