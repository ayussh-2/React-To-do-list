import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";

function Login({ handleLogin }) {
    const [viewPass, setViewPass] = useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [newUser, setNewUser] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    const login = async () => {
        if (mail !== "" && password !== "") {
            setIsLoading(true);
            try {
                await signInWithEmailAndPassword(auth, mail, password);
                setIsLoading(false);
                await handleLogin();
            } catch (err) {
                setIsLoading(false);
                if (err.code === "auth/invalid-credential") {
                    toast("Incorrect Email or Password!");
                } else {
                    toast("Some error has occoured");
                    console.error(err.code);
                }
            } finally {
                localStorage.setItem("user", auth?.currentUser?.uid);
            }
        } else {
            toast("Fill up the details");
        }
    };

    const googleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleAuth);
            setIsLoading(false);
            await handleLogin();
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            toast("Some error has occoured!");
        } finally {
            localStorage.setItem("user", auth?.currentUser?.uid);
        }
    };

    function handleNewAcc() {
        setNewUser(!newUser);
    }

    const handleNewUser = async () => {
        if (mail !== "" && password !== "") {
            setIsLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, mail, password);
                setIsLoading(false);
                toast("Account Created!");
                setNewUser(false);
            } catch (err) {
                setIsLoading(false);
                if (err.code === "auth/email-already-in-use") {
                    toast("Oops duplicate mail !");
                } else if (err.code === "auth/invalid-email") {
                    toast("Invalid Email");
                } else if (err.code === "auth/weak-password") {
                    toast(err.message);
                } else {
                    toast("Some error has occoured!");
                    console.error(err);
                }
            }
        } else {
            toast("Fill up the details!");
        }
    };

    return (
        <div className={"flex items-center justify-center h-screen"}>
            <div
                className={`absolute z-50 ${
                    isLoading ? "animate-fade-in" : "hidden"
                }`}
            >
                <HashLoader color="#fff" loading={isLoading} />
            </div>

            <div
                className={`sm:w-96 md:w-1/2 lg:w-1/3 xl:w-96 gap-10 flex flex-col text-center duration-500  ${
                    isLoading ? "filter blur-md " : ""
                }`}
            >
                <h1 className="font-title text-4xl md:text-6xl">Login</h1>
                <div className="bg-darkCard p-5 rounded-lg">
                    <div className="relative w-full min-w-[200px] h-10 my-5">
                        <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-3/4 right-3 -translate-y-2/4">
                            <i className="fas fa-at" aria-hidden="true"></i>
                        </div>
                        <input
                            className="font-thin p-4 rounded-md w-full bg-darkSubCard text-white outline-none"
                            placeholder="Email"
                            type="email"
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full min-w-[200px] h-10 my-5">
                        <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-3/4 right-3 -translate-y-2/4">
                            <i
                                className={`fa-solid hover:opacity-60 cursor-pointer active:opacity-100 duration-200 ${
                                    viewPass ? "fa-eye-slash" : "fa-eye"
                                }`}
                                onClick={() => setViewPass(!viewPass)}
                                aria-hidden="true"
                            ></i>
                        </div>
                        <input
                            className="font-thin p-4 rounded-md w-full bg-darkSubCard text-white outline-none"
                            placeholder="Password"
                            type={viewPass ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {!newUser && (
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 mb-5">
                            <button
                                className="w-full sm:w-auto px-5 py-3 bg-darkSubCard rounded-md hover:bg-darkLightBlack active:bg-darkSubCard duration-200 mb-4 sm:mb-0"
                                onClick={login}
                            >
                                Go
                            </button>
                            <p className="text-center sm:text-right font-date">
                                <a
                                    href="#"
                                    className="hover:opacity-60 duration-200 active:tracking-tight"
                                >
                                    Forgot Password &nbsp;
                                    <i className="fa-solid fa-question"></i>
                                </a>
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col">
                        {newUser && (
                            <button
                                className="w-full px-5 py-3 my-5 bg-darkSubCard rounded-md hover:bg-darkLightBlack active:bg-darkSubCard duration-200"
                                onClick={handleNewUser}
                            >
                                Create
                            </button>
                        )}
                        <p className="text-center mb-3">Or</p>
                        <div>
                            <button
                                className="w-full px-5 py-3 bg-darkSubCard rounded-md hover:bg-darkLightBlack active:bg-darkSubCard duration-200"
                                onClick={googleLogin}
                            >
                                Sign in with&nbsp;
                                <i className="fa-brands fa-google"></i>
                            </button>
                        </div>
                        {!newUser && (
                            <div className="mt-3">
                                <button
                                    className="w-full px-5 py-3 bg-darkSubCard rounded-md hover:bg-darkLightBlack active:bg-darkSubCard duration-200"
                                    onClick={() => handleNewAcc()}
                                >
                                    Create a new account
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
