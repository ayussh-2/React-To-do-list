export default function Btn({ children, active, handleBtn }) {
    return (
        <button
            className={`duration-300 cool-link ${
                active ? "scale-105" : "hover:opacity-50 opacity-50"
            }`}
            onClick={() => handleBtn()}
        >
            {children}
        </button>
    );
}
