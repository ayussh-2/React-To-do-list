import { useState } from "react";
import "./App.css";
import InputTodo from "./components/Todo/Input";
import BottomNav from "./components/Todo/BottomNav";
import Todos from "./components/Todo/Todo";

function App() {
    const [arr, setArr] = useState([]);
    const [totalItems, setTotalItems] = useState(arr.length);

    console.log(totalItems);

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

    function updateNoTodos(param) {
        if (param === "sub") {
            setTotalItems(totalItems - 1);
        } else {
            setTotalItems(totalItems + 1);
        }
    }

    function getDay() {
        let date = new Date();
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
            daysOfWeek[day]
        }`;
        return finalDate;
    }
    return (
        <div className="container p-40">
            <div className="text-center mb-10">
                <h1 className="text-6xl text-pink italic">Todos</h1>
            </div>
            <div className="p-10 bg-white rounded-md my-5">
                <div>{getDay()}</div>
            </div>
            <div className="card flex flex-col gap-10 bg-white rounded-md p-10">
                <InputTodo handleTodos={updateTodos} />
                <div className="flex flex-col-reverse">
                    {arr.length > 0 ? (
                        arr.map((item) => (
                            <Todos
                                key={Object.keys(item)[0]}
                                handleDelete={DeleteTodo}
                                timestamp={Object.keys(item)[0]}
                                handleFinish={updateNoTodos}
                                // timeOfTodo={12}
                            >
                                {Object.values(item)[0]}
                            </Todos>
                        ))
                    ) : (
                        <p className="italic text-center text-xl my-5 tracking-wider">
                            Add some todos!
                        </p>
                    )}
                </div>

                <BottomNav itemsLeft={totalItems} />
            </div>
        </div>
    );
}

export default App;
