export default function Btn({ children, active, handleBtn }) {
    return (
        <button
            className={`duration-300 ${
                active ? "activeBtn" : "hover:opacity-50"
            }`}
            onClick={() => handleBtn()}
        >
            {children}
        </button>
    );
}
