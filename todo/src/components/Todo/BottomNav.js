function BottomNav({ itemsLeft, children }) {
    return (
        <div className="md:flex justify-between items-center md:text-lg text-sm font-nav">
            <div className="text-center my-5 md:my-0">
                {itemsLeft ? (
                    <span className="">{itemsLeft} items left</span>
                ) : (
                    <>
                        <span className="">No new task!</span>
                    </>
                )}
            </div>
            <div className="md:flex grid grid-cols-2 grid-rows-2 md:gap-10 gap-4">
                {children}
            </div>
        </div>
    );
}

export default BottomNav;
