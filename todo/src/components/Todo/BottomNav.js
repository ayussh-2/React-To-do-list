function BottomNav({ itemsLeft }) {
    return (
        <div className="flex justify-between items-center text-lg">
            <div className="">
                {itemsLeft ? (
                    <span className="italic">{itemsLeft} items left</span>
                ) : (
                    <>
                        <span className="italic">No new task!</span>
                        <span className="text-2xl">🤓</span>
                    </>
                )}
            </div>
            <div className="flex gap-10 ">
                <button className="px-3 py-1 border-2 border-pink rounded-md duration-500  active:scale-95">
                    All
                </button>
                <button className="hover:activeBtn duration-100">Active</button>
                <button className="hover:activeBtn duration-100">
                    Completed
                </button>
            </div>
            <div>
                <button className="hover:activeBtn duration-100">
                    Clear Completed
                </button>
            </div>
        </div>
    );
}

export default BottomNav;
