import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

export const boardService = {
    query,
    getById,
    save,
    remove,
    addBoardMsg,
    _getEmptyBoard,
    _getEmptyGroup,
    _getEmptyTask,
    _getEmptyActivity
}

window.cs = boardService // for console usage

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('board', filterBy)
}

function getById(boardId) {
    return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}
async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)
    } else {
        savedBoard = await httpService.post('board', board)
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

function _getEmptyBoard(title = '', imgUrl = '') {
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

function _getEmptyGroup(title) {
    return {
        id: utilService.makeId(),
        title,
        archivedAt: null,
        tasks: [],
        style: {},
    }
}

function _getEmptyTask(title) {
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

function _getEmptyActivity(activity, task = {}, group = {}) {
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
