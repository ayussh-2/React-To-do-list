function InputTodo() {
    return (
        <div className="flex justify-center">
            <div className="flex gap-10">
                <div>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        className="text-xl pr-52 py-5 rounded-md outline-none italic"
                    />
                </div>
                <div>
                    <button className="py-5 px-10 border-2 bg-pink text-white rounded-md duration-200 active:scale-95">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
export default InputTodo;
