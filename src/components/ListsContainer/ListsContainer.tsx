import React, { FC } from "react";
import { IList } from "../../types";
import List from "../List/List";
import ActionButton from "../ActionButton/ActionButton";
import { listsContainer } from "./ListsContainer.css";

type TListsContainerProps = {
    boardId: string;
    lists: IList[];
};

//App.tsx에서 lists를 받아서 내려준다.
//App.tsx에서 boardId는 현재 내가 선택한 게시판의 id를 넘겨준다.
const ListsContainer: FC<TListsContainerProps> = ({ lists, boardId }) => {
    return (
        <div className={listsContainer}>
            {lists.map((list) => (
                <List key={list.listId} list={list} boardId={boardId} />
            ))}
            <ActionButton boardId={boardId} listId={""} list />
            {/* 리스트 추가 버튼 */}
        </div>
    );
};

export default ListsContainer;
