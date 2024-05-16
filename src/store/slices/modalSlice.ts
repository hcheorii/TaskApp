import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";
type TModalState = {
    boardId: string;
    listId: string;
    task: ITask;
};
type TSetModalDataAction = {
    boardId: string;
    listId: string;
    task: ITask;
};
const initialState: TModalState = {
    boardId: "board-0",
    listId: "list-0",

    task: {
        taskId: "task-0",
        taskName: "task 0",
        taskDescription: "task description",
        taskOwner: "lee",
    },
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalData: (
            // 모달을 띄우는 액션
            state,
            { payload }: PayloadAction<TSetModalDataAction>
        ) => {
            state.boardId = payload.boardId;
            state.listId = payload.listId;
            state.task = payload.task;
        },
    },
});
export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
