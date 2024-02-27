function Modal({ toggleRecom, children, saveReccomendation }) {
    return (
        <div>
            <div className="text-end mb-5 cursor-pointer">
                <button onClick={() => toggleRecom()}>
                    <i class="fa-solid fa-xmark text-xl duration-150 active:text-sm hover:text-red-600"></i>
                </button>
            </div>
            <div className="font-nav my-5">
                <h1 className="text-2xl">{children}</h1>
            </div>
            <div className="gap-5">
                <textarea
                    type="text"
                    rows={5}
                    className="md:text-xl bg-text text-sm p-3 rounded-md outline-none italic dark:bg-darkSubCard  dark:border-none w-full resize-none hover:resize"
                    id="userRecom"
                />
                <div className="text-center mt-5">
                    <button
                        className="py-3 md:px-5 px-6 border-2 bg-darkLightBlack text-white rounded-md duration-500 hover:opacity-60 active:scale-110 dark:bg-darkLightBlack dark:text-white border-none"
                        onClick={() => saveReccomendation()}
                    >
                        Send ✉️
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
