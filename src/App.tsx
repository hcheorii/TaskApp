import { appContainer, board, buttons } from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import { useState } from "react";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedSelector } from "./hooks/redux";
function App() {
    //어떤 게시판에 들어와있는지 상태를 담고 있는 것
    const [activeBoardId, setActiveBoardId] = useState("board-0");
    const boards = useTypedSelector((state) => state.boards.boardArray);
    const getActiveBoard = boards.filter(
        (board) => board.boardId === activeBoardId
    )[0]; //내가 선택한 게시판의 리스트들만 필터링

    const lists = getActiveBoard.lists; //리스트들만 ListsContainer로 내려준다
    return (
        <div className={appContainer}>
            <BoardList
                activeBoardId={activeBoardId}
                setActiveBoardId={setActiveBoardId}
            />
            <div className={board}>
                <ListsContainer
                    lists={lists}
                    boardId={getActiveBoard.boardId}
                />
            </div>
            <div className={buttons}>
                <button>이 게시판 삭제하기</button>
                <button></button>
            </div>
        </div>
    );
}

export default App;
