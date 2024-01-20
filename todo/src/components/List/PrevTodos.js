function PrevTodos({ children, id, handleSelectDay, selected }) {
    return (
        <>
            {/* <div className="rounded-md activeDate py-3 px-5 hover:scale-105 duration-200 active:scale-100 cursor-pointer">
                <div className="font-date">20 January 2024, Saturday</div>
            </div> */}
            <div
                className={`${
                    selected ? "activeDate" : "bg-text"
                } rounded-md py-3 px-5 hover:scale-105 duration-200 active:scale-100 cursor-pointer`}
                id={id}
                onClick={handleSelectDay}
            >
                <div className="font-date">{children}</div>
            </div>
        </>
    );
}

export default PrevTodos;
