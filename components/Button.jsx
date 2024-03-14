function Button({ disabled = false, type = "button", ...props }) {
    return (
        <button
            disabled={disabled}
            type={type}
            className="px-5 py-2 mx-auto font-semibold text-white rounded-md hover:shadow-lg disabled:opacity-75 bg-primary w-36"
            {...props}
        >
            {props.children}
        </button>
    )
}
export default Button