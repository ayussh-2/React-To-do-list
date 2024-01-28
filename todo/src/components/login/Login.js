import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

function Login({ handleLogin }) {
    const [viewPass, setViewPass] = useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const login = async () => {
        try {
            await createUserWithEmailAndPassword(auth, mail, password);
            await handleLogin();
        } catch (err) {
            if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else {
                setError(error.message);
            }
        }
    };

    const googleLogin = async () => {
        try {
            await signInWithPopup(auth, googleAuth);
            await handleLogin();
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 gap-10 flex flex-col text-center">
                <h1 className="font-title text-4xl md:text-6xl">Login</h1>
                <div className="bg-darkCard p-5 rounded-lg">
                    <div className="relative w-full min-w-[200px] h-10 my-5">
                        <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-3/4 right-3 -translate-y-2/4">
                            <i className="fas fa-at" aria-hidden="true"></i>
                        </div>
                        <input
                            className="font-sans p-4 rounded-md w-full bg-darkSubCard text-white outline-none"
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
                            className="font-sans p-4 rounded-md w-full bg-darkSubCard text-white outline-none"
                            placeholder="Password"
                            type={viewPass ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
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
                    <div className="flex flex-col">
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
                    </div>
                </div>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Login;
