import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'

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
    currentBoard: null,
    savedBoard: null,
    currentGroup: null,
    currentTask: null,
  },
  getters: {
    boards({ boards }) {
      return boards
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
      return board ? board.groups : []
    },
    getCurrBoard({ currentBoard }) {

      const board = currentBoard


      return board //check this
    },
    getCurrTask({ currentTask }) {
      return currentTask;
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
      console.log(state.boards);
    },
    setCurrentBoard(state, board) {
      console.log("🚀 ~ file: board.store.js:63 ~ setCurrentBoard ~ board:", board)
      state.currentBoard = board;
      console.log("🚀 ~ file: board.store.js:65 ~ setCurrentBoard ~ state.currentBoard:", state.currentBoard)
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
      const boardIndex = state.boards.findIndex((board) => board._id === boardId)
      if (boardIndex === -1) return
      const newGroups = [...state.boards[boardIndex].groups, group]
      const newBoard = { ...state.boards[boardIndex], groups: newGroups }
      state.boards.splice(boardIndex, 1, newBoard)

      if (state.currentBoard._id === boardId) {
        state.currentBoard = newBoard;
      }
    },
    removeGroup(state, { boardId, groupId }) {
      const boardIndex = state.boards.findIndex((board) => board._id === boardId)
      if (boardIndex === -1) return
      const newGroups = state.boards[boardIndex].groups.filter(group => group.id !== groupId)
      const newBoard = { ...state.boards[boardIndex], groups: newGroups }
      state.boards.splice(boardIndex, 1, newBoard)

      if (state.currentBoard._id === boardId) {
        state.currentBoard = newBoard;
      }
    },
    setCurrTask(state, { task }) {
      state.currentTask = task;
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
      console.log('boardId:', boardId)
      const board = await boardService.getById(boardId);
      console.log('variboardable:', board)
      commit('setCurrentBoard', board);
    },
    async updateBoard(context, { board }) {
      try {
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
        console.log('state.currentBoard', state.currentBoard);
        const groupIndex = state.currentBoard.groups.findIndex(
          (group) => group.id === groupId
        )
        if (groupIndex === -1) throw new Error('Group not found')

        const updatedBoard = {
          ...state.currentBoard,
          groups: state.currentBoard.groups.filter((group) => group.id !== groupId),
        }

        const savedBoard = await boardService.save(updatedBoard)

        commit({ type: 'removeGroup', boardId: savedBoard._id, groupId })
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async addTask({ commit, state }, { groupId, task }) {
      try {
        if (!state.currentBoard) throw new Error('Current board not found')

        const group = state.currentBoard.groups.find(group => group.id === groupId)
        console.log('group', group);
        if (!group) throw new Error('Group not found')

        group.tasks.push(task)

        const savedBoard = await boardService.save(state.currentBoard)
        commit('updateBoard', savedBoard)
      } catch (err) {
        console.error('Error in addTask', err)
        throw err
      }
    },
  },
}
