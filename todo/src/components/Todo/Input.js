function InputTodo({ handleTodos }) {
    return (
        <div className="flex justify-center">
            <div className="flex gap-10 items-center">
                <div>
                    <input
                        id="todo"
                        type="text"
                        placeholder="What needs to be done?"
                        className="text-xl pr-52 py-5 rounded-md outline-none italic"
                    />
                </div>
                <div>
                    <button
                        className="py-2 px-5 border-2 bg-pink text-white rounded-md duration-200 active:scale-95"
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
