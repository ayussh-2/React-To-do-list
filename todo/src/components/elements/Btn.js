export default function Btn({ children, active, handleBtn }) {
    return (
        <button
            className={`duration-200 ${
                active ? "activeBtn" : "hover:opacity-50"
            }`}
            onClick={() => handleBtn()}
        >
            {children}
        </button>
    );
}
