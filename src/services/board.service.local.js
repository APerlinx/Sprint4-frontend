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
      "title": "Sprint 4",
      "archivedAt": 1589983468418,
      "tasks": [
        {
          "id": "c101",
          "title": "Replace logo",
          "description": "Replace the logo at the header",
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
            },
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
                  "isDone": true
                },
                {
                  "id": "212jX",
                  "title": "To Do 1",
                  "isDone": false
                },
                {
                  "id": "212jX",
                  "title": "To Do 1",
                  "isDone": false
                }
              ]
            }
          ],
        },
        {
          "id": "c102",
          "title": "Add Samples",
          "description": "Add samples to the data",

        }
      ],
      "style": {}
    },
    {
      "id": "g102",
      "title": "Team tasks",
      "tasks": [
        {
          "id": "c103",
          "title": "Fix bug",
          "archivedAt": 1589983468418,
          "description": "Fix bug line on moveTask function",
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
                  "isDone": true
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

  // ; (async () => {
  //   await storageService.post(STORAGE_KEY, board)
  //   await storageService.post(STORAGE_KEY, board2)
  // })()

  function coverOptions() {
    return {
      coverColors: ["#277da1", "#4d908e", "#fb6f92", "#90be6d", "#f9c74f", "#f9844a", "#00b4d8", "#3a5a40"],
      coverImgs: [
        "https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg",
        "https://media.istockphoto.com/photos/the-sun-goes-down-behind-the-autumn-forest-picture-id1162998855?k=20&m=1162998855&s=612x612&w=0&h=JLbCH4hLaO5war1ipJXx7eoxXMdhcMXFO9pwXz1NR1Q=",
        "https://wallpaperaccess.com/full/1131217.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131603.jpg",
        "https://media.istockphoto.com/photos/hydrangea-flowers-in-the-garden-picture-id927499422?k=20&m=927499422&s=612x612&w=0&h=9fZtBAXZ3I8qNRTi87SHTDEjbBjyn_eRoDoLAC7zVvg=",
        "https://i.pinimg.com/originals/18/28/4e/18284ec99d85c9ee5afaf05baf77083a.jpg",
        "https://media.istockphoto.com/photos/colored-ceiling-picture-id1208301897?k=20&m=1208301897&s=612x612&w=0&h=xXFlsJphxez3hgCYRxYmS7yxb5P4-HOtbnsjIVJSSWA=",
        "https://assets.weforum.org/global_future_council/image/xALg-7b0WN5aLOY6aejbKW3NepG-PEipzKnEuyS8ZlI.jpeg",
        "https://media.cntraveler.com/photos/5ca60f7f7b531a5e47949cde/master/w_4000,h_2400,c_limit/NYC_GettyImages-500619014.jpg",
        "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
    }
  }
  
  function _labelOptions() {
    return [
      {
        id: "l101",
        bgColor: "#e63946",
        txt: "Urgent",
      },
      {
        id: "l102",
        bgColor: "#2a9d8f",
        txt: "Important",
      },
      {
        id: "l103",
        bgColor: "#e9c46a",
        txt: "New",
      },
      {
        id: "l104",
        bgColor: "#48cae4",
        txt: "Nice to have",
      },
      {
        id: "l106",
        bgColor: "#adc178",
        txt: "Delayed",
      },
      {
        id: "l107",
        bgColor: "#9c89b8",
        txt: "In progress",
      },
      {
        id: "l108",
        bgColor: "#0ead69",
        txt: "Done",
      },
      {
        id: "l109",
        bgColor: "#16697a",
        txt: "Do not forget",
      },
      {
        id: "l110",
        bgColor: "#70e000",
        txt: "Bug",
      },
      {
        id: "l111",
        bgColor: "#00a8e8",
        txt: "Take care today",
      },
    ]
  }