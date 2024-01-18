import "./App.css";
import BottomNav from "./components/Todo/BottomNav";
import InputTodo from "./components/Todo/InputTodo";
import Todos from "./components/Todo/TodosList";

function App() {
    return (
        <div className="container p-40">
            <div className="text-center mb-10">
                <h1 className="text-6xl text-pink italic">Todos</h1>
            </div>
            <div className="card flex flex-col gap-10 bg-white rounded-md p-10">
                <InputTodo />
                <Todos />
                <BottomNav />
            </div>
        </div>
    );
}

export default App;
