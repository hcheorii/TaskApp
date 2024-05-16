import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { useState } from "react";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import {
    addSection,
    container,
    title,
    addButton,
    boardItem,
    boardItemActive,
} from "./BoardList.css";
import clsx from "clsx";
type TBoardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
    //이 함수가 상태를 변경하는데 사용되는 특정 타입을 나타내기 위한 것.
    //React.Dispatch는 일종의 dispatch 함수로서, 리액트 상태관리에서 상태를 변경할 때 사용된다.
};

const BoardList: FC<TBoardListProps> = ({
    activeBoardId,
    setActiveBoardId,
}) => {
    const { boardArray } = useTypedSelector((state) => state.boards);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const handleClick = () => {
        setIsFormOpen(!isFormOpen);
    };
    return (
        <div className={container}>
            <div className={title}>게시판 :</div>
            {boardArray.map(
                (
                    board,
                    index //중괄호를 쓰면 return을 해줘야 하지만 소괄호를 쓰면 필요없다.
                ) => (
                    <div
                        key={board.boardId}
                        className={clsx(
                            {
                                //아래 조건에 맞는다면 이 클래스이름을 사용
                                [boardItemActive]:
                                    boardArray.findIndex(
                                        (b) => b.boardId === activeBoardId
                                    ) === index,
                            },
                            {
                                //아래 조건에 맞는다면 이 클래스이름을 사용
                                [boardItem]:
                                    boardArray.findIndex(
                                        (b) => b.boardId === activeBoardId
                                    ) !== index,
                            }
                        )}
                        onClick={() =>
                            setActiveBoardId(boardArray[index].boardId)
                        }
                    >
                        <div>{board.boardName}</div>
                    </div>
                )
            )}
            <div className={addSection}>
                {isFormOpen ? (
                    <SideForm setIsFormOpen={setIsFormOpen} />
                ) : (
                    <FiPlusCircle className={addButton} onClick={handleClick} />
                )}
            </div>
        </div>
    );
};

export default BoardList;
