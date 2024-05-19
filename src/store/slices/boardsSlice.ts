import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
};

type TAddBoardAction = {
    board: IBoard;
};

type TDeleteListAction = {
    boardId: string;
    listId: string;
};

type TAddListAction = {
    boardId: string;
    list: IList;
};

type TAddTaskAction = {
    boardId: string;
    listId: string;
    task: ITask;
};

type TDeleteTaskAction = {
    boardId: string;
    listId: string;
    taskId: string;
};

const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: "board-0",
            boardName: "첫 번째 게시물",
            lists: [
                {
                    listId: "list-0",
                    listName: "List 1",
                    tasks: [
                        {
                            taskId: "task-0",
                            taskName: "Task 1",
                            taskDescription: "Description",
                            taskOwner: "lee",
                        },
                        {
                            taskId: "task-1",
                            taskName: "Task 2",
                            taskDescription: "Description",
                            taskOwner: "lee",
                        },
                    ],
                },
                {
                    listId: "list-1",
                    listName: "List 2",
                    tasks: [
                        {
                            taskId: "task-2",
                            taskName: "Task 3",
                            taskDescription: "Description",
                            taskOwner: "lee",
                        },
                    ],
                },
            ],
        },
    ],
};

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        //여기서 state는 이전 값이다.
        //여기서 "payload"는 액션 객체 안에 있는 중요한 데이터를 가리킵니다.
        //이 데이터는 액션이 어떤 변화를 일으켜야 하는지에 대한 정보를 제공합니다.
        //예를 들어, 사용자가 로그인하는 경우, 액션의 유형은 "LOGIN"일 수 있고,
        //페이로드에는 사용자의 정보 (예: 사용자 이름, 이메일 등)가 포함될 수 있습니다.

        addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board);
            //push는 불변성을 지키지 않는 메소드지만 내부에 immer라는 라이브러리가
            //이미 내장되어 있어서 상관안해도 된다.
        },
        deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map((board) =>
                board.boardId === payload.boardId
                    ? {
                          ...board,
                          lists: board.lists.filter(
                              (list) => list.listId !== payload.listId
                          ),
                      }
                    : board
            );
        },
        setModalActive: (state, { payload }: PayloadAction<boolean>) => {
            state.modalActive = payload;
        },
        addList: (state, { payload }: PayloadAction<TAddListAction>) => {
            state.boardArray.map((board) =>
                board.boardId === payload.boardId
                    ? { ...board, lists: board.lists.push(payload.list) }
                    : board
            );
        },
        addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
            state.boardArray.map((board) =>
                board.boardId === payload.boardId
                    ? {
                          ...board,
                          lists: board.lists.map((list) =>
                              list.listId === payload.listId
                                  ? {
                                        ...list,
                                        tasks: list.tasks.push(payload.task),
                                    }
                                  : list
                          ),
                      }
                    : board
            );
        },
        updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
            //일 수정하기에 대한 리듀서
            state.boardArray = state.boardArray.map((board) =>
                board.boardId === payload.boardId
                    ? {
                          ...board,
                          lists: board.lists.map((list) =>
                              list.listId === payload.listId
                                  ? {
                                        ...list,
                                        tasks: list.tasks.map((task) =>
                                            task.taskId === payload.task.taskId
                                                ? payload.task
                                                : task
                                        ),
                                    }
                                  : list
                          ),
                      }
                    : board
            );
        },

        deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
            //일 삭제하기에 대한 리듀서
            state.boardArray = state.boardArray.map((board) =>
                board.boardId === payload.boardId
                    ? {
                          ...board,
                          lists: board.lists.map((list) =>
                              list.listId === payload.listId
                                  ? {
                                        ...list,
                                        tasks: list.tasks.filter(
                                            (task) =>
                                                task.taskId !== payload.taskId
                                        ),
                                    }
                                  : list
                          ),
                      }
                    : board
            );
        },
    },
});

export const {
    addBoard,
    deleteList,
    setModalActive,
    addList,
    addTask,
    deleteTask,
    updateTask,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
