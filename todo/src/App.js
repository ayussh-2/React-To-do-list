import { useState, useEffect } from "react";
import "./App.css";
import { db, auth } from "./components/config/firebase";
import { signOut } from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import InputTodo from "./components/Todo/Input";
import BottomNav from "./components/Todo/BottomNav";
import Todos from "./components/Todo/Todo";
import PrevTodos from "./components/List/PrevTodos";
import Btn from "./components/elements/Btn";
import Login from "./components/login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

function App() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tpToday = today.getTime();

    const [arr, setArr] = useState([]);
    const [finishArr, setFinishArr] = useState([]);
    const [totalItems, setTotalItems] = useState(arr.length);
    const [selectedDay, setSelectedDay] = useState(tpToday);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [btn, setBtn] = useState("all");
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setLoading(false);
            toast("Logout Successfull");
            localStorage.setItem("user", "");
            setIsLoggedIn(false);
        } catch (err) {
            console.error(err);
        }
    };

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
        fetchData(auth?.currentUser?.uid, tp);
    }

    function handleLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    const prevTodosTp = [
        1741996800000, 1730505600000, 1720396800000, 1727568000000,
        1733961600000, 1743811200000, 1724198400000, 1748908800000,
        1729123200000, 1739059200000, 1706483659000, 1706380200000,
    ];
    prevTodosTp.push(tpToday);

    function updateTodos() {
        let task = document.getElementById("todo").value;
        if (task !== "") {
            let timeStamp = new Date().getTime();
            const newTodo = { todo: task, completed: false, date: timeStamp };
            setArr((prevArr) => [...prevArr, newTodo]);
            setTotalItems(totalItems + 1);
            setRenderAgain(renderAgain);
            document.getElementById("todo").value = "";
        } else {
            toast("Enter todos 🥲");
        }
    }

    function completeTodo(timestamp) {
        const updatedArr = arr.map((item) => {
            if (item.date === timestamp) {
                return {
                    todo: item.todo,
                    completed: !item.completed,
                    date: timestamp,
                };
            }
            return item;
        });
        console.log(updatedArr);
        setArr(updatedArr);
    }

    function DeleteTodo(tp) {
        setArr((prevArr) => prevArr.filter((item) => item.date !== tp));
        setTotalItems(totalItems - 1);
    }

    function updateNoTodos(param, tp) {
        if (param === "sub") {
            // setTotalItems(totalItems - 1);
            console.log(finalArr);
            console.log(arr);
            // const task = finalArr.find((obj) => tp in obj);
            // setFinishArr((prevArr) => [...prevArr, task]);
        } else {
            // setTotalItems(totalItems + 1);
            // setFinishArr((prevArr) =>
            //     prevArr.filter(
            //         (item) => !Object.keys(item).includes(tp.toString())
            //     )
            // );
        }
        completeTodo(tp);
    }

    function deleteCompleted() {
        finalArr = [];
        arr.forEach((element) => {
            if (element.completed === false) {
                finalArr.push(element);
            }
        });
        setArr(finalArr);
    }

    function returnTodos(arr) {
        function findTp(timestamp) {
            return finishArr.some((item) => item.date === timestamp);
        }

        return (
            <div className="flex flex-col-reverse">
                {arr.length > 0 ? (
                    arr.map((item) => (
                        <Todos
                            key={item.date}
                            handleDelete={DeleteTodo}
                            timestamp={item.date}
                            handleFinish={updateNoTodos}
                            handleComplete={completeTodo}
                            completed={findTp(item.date) || item.completed}
                        >
                            {item.todo}
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

    function navBtns(type) {
        setBtn(type);
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

    let jsonObject = {};
    useEffect(() => {
        jsonObject = arr;
    }, [arr, finishArr, jsonObject]);

    function handleSaveTodos() {
        uploadTodos();
    }

    // update on btn click
    let finalArr = arr;
    const [renderAgain, setRenderAgain] = useState(() => returnTodos(finalArr));
    useEffect(() => {
        if (btn === "clr") {
            setBtn("");
            deleteCompleted();
        } else if (btn === "act") {
            finalArr = [];
            arr.forEach((element) => {
                if (element.completed === false) {
                    finalArr.push(element);
                }
            });
        } else if (btn === "com") {
            finalArr = [];
            arr.forEach((element) => {
                if (element.completed === true) {
                    finalArr.push(element);
                }
            });
        } else {
            finalArr = arr;
        }
        const newRenderAgain = returnTodos(finalArr);
        setRenderAgain(newRenderAgain);
    }, [arr, finishArr, btn]);

    const referance = collection(db, "todos");
    const uploadTodos = async () => {
        if (jsonObject.length !== 0) {
            setLoading(true);
            if (auth.currentUser && auth.currentUser.uid !== null) {
                try {
                    await addDoc(referance, {
                        createdBy: auth?.currentUser?.uid,
                        date: tpToday,
                        todos: jsonObject,
                    });
                    setLoading(false);
                    toast("Todos saved!");
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                    toast("Some error occoured!");
                }
            } else {
                toast("Log in to save your todos!");
                setLoading(false);
                setIsLoggedIn(false);
            }
        } else {
            toast("Add some todos!");
        }
    };

    async function fetchData(userId, desiredDate) {
        setLoading(true);
        try {
            const q = query(
                collection(db, "todos"),
                where("createdBy", "==", userId),
                where("date", "==", desiredDate)
            );
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setLoading(false);
            console.log(data);
            if (data.length !== 0) {
                setRenderAgain(returnTodos(data[0]["todos"]));
                setArr(data[0]["todos"]);
            }
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        try {
            const userid = localStorage.getItem("user");
            if (userid !== null) {
                setIsLoggedIn(true);
                fetchData(userid, tpToday);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    }, []);
    function handleDateChange(tp) {
        fetchData(auth?.currentUser?.uid, tp);
    }
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
            <div className="flex justify-center">
                <div
                    className={`flex min-h-screen justify-center items-center absolute z-50 ${
                        loading ? "animate-fade-in" : "hidden"
                    }`}
                >
                    <HashLoader color="#fff" loading={loading} />
                </div>
            </div>
            <div className={`duration-500 ${loading ? "filter blur-md" : ""}`}>
                {isLoggedIn ? (
                    <div>
                        <div className="text-center mb-10">
                            <h1 className="text-9xl text-pink font-title animate-fade-in">
                                Todos
                            </h1>
                        </div>
                        <div className="md:flex md:gap-4 gap-2">
                            <div
                                id="sideBar"
                                className="md:w-1/4 mt-5 bg-white rounded-md md:p-10 p-2 dark:bg-darkCard fadeIn"
                            >
                                <div className="text-pink font-date text-center md:text-3xl text-xl">
                                    Previously
                                </div>
                                <div className="px-2 flex md:flex-col-reverse gap-3 mt-5 overflow-x-scroll sbar">
                                    {prevTodosTp.map((tp) => (
                                        <PrevTodos
                                            key={tp}
                                            id={tp}
                                            handleSelectDay={() =>
                                                onSelectDay(tp)
                                            }
                                            isSelected={tp === selectedDay}
                                        >
                                            {getDay(tp, "short")}
                                        </PrevTodos>
                                    ))}
                                </div>
                            </div>
                            <div
                                id="main"
                                className="md:w-3/4 md:p-10 p-3 dark:bg-darkCard bg-white rounded-md md:my-5 mb-2 mt-5 font-date md:text-xl text-sm fadeIn"
                            >
                                <div className="flex justify-between items-center m-5">
                                    <div>{getDay(null, "long")}</div>
                                    <div className="flex gap-5">
                                        <i
                                            onClick={handleTheme}
                                            class={`fa-regular ${
                                                isDark === "dark"
                                                    ? "fa-sun"
                                                    : "fa-moon"
                                            } scale-125 hover:scale-150 active:scale-150 text-pink duration-500 active:rotate-45 cursor-pointer`}
                                        ></i>
                                        <i
                                            class="fa-solid fa-right-from-bracket text-pink hover:scale-125 active:scale-150 duration-200"
                                            onClick={logout}
                                        ></i>
                                    </div>
                                </div>

                                <div className="md:p-10 mt-10">
                                    <InputTodo
                                        handleTodos={updateTodos}
                                        saveTodos={handleSaveTodos}
                                    />
                                    <div
                                        className={`md:p-5 my-10 ${
                                            finalArr.length !== 0
                                                ? "h-contM md:h-cont"
                                                : ""
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
                ) : (
                    <Login handleLogin={handleLogin} />
                )}
                <div
                    className="text-center mt-10 active:opacity-70 hover:tracking-wider cursor-pointer duration-500 font-nav"
                    id="footer"
                >
                    <a href="https://github.com/ayussh-2">
                        Made with <i class="fa-solid fa-heart"></i> by Ayush
                    </a>
                </div>
            </div>
        </div>
    );
}

export default App;
