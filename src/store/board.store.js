import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'
import { applyDrag } from '../services/util.service.js'
import { reactive } from 'vue'

export function getActionRemoveBoard(boardId) {
  return {
    type: 'removeBoard',
    boardId,
  }
}
export function getActionAddBoard(board) {
  return {
    type: 'addBoard',
    board,
  }
}
export function getActionUpdateBoard(board) {
  return {
    type: 'updateBoard',
    board,
  }
}
export function getActionAddBoardMsg(boardId) {
  return {
    type: 'addBoardMsg',
    boardId,
    txt: 'Stam txt',
  }
}

export const boardStore = {
  state: {
    boards: [],
    recentBoards: [],
    currentBoard: null,
    savedBoard: null,
    currentGroup: null,
    currentTask: null,
    filterBy: '',
    dropResults: [],

    cmpsOrder: ['MemberPicker', 'LabelsPicker', 'ChecklistPicker', 'DueDatePicker', , 'CoverPicker'],
    // , 'AttachmentsPicker'
  },
  getters: {
    boards({ boards }) {
      return boards
    },
    starredBoards({ boards }) {
      return boards.filter((board) => board.isStarred)
    },
    filteredBoards({ boards, filterBy }) {
      const byName = new RegExp(filterBy, 'i')
      return boards.filter((board) => byName.test(board.title))
    },
    recentBoards({ recentBoards }) {
      return recentBoards
    },
    savedBoard({ savedBoard }) {
      return savedBoard
    },
    getGroupsByBoardId: (state) => (boardId) => {
      const board = state.boards.find((board) => board._id === boardId)
      return board ? board.groups : []
    },
    getCurrenBoard({ currentBoard }) {
      const board = currentBoard
      return board
    },
    getCurrBoard({ currentBoard }) {
      const board = currentBoard
      return board
    },
    getCurrTask({ currentTask }) {
      return currentTask
    },
    cmpsOrder({ cmpsOrder }) {
      return cmpsOrder
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setCurrentBoard(state, board) {
      state.currentBoard = board
    },
    setCurrBoard(state, { currBoard }) {
      if (currBoard === undefined) return
      state.currBoard = currBoard
    },
    addBoard(state, { board }) {
      state.boards.push(board)
      state.savedBoard = board
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex((c) => c._id === board._id)
      state.boards.splice(idx, 1, board)
    },
    removeBoard(state, { boardId }) {
      state.boards = state.boards.filter((board) => board._id !== boardId)
    },
    addGroup(state, { boardId, group }) {
      const boardIndex = state.boards.findIndex(
        (board) => board._id === boardId
      )
      if (boardIndex === -1) return
      const newGroups = [...state.boards[boardIndex].groups, group]
      const newBoard = { ...state.boards[boardIndex], groups: newGroups }
      state.boards.splice(boardIndex, 1, newBoard)

      if (state.currentBoard._id === boardId) {
        state.currentBoard = newBoard
      }
    },
    removeGroup(state, { boardId, groupId }) {
      const boardIndex = state.boards.findIndex(
        (board) => board._id === boardId
      )
      if (boardIndex === -1) return
      const newGroups = state.boards[boardIndex].groups.filter(
        (group) => group.id !== groupId
      )
      const newBoard = { ...state.boards[boardIndex], groups: newGroups }
      state.boards.splice(boardIndex, 1, newBoard)

      if (state.currentBoard._id === boardId) {
        state.currentBoard = newBoard
      }
    },
    setCurrTask(state, { task }) {
      state.currentTask = task
    },
    saveBoardToRecent(state, { board }) {
      if (state.recentBoards.length >= 3) {
        state.recentBoards.splice(0, 1, board)
      } else {
        state.recentBoards.push(board)
      }
    },
    // EDIT or ADD task
    setTask(state, { groupId, task }) {
      if (state.currentGroup) groupId = state.currentGroup._id
      const groupIdx = state.currentBoard.groups.findIndex(
        (group) => group._id === groupId
      )
      if (task._id) {
        const taskIdx = state.currentBoard.groups[groupIdx].tasks.findIndex(
          (currTask) => currTask._id === task._id
        )
        state.currentBoard.groups[groupIdx].tasks.splice(taskIdx, 1, task)
      } else {
        task._id = utilService.makeId()
        state.currentBoard.groups[groupIdx].tasks.push(task)
      }
    },
    removeTask(state, { task }) {
      const taskIdx = state.currentBoard.groups[task.groupIdx].tasks.findIndex(
        (currTask) => currTask._id === task.taskId
      )
      state.currentBoard.groups[task.groupIdx].tasks.splice(taskIdx, 1)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    addTaskToGroup(state, { groupId, task, board }) {
      const group = board.groups.find((group) => group.id === groupId)
      if (!group) throw new Error('Group not found')

      group.tasks = [...group.tasks, task]
    },
    removeTask(state, { group, index }) {
      group.tasks = [
        ...group.tasks.slice(0, index),
        ...group.tasks.slice(index + 1),
      ]
    },
    addTask(state, { group, task, index }) {
      group.tasks.splice(index, 0, task)
    },
    completeTask(state, { groupId, task }) {
      const groupIdx = state.currentBoard.groups.findIndex(group => group.id === groupId);
      const taskIdx = state.currentBoard.groups[groupIdx].tasks.findIndex(t => t.id === task.id);
      state.currentBoard.groups[groupIdx].tasks[taskIdx].status = 'done';
    },
  },
  actions: {
    async addBoard(context, { board }) {
      try {
        board = await boardService.save(board)
        context.commit(getActionAddBoard(board))
        return board
      } catch (err) {
        console.log('boardStore: Error in addBoard', err)
        throw err
      }
    },
    async loadCurrentBoard({ commit }, { boardId }) {
      const board = await boardService.getById(boardId)
      commit('setCurrentBoard', board)
    },
    async updateBoard(context, { board }) {
      try {
        // console.log(board);
        board = await boardService.save(board)
        context.commit(getActionUpdateBoard(board))
        return board
      } catch (err) {
        console.log('boardStore: Error in updateBoard', err)
        throw err
      }
    },
    async loadBoards(context) {
      try {
        const boards = await boardService.query()
        context.commit({ type: 'setBoards', boards })
      } catch (err) {
        console.log('boardStore: Error in loadBoards', err)
        throw err
      }
    },
    async removeBoard(context, { boardId }) {
      try {
        await boardService.remove(boardId)
        context.commit(getActionRemoveBoard(boardId))
      } catch (err) {
        console.log('boardStore: Error in removeBoard', err)
        throw err
      }
    },
    async addBoardMsg(context, { boardId, txt }) {
      try {
        const msg = await boardService.addBoardMsg(boardId, txt)
        context.commit({ type: 'addBoardMsg', boardId, msg })
      } catch (err) {
        console.log('boardStore: Error in addBoardMsg', err)
        throw err
      }
    },
    async addGroup({ commit, state }, { group }) {
      try {
        if (!state.currentBoard) throw new Error('Current board not found')

        const newGroups = [...state.currentBoard.groups, group]

        const updatedBoard = { ...state.currentBoard, groups: newGroups }

        const savedBoard = await boardService.save(updatedBoard)
        commit({ type: 'addGroup', boardId: savedBoard._id, group })
      } catch (err) {
        console.log('boardStore: Error in addGroup', err)
        throw err
      }
    },
    async removeGroup({ commit, state }, { groupId }) {
      try {
        if (!state.currentBoard) throw new Error('Current board not found')

        const groupIndex = state.currentBoard.groups.findIndex(
          (group) => group.id === groupId
        )
        if (groupIndex === -1) throw new Error('Group not found')

        const updatedBoard = {
          ...state.currentBoard,
          groups: state.currentBoard.groups.filter(
            (group) => group.id !== groupId
          ),
        }

        const savedBoard = await boardService.save(updatedBoard)

        commit({ type: 'removeGroup', boardId: savedBoard._id, groupId })
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async addBoardToRecent({ commit, state }, { boardId }) {
      try {
        const isBoardInRecent = state.recentBoards.some(
          (board) => board._id === boardId
        )
        if (isBoardInRecent) return

        const board = await boardService.getById(boardId)
        commit({ type: 'saveBoardToRecent', board })
      } catch (err) {
        console.log(err)
      }
    },
    async setTask({ commit, state, dispatch }, { groupId, task }) {
      try {
        commit({ type: 'setTask', groupId, task })
        dispatch({ type: 'saveBoard', board: state.currentBoard })
      } catch (err) {
        console.log(err)
      }
    },
    async addTask({ commit, state }, { groupId, task, board }) {
      try {
        const newTask = boardService.getEmptyTask(task.title)
        commit('addTaskToGroup', { groupId, task: newTask, board })

        const savedBoard = await boardService.save(state.currentBoard)

        commit('updateBoard', { board: savedBoard })
      } catch (err) {
        console.error('Error in addTask', err)
        throw err
      }
    },
    async saveGroups({ commit, state, dispatch }, { groups, currBoard }) {
      try {
        currBoard = JSON.parse(JSON.stringify(currBoard))
        currBoard.groups = groups
        const savedBoard = await boardService.save(currBoard)
        commit({ type: 'updateBoard', board: savedBoard })
        dispatch({ type: 'loadBoards' })
      } catch (err) {
        console.log('Cannot save group', err)
        throw err
      }
    },
    async saveBoard({ commit, dispatch }, { board }) {
      try {
        const savedBoard = await boardService.save(board)
        commit({ type: 'updateBoard', board: savedBoard })
        dispatch({ type: 'loadBoards' })
      } catch (err) {
        console.log('Cannot save board', err)
        throw err
      }
    },
    completeTask({ commit, dispatch, state }, { groupId, task }) {
      commit('completeTask', { groupId, task });
      dispatch('saveBoard', { board: state.currentBoard });
    },
  },
}
