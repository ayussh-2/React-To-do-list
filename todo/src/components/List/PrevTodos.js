function PrevTodos({ children, id, isSelected, handleSelectDay }) {
    return (
        <>
            <div
                className={`${
                    isSelected ? "activeDate" : "bg-text"
                } rounded-md md:py-3 md:px-5 py-1 px-2 md:hover:scale-105 duration-200 active:scale-100 cursor-pointer dark:bg-darkSubCard`}
                id={id}
                onClick={() => handleSelectDay()}
            >
                <div className="font-date md:text-base text-xs">{children}</div>
            </div>
        </>
    );
}

export default PrevTodos;
