function BottomNav() {
    return (
        <div className="flex justify-between text-lg">
            <div className="italic">1 item left</div>
            <div className="flex gap-10">
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
