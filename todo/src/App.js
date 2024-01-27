import { useState, useEffect } from "react";
import "./App.css";
import InputTodo from "./components/Todo/Input";
import BottomNav from "./components/Todo/BottomNav";
import Todos from "./components/Todo/Todo";
import PrevTodos from "./components/List/PrevTodos";
import Btn from "./components/elements/Btn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
function App() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tpToday = today.getTime();

    const [arr, setArr] = useState([]);
    const [finishArr, setFinishArr] = useState([]);
    const [totalItems, setTotalItems] = useState(arr.length);
    const [selectedDay, setSelectedDay] = useState(tpToday);
    const [btn, setBtn] = useState("all");

    const prevTodosTp = [
        1741996800000, 1730505600000, 1720396800000, 1727568000000,
        1733961600000, 1743811200000, 1724198400000, 1748908800000,
        1729123200000, 1739059200000,
    ];
    prevTodosTp.push(tpToday);

    function updateTodos() {
        let task = document.getElementById("todo").value;
        if (task !== "") {
            let timeStamp = new Date().getTime();
            const newTodo = { [timeStamp]: task };
            setArr((prevArr) => [...prevArr, newTodo]);
            setTotalItems(totalItems + 1);
            setRenderAgain(renderAgain);
            document.getElementById("todo").value = "";
        } else {
            // alert("Please enter something!");
            toast("Enter todos 🥲");
        }
    }

    function DeleteTodo(tp) {
        setArr((prevArr) =>
            prevArr.filter((item) => !Object.keys(item).includes(tp.toString()))
        );
        setTotalItems(totalItems - 1);
    }

    function updateNoTodos(param, tp) {
        if (param === "sub") {
            // setTotalItems(totalItems - 1);
            const task = finalArr.find((obj) => tp in obj);
            setFinishArr((prevArr) => [...prevArr, task]);
        } else {
            // setTotalItems(totalItems + 1);
            setFinishArr((prevArr) =>
                prevArr.filter(
                    (item) => !Object.keys(item).includes(tp.toString())
                )
            );
        }
    }

    function navBtns(type) {
        setBtn(type);
    }

    function getDay(tp, type) {
        let date = tp !== null ? new Date(tp) : new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();

        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        let finalDate = `${date.getDate()} ${months[month]} ${year}, ${
            type !== "short" ? daysOfWeek[day] : shortDays[day]
        }`;
        return finalDate;
    }

    function onSelectDay(tp) {
        setSelectedDay(tp);
    }

    function findUniqueElements(arr1, arr2) {
        const uniqueInArray1 = arr1.filter(
            (item1) =>
                !arr2.some(
                    (item2) =>
                        Object.keys(item1)[0] === Object.keys(item2)[0] &&
                        item1[Object.keys(item1)[0]] ===
                            item2[Object.keys(item2)[0]]
                )
        );
        const uniqueInArray2 = arr2.filter(
            (item2) =>
                !arr1.some(
                    (item1) =>
                        Object.keys(item1)[0] === Object.keys(item2)[0] &&
                        item1[Object.keys(item1)[0]] ===
                            item2[Object.keys(item2)[0]]
                )
        );

        return uniqueInArray1.concat(uniqueInArray2);
    }

    let finalArr = arr;
    const [renderAgain, setRenderAgain] = useState(() => returnTodos(finalArr));
    useEffect(() => {
        if (btn === "clr") {
            setBtn("");
            deleteCompleted();
        } else if (btn === "act") {
            finalArr = findUniqueElements(arr, finishArr);
        } else if (btn === "com") {
            finalArr = finishArr;
        } else {
            finalArr = arr;
        }

        const newRenderAgain = returnTodos(finalArr);
        setRenderAgain(newRenderAgain);
    }, [arr, finishArr, btn]);

    function deleteCompleted() {
        finalArr = findUniqueElements(arr, finishArr);
        setArr(finalArr);
        setFinishArr([]);
    }

    function returnTodos(arr) {
        return (
            <div className="flex flex-col-reverse">
                {arr.length > 0 ? (
                    arr.map((item) => (
                        <Todos
                            key={Object.keys(item)[0]}
                            handleDelete={DeleteTodo}
                            timestamp={Object.keys(item)[0]}
                            handleFinish={updateNoTodos}
                        >
                            {Object.values(item)[0]}
                        </Todos>
                    ))
                ) : (
                    <p className="italic text-center md:text-xl text-base my-5 tracking-wider">
                        Add some todos!
                    </p>
                )}
            </div>
        );
    }

    const [isDark, setIsDark] = useState("dark");

    const handleTheme = () => {
        setIsDark(isDark === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        if (isDark === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);
    return (
        <div className="md:container px-5 dark:bg-darkBg dark:text-darkTxt md:px-40 py-10">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={isDark}
                transition={Slide}
            />
            <div className="text-center mb-10">
                <h1 className="text-9xl text-pink font-title">Todos</h1>
            </div>

            <div className="md:flex md:gap-4 gap-2">
                <div
                    id="sideBar"
                    className="md:w-1/4 mt-5 bg-white rounded-md md:p-10 p-2 dark:bg-darkCard"
                >
                    <div className="text-pink font-date md:text-3xl text-xl">
                        Previously
                    </div>
                    <div className="px-2 flex md:flex-col-reverse gap-3 mt-5 overflow-x-scroll sbar">
                        {prevTodosTp.map((tp) => (
                            <PrevTodos
                                key={tp}
                                id={tp}
                                handleSelectDay={() => onSelectDay(tp)}
                                isSelected={tp === selectedDay}
                            >
                                {getDay(tp, "short")}
                            </PrevTodos>
                        ))}
                    </div>
                </div>
                <div
                    id="main"
                    className="md:w-3/4 md:p-10 p-3 dark:bg-darkCard bg-white rounded-md md:my-5 mb-2 mt-5 font-date md:text-xl text-sm"
                >
                    <div className="flex justify-between items-center m-5">
                        <div>{getDay(null, "long")}</div>
                        <div>
                            <i
                                onClick={handleTheme}
                                class={`fa-regular ${
                                    isDark === "dark" ? "fa-sun" : "fa-moon"
                                } scale-125 hover:scale-150 active:scale-150 text-pink duration-500 active:rotate-45 cursor-pointer`}
                            ></i>
                        </div>
                    </div>

                    <div className="md:p-10 mt-10">
                        <InputTodo handleTodos={updateTodos} />
                        <div
                            className={`md:p-5 my-10 ${
                                finalArr.length !== 0 ? "h-contM md:h-cont" : ""
                            } overflow-y-scroll sbar`}
                        >
                            {renderAgain}
                        </div>
                        <BottomNav itemsLeft={totalItems}>
                            <Btn
                                handleBtn={() => navBtns("all")}
                                active={btn === "all"}
                            >
                                All
                            </Btn>
                            <Btn
                                handleBtn={() => navBtns("act")}
                                active={btn === "act"}
                            >
                                Active
                            </Btn>
                            <Btn
                                handleBtn={() => navBtns("com")}
                                active={btn === "com"}
                            >
                                Completed
                            </Btn>
                            <Btn
                                handleBtn={() => navBtns("clr")}
                                active={false}
                            >
                                Clear Completed
                            </Btn>
                        </BottomNav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
