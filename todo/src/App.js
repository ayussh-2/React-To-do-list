import { useState, useEffect } from "react";
import "./App.css";
import InputTodo from "./components/Todo/Input";
import BottomNav from "./components/Todo/BottomNav";
import Todos from "./components/Todo/Todo";
import PrevTodos from "./components/List/PrevTodos";
import Btn from "./components/elements/Btn";

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
            document.getElementById("todo").value = "";
        } else {
            alert("Please enter something!");
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
        // activeBtn(type);
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
            deleteCompleted();
        } else if (btn === "act") {
            finalArr = findUniqueElements(arr, finishArr);
        } else if (btn === "com") {
            finalArr = finishArr;
        } else {
            console.log("all");
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

    // function activeBtn(btnType) {
    //     let unfinshedArr = findUniqueElements(arr, finishArr);
    //     if (btnType === "clr") {
    //         setArr(unfinshedArr, () => {
    //             setFinishArr([]);
    //             finalArr = arr;
    //             setRenderAgain(() => returnTodos(finalArr));
    //         });
    //     } else if (btnType === "act") {
    //         // finalArr = unfinshedArr;
    //     } else if (btnType === "com") {
    //         // finalArr = finishArr;
    //     } else {
    //         // finalArr = arr;
    //     }
    //     // console.log(arr);
    //     // console.log(finalArr);
    //     // setRenderAgain(() => returnTodos(finalArr));
    // }

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

    const [isDark, setIsDark] = useState(true);
    function activateDarkMode() {
        setIsDark(!isDark);
        // document.body.classList.remove("dark");
        // document.body.classList.add("light");
        if (isDark) {
            console.log("dark");
        } else {
            console.log("light");
        }
    }
    return (
        <div className="md:container px-2 md:px-40 py-10">
            <div className="text-center mb-10">
                <h1 className="text-9xl text-pink font-title">Todos</h1>
            </div>

            <div className="flex md:gap-4 gap-2">
                <div
                    id="sideBar"
                    className="w-1/4 mt-5 bg-white rounded-md md:p-10 p-2"
                >
                    <div className="text-pink font-date md:text-3xl text-xl">
                        Previously
                    </div>
                    <div className="px-2 flex flex-col-reverse gap-3 mt-5">
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
                <div id="main" className="w-3/4">
                    <div className="md:p-10 p-3 bg-white rounded-md md:my-5 mb-2 mt-5 flex justify-between items-center font-date md:text-xl text-sm">
                        <div>{getDay(null, "long")}</div>
                        <div>
                            <i
                                onClick={() => activateDarkMode()}
                                class={`fa-regular ${
                                    isDark ? "fa-sun" : "fa-moon"
                                } scale-125 hover:scale-150 active:scale-150 text-pink duration-500 active:rotate-45 cursor-pointer`}
                            ></i>
                        </div>
                    </div>

                    <div className="card flex flex-col md:gap-10 gap-5 bg-white rounded-md md:p-10 font-main p-5">
                        <InputTodo handleTodos={updateTodos} />

                        {renderAgain}

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
