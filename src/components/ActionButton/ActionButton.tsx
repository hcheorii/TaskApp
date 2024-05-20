import { FC } from "react";
import DropDownForm from "./DropDownForm/DropDownForm";
import { IoIosAdd } from "react-icons/io";
import { useState } from "react";
import { listButton, taskButton } from "./ActionButton.css";
type TActionButtonProps = {
    boardId: string;
    listId: string;
    list?: boolean;
};

const ActionButton: FC<TActionButtonProps> = ({ boardId, listId, list }) => {
    //true일때는 드롭다운이 나오게..
    const [isFormOpen, setIsFormOpen] = useState(false);

    //list프롭이 있다는 것은 Listcontainer에서 왔다는 뜻.
    const buttonText = list ? "새로운 리스트 등록" : "새로운 일 등록";

    return isFormOpen ? (
        <DropDownForm
            setIsFormOpen={setIsFormOpen}
            list={list ? true : false}
            boardId={boardId}
            listId={listId}
        />
    ) : (
        <div
            //리스트가 있다면 ListContainer에서 왔다는 것이므로..
            className={list ? listButton : taskButton}
            onClick={() => setIsFormOpen(true)} //드랍다운 열기
        >
            <IoIosAdd />
            <p>{buttonText}</p>
        </div>
    );
};

export default ActionButton;
