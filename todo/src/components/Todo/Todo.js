function Todos({ children, timestamp, handleDelete, handleFinish, completed }) {
    function handleCheck(timeStp) {
        handleFinish(timeStp);
    }

    function time(tps) {
        const tp = new Date(parseInt(tps));
        let hrs = tp.getHours() > 12 ? tp.getHours() - 12 : tp.getHours();
        let min =
            tp.getMinutes().toString().length !== 1
                ? tp.getMinutes()
                : `0${tp.getMinutes()}`;
        let mer = tp.getHours() > 12 ? "PM" : "AM";
        let final = `${hrs}:${min}${mer}`;
        return final;
    }

    return (
        <div
            className={`bg-white dark:bg-darkSubCard dark:border-none grid md:gap-3 md:p-5 p-2 items-center justify-between rounded-md duration-300 border-2 md:my-3 my-1 slideDown ${
                completed ? "text-pink line-through border-pink" : ""
            }`}
        >
            <div id="title">
                <h4 className="italic md:text-xl text-sm">{children}</h4>
            </div>
            <div id="timeOfTodo">
                <button className="text-buttonink font-bold font-nav md:text-base text-xs">
                    {time(timestamp)}
                </button>
            </div>
            <div className="flex items-center justify-between ">
                <div id="del">
                    <button
                        className="md:px-3 py-1 px-2 dark:bg-darkLightBlack dark:text-pink bg-pink text-white rounded-md active:scale-95 duration-150 font-normal text-sm md:text-base"
                        onClick={() => handleDelete(timestamp)}
                    >
                        Delete
                    </button>
                </div>
                <div id="complete">
                    <div className="inline-flex items-center">
                        <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="ripple-on"
                            data-ripple-dark="true"
                        >
                            <input
                                id="ripple-on"
                                type="checkbox"
                                checked={completed}
                                onChange={() => handleCheck(timestamp)}
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-pink transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink before:opacity-0 before:transition-opacity checked:border-pink checked:bg-pink checked:before:bg-pink hover:before:opacity-10 duration-500 "
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todos;
