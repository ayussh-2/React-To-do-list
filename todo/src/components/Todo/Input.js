function InputTodo({ handleTodos }) {
    return (
        <div className="flex justify-center">
            <div className="flex md:gap-10 gap-3 items-center">
                <div>
                    <input
                        id="todo"
                        type="text"
                        placeholder="What needs to be done?"
                        className="md:text-xl text-sm md:pr-52 md:py-5 p-3 rounded-md outline-none italic"
                    />
                </div>
                <div>
                    <button
                        className="md:py-2 md:px-5 py-1 px-2 border-2 bg-pink text-white rounded-md duration-200 active:scale-95"
                        onClick={() => handleTodos()}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
export default InputTodo;
