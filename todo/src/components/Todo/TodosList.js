import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Todos() {
    return (
        <div className="card2 bg-text p-5 flex justify-between rounded-md">
            <div id="title">
                <h4 className="italic text-xl">Complete React Js</h4>
            </div>
            <div id="del">
                <FontAwesomeIcon icon={["fab", "github"]} />
            </div>
            <div id="complete">
                <input
                    type="checkbox"
                    className="h-5 w-5"
                    // onClick={(e) => handleCheck(e)}
                    name=""
                    id=""
                />
            </div>
        </div>
    );
}

// function handleCheck(this){

// }

export default Todos;
