import { useState, useEffect } from "react";
import "./App.css";
import { db, auth } from "./components/config/firebase";
import { signOut } from "firebase/auth";
import {
    addDoc,
    collection,
    query,
    where,
    getDocs,
    getDoc,
    updateDoc,
} from "firebase/firestore";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tpToday = today.getTime();
    // const tpToday = 1707596477000;
    const [arr, setArr] = useState([]);
    const [totalItems, setTotalItems] = useState(arr.length);
    const [selectedDay, setSelectedDay] = useState(tpToday);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [btn, setBtn] = useState("all");
    const [loading, setLoading] = useState(false);
    const [prevTodosTp, setPrevTodosTp] = useState(null);
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

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setLoading(false);
            toast("Logout Successfull");
            localStorage.setItem("user", "");
            setIsLoggedIn(false);
            setArr([]);
            setPrevTodosTp([]);
            setBtn("all");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(
        function () {
            let count = 0;
            arr.forEach((element) => {
                if (!element["completed"]) {
                    count++;
                }
            });
            setTotalItems(count);
        },
        [arr]
    );

    let user = localStorage.getItem("user");
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
        fetchData(user, tp);
    }

    function handleLogin() {
        setIsLoggedIn(!isLoggedIn);
    }

    function updateTodos() {
        let task = document.getElementById("todo").value;
        if (task !== "") {
            let timeStamp = new Date().getTime();
            const newTodo = { todo: task, completed: false, date: timeStamp };
            setArr((prevArr) => [...prevArr, newTodo]);
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
        // console.log(updatedArr);
        setArr(updatedArr);
    }

    function DeleteTodo(tp) {
        setArr((prevArr) => prevArr.filter((item) => item.date !== tp));
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
        return (
            <div className="flex flex-col-reverse">
                {arr.length > 0 ? (
                    arr.map((item) => (
                        <Todos
                            key={item.date}
                            handleDelete={DeleteTodo}
                            timestamp={item.date}
                            handleFinish={completeTodo}
                            handleComplete={completeTodo}
                            completed={item.completed}
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
    let jsonObject = {};
    useEffect(() => {
        jsonObject = arr;
    }, [arr, jsonObject]);

    function handleSaveTodos() {
        uploadTodos(selectedDay);
    }

    // update on btn click
    let finalArr = arr;
    const [renderAgain, setRenderAgain] = useState(() => returnTodos(finalArr));
    useEffect(() => {
        if (btn === "clr") {
            setBtn("");
            deleteCompleted();
            setBtn("all");
        } else if (btn === "act") {
            finalArr = [];
            arr.forEach((element) => {
                if (element.completed === false) {
                    finalArr.push(element);
                }
            });
            // console.log(finalArr);
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
    }, [arr, btn]);

    // upload and fetch!
    const referance = collection(db, "todos");

    const uploadTodos = async (day) => {
        if (jsonObject.length !== 0) {
            setLoading(true);
            const currentUserID = user;

            try {
                const querySnapshot = await getDocs(
                    query(
                        referance,
                        where("createdBy", "==", currentUserID),
                        where("date", "==", day)
                    )
                );

                if (querySnapshot.size > 0) {
                    const docRef = querySnapshot.docs[0].ref;
                    const existingTodos =
                        (await getDoc(docRef)).data().todos || [];

                    // Update existing todos set true for completed
                    const updatedTodos = existingTodos.map((existingTodo) => {
                        const matchingNewTodo = jsonObject.find(
                            (newTodo) =>
                                existingTodo.date === newTodo.date &&
                                existingTodo.todo === newTodo.todo
                        );

                        return matchingNewTodo
                            ? { ...existingTodo, ...matchingNewTodo }
                            : existingTodo;
                    });

                    // Filter out existing todos from jsonObject
                    const newTodos = jsonObject.filter(
                        (newTodo) =>
                            !existingTodos.some(
                                (existingTodo) =>
                                    existingTodo.date === newTodo.date &&
                                    existingTodo.todo === newTodo.todo
                            )
                    );

                    // Concatenate updated existing todos with new todos
                    const finalTodos = updatedTodos.concat(newTodos);

                    // Delete todos that are in existingTodos but not in jsonObject
                    const deletedTodos = existingTodos.filter(
                        (existingTodo) =>
                            !jsonObject.some(
                                (newTodo) =>
                                    existingTodo.date === newTodo.date &&
                                    existingTodo.todo === newTodo.todo
                            )
                    );

                    // update
                    await updateDoc(docRef, { todos: finalTodos });

                    // Delete todos that are not in jsonObject
                    deletedTodos.forEach(async (todoToDelete) => {
                        await updateDoc(docRef, {
                            todos: finalTodos.filter(
                                (finalTodo) =>
                                    finalTodo.date !== todoToDelete.date ||
                                    finalTodo.todo !== todoToDelete.todo
                            ),
                        });
                    });

                    toast("Todos updated!");
                } else {
                    await addDoc(referance, {
                        createdBy: currentUserID,
                        date: day,
                        todos: jsonObject,
                    });

                    toast("Todos saved!");
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
                toast("Some error occurred!");
            }
        } else {
            toast("Add some todos!");
        }
    };

    async function fetchData(userId, desiredDate) {
        setLoading(true);
        if (desiredDate != null) {
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

                if (data.length !== 0) {
                    setRenderAgain(returnTodos(data[0]["todos"]));
                    setArr(data[0]["todos"]);
                }
                // console.log(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const q = query(
                    collection(db, "todos"),
                    where("createdBy", "==", userId)
                );
                const querySnapshot = await getDocs(q);
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                if (data.length !== 0) {
                    let dates = [];
                    data.forEach((element) => {
                        dates.push(element.date);
                    });

                    setPrevTodosTp(dates);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            try {
                if (user !== "") {
                    setIsLoggedIn(true);
                    fetchData(user, tpToday);
                    fetchData(user, null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, [user, tpToday, isLoggedIn]);

    return (
        <div className=" px-5 dark:bg-darkBg dark:text-darkTxt md:px-40 py-10">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
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
                    <div className="slide-fwd-center">
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
                                    {prevTodosTp !== null ? (
                                        prevTodosTp.map((tp, index) => (
                                            <PrevTodos
                                                key={index}
                                                id={index}
                                                handleSelectDay={() =>
                                                    onSelectDay(tp)
                                                }
                                                isSelected={tp === selectedDay}
                                            >
                                                {getDay(tp, "short")}
                                            </PrevTodos>
                                        ))
                                    ) : (
                                        <p className="italic text-center mt-5">
                                            Start adding today!
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div
                                id="main"
                                className="md:w-3/4 md:p-10 p-3 dark:bg-darkCard bg-white rounded-md md:my-5 mb-2 mt-5 font-date md:text-xl text-sm fadeIn"
                            >
                                <div className="flex justify-between items-center m-5">
                                    <div>{getDay(selectedDay, "long")}</div>
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
                                            class="fa-solid fa-right-from-bracket text-pink hover:scale-125 cursor-pointer active:scale-150 duration-200"
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
                                        <button
                                            className="opacity-50 active:opacity-100 duration-200"
                                            onClick={() => navBtns("clr")}
                                        >
                                            Clear Completed
                                        </button>
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
