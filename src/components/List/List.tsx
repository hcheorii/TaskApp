import React, { FC } from "react";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { IList, ITask } from "../../types";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { setModalActive } from "../../store/slices/boardsSlice";

type TListProps = {
    //props에 대한 타입 명시
    boardId: string;
    list: IList;
};

const List: FC<TListProps> = ({ list, boardId }) => {
    const dispatch = useTypedDispatch();

    const handleListDelete = (listId: string) => {
        //실질적으로 list를 지우는 액션
        dispatch(deleteList({ boardId, listId }));
        //지웠다는 로그를 남기는 액션
        dispatch(
            addLog({
                logId: v4(),
                logMessage: `리스트 삭제하기 : ${list.listName}`,
                logAuthor: "User",
                logTimestamp: String(Date.now()),
            })
        );
    };

    const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
        //모달을 띄울 떄 필요한 데이터를 보내준다..
        dispatch(setModalData({ boardId, listId, task }));
        dispatch(setModalActive(true));
    };

    return (
        <div>
            <div>
                <div>{list.listName}</div>
                <GrSubtract onClick={() => handleListDelete(list.listId)} />
                {/* - 눌렀을 떄 리스트 삭제 */}
            </div>
            {/* 리스트안에 있는 task들을 map함수로 하나하나 출력한다. */}
            {list.tasks.map((task, index) => (
                <div
                    key={task.taskId}
                    onClick={() => handleTaskChange(boardId, list.listId, task)}
                    //모달 띄우기
                >
                    <Task
                        taskName={task.taskName}
                        taskDescription={task.taskDescription}
                        id={task.taskId}
                        boardId={boardId}
                        index={index}
                    />
                </div>
            ))}
            <ActionButton />
        </div>
    );
};

export default List;
