import React, { ChangeEvent, FC } from "react";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { sideForm, input, icon } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
type TSideFormProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
    const [inputText, setInputText] = useState(""); //새 게시물 입력창에 대한 state
    const dispatch = useTypedDispatch();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //event객체는 input태그를 통해 들어오기 때문에 ChangeEvent<HTMLInputElement> 이런식으로 설정
        setInputText(e.target.value);
    };
    const handleOnBlur = () => {
        //input에 focus가 사라졌을 때 form을 닫는다.
        setIsFormOpen(false);
    };

    const handleClick = () => {
        if (inputText) {
            dispatch(
                addBoard({
                    board: {
                        boardId: uuidv4(), //boardId는 유일해야하므로 uuid를 사용
                        boardName: inputText, //내가 input에 입력한 내용
                        lists: [], //게시판에 있는 task에 대한 리스트
                    },
                })
            );
            dispatch(
                addLog({
                    //게시판 등록에 대한 로그를 추가하는 액션
                    logId: uuidv4(),
                    logMessage: `게시판 등록 : ${inputText}`,
                    logAuthor: "User",
                    logTimestamp: String(Date.now()),
                })
            );
        }
    };
    return (
        <div className={sideForm}>
            <input
                className={input}
                autoFocus
                type="text"
                placeholder="새로운 게시판 등록하기"
                value={inputText}
                onChange={handleChange}
                onBlur={handleOnBlur} //이 속성은 엘리먼트에서 포커스가 사라졌을 때 호출된다.
            />
            <FiCheck className={icon} onMouseDown={handleClick} />
        </div>
    );
};

export default SideForm;
