function Input({ label, value, onChange, ...props }) {
    return (
        <div className="flex flex-col ">
            <label className="text-sm text-white" htmlFor={label}>{label}</label>
            <input
                id={label}
                type={props.type || "text"}
                className="p-2 border rounded-md border-primary focus:outline-none bg-gray-50 focus:bg-white "
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}
export default Input