function InputTodo({ handleTodos, saveTodos }) {
    return (
        <div className="flex justify-center">
            <div className="flex md:gap-10 gap-3 items-center">
                <div className="w-8/12 md:w-10/12">
                    <input
                        id="todo"
                        type="text"
                        placeholder="What needs to be done?"
                        className="md:text-xl bg-text text-sm md:pr-52 md:py-5 p-3 rounded-md outline-none italic dark:bg-darkSubCard  dark:border-none w-full"
                    />
                </div>
                <div className="w-4/12 md:w-2/12 flex gap-3 ">
                    <button
                        className="py-3 md:px-5 px-3 border-2 bg-pink text-white rounded-md duration-500 hover:opacity-60 active:scale-110 dark:bg-darkLightBlack dark:text-pink border-none "
                        onClick={() => handleTodos()}
                    >
                        Add
                    </button>
                    <button
                        className="py-3 md:px-5 px-3 border-2 bg-pink text-white rounded-md duration-500 hover:opacity-60 active:scale-110 dark:bg-darkLightBlack dark:text-pink border-none "
                        onClick={saveTodos}
                    >
                        <i class="fa-solid fa-floppy-disk"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default InputTodo;
