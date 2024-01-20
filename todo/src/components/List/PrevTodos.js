import { useState } from "react";

function PrevTodos({
    children,
    id,
    isSelected,
    handleSelectDay,
    selectedParam,
}) {
    // const [selected, setSelected] = useState(false);
    // function handleClick() {
    //     setSelected(!selected);
    // }
    return (
        <div
            className={`${
                isSelected ? "activeDate" : "bg-text"
            } rounded-md py-3 px-5 hover:scale-105 duration-200 active:scale-100 cursor-pointer`}
            id={id}
            onClick={() => handleSelectDay()}
        >
            <div className="font-date">{children}</div>
        </div>
    );
}

export default PrevTodos;
