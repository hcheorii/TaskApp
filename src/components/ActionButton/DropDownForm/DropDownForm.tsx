import React, { FC, useState } from "react";
import { FiX } from "react-icons/fi";
import { ChangeEvent } from "react";
import { useTypedDispatch } from "../../../hooks/redux";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import {
    button,
    buttons,
    close,
    input,
    listForm,
    taskForm,
} from "./DropDownForm.css";

type TDropDownFromProps = {
    boardId: string;
    listId: string;
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    list?: boolean; //있을 수도 있고 없을 수도 있기 떄문에 ?사용
};

const DropDownForm: FC<TDropDownFromProps> = ({
    boardId,
    list,
    listId,
    setIsFormOpen,
}) => {
    //input창의 값을 기억하기 위한 state
    const [text, setText] = useState("");
    const formPlaceholder = list
        ? "리스트의 제목을 입력하세요."
        : "일의 제목을 입력하세요.";

    const dispatch = useTypedDispatch();

    const buttonTitle = list ? "리스트 추가하기" : "일 추가하기";

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleButtonClick = () => {
        if (text) {
            if (list) {
                dispatch(
                    addList({
                        boardId,
                        list: { listId: v4(), listName: text, tasks: [] },
                    })
                );
                dispatch(
                    addLog({
                        logId: v4(),
                        logMessage: `리스트 생성하기 : ${text}`,
                        logAuthor: "User",
                        logTimestamp: String(Date.now()),
                    })
                );
            } else {
                dispatch(
                    addTask({
                        boardId,
                        listId,
                        task: {
                            taskId: v4(),
                            taskName: text,
                            taskDescription: "",
                            taskOwner: "User",
                        },
                    })
                );
                dispatch(
                    addLog({
                        logId: v4(),
                        logMessage: `일 생성하기 : ${text}`,
                        logAuthor: "User",
                        logTimestamp: String(Date.now()),
                    })
                );
            }
        }
    };

    return (
        <div className={list ? listForm : taskForm}>
            <textarea
                className={input}
                value={text}
                onChange={handleTextChange}
                autoFocus
                placeholder={formPlaceholder}
                onBlur={() => setIsFormOpen(false)}
            />
            <div className={buttons}>
                <button className={button} onMouseDown={handleButtonClick}>
                    {buttonTitle}
                </button>
                <FiX className={close} />
            </div>
        </div>
    );
};

export default DropDownForm;
