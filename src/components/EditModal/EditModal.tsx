import { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
    deleteTask,
    setModalActive,
    updateTask,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import {
    buttons,
    closeButton,
    deleteButton,
    header,
    input,
    modalWindow,
    title,
    updateButton,
    wrapper,
} from "./EditModal.css";

const EditModal = () => {
    const editingState = useTypedSelector((state) => state.modal);
    const dispatch = useTypedDispatch();
    //우리는 그저 데이터를 표시하는 것이 아니라 변경을 해야하기 때문에 state에 담는다.
    const [data, setData] = useState(editingState);

    const handleCloseButton = () => {
        //modalSlice에서 가져온다.
        dispatch(setModalActive(false));
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            task: {
                ...data.task,
                taskName: e.target.value,
            },
        });
    };

    const handleDescriotionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            task: {
                ...data.task,
                taskDescription: e.target.value,
            },
        });
    };

    const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            task: {
                ...data.task,
                taskOwner: e.target.value,
            },
        });
    };

    const handleUpdate = () => {
        dispatch(
            updateTask({
                boardId: editingState.boardId,
                listId: editingState.listId,
                task: data.task,
            })
        );
        dispatch(
            addLog({
                logId: v4(),
                logMessage: `일 수정하기 ${editingState.task.taskName}`,
                logAuthor: "User",
                logTimestamp: String(Date.now()),
            })
        );
        dispatch(setModalActive(false));
    };

    const handleDelete = () => {
        dispatch(
            deleteTask({
                boardId: editingState.boardId,
                listId: editingState.listId,
                taskId: editingState.task.taskId,
            })
        );

        dispatch(
            addLog({
                logId: v4(),
                logMessage: `일 삭제하기 ${editingState.task.taskName}`,
                logAuthor: "User",
                logTimestamp: String(Date.now()),
            })
        );
        dispatch(setModalActive(false));
    };

    return (
        <div className={wrapper}>
            <div className={modalWindow}>
                <div className={header}>
                    {/* +모양의 아이콘 */}
                    <div className={title}>{editingState.task.taskName}</div>
                    {/* 모달 닫기 버튼 */}
                    <FiX onClick={handleCloseButton} className={closeButton} />
                </div>
                <div className={title}>제목</div>
                <input
                    className={input}
                    type="text"
                    value={data.task.taskName}
                    onChange={handleNameChange}
                />
                <div className={title}>설명</div>
                <input
                    className={input}
                    type="text"
                    value={data.task.taskDescription}
                    onChange={handleDescriotionChange}
                />
                <div className={title}>생성한 사람</div>
                <input
                    className={input}
                    type="text"
                    value={data.task.taskOwner}
                    onChange={handleAuthorChange}
                />
                <div className={buttons}>
                    <button className={updateButton} onClick={handleUpdate}>
                        일 수정하기
                    </button>
                    <button className={deleteButton} onClick={handleDelete}>
                        일 삭제하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
