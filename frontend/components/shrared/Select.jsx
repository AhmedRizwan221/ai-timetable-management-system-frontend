import { useId, forwardRef } from "react";

function Select({
    label,
    options = [],
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label className="py-3 px-2" htmlFor={id}>{label}</label>}
            <select
                {...props}
                id={id}
                className={`py-3 px-3 rounded-lg bg-white text-black outline-none focus:bg-gray-500 duration-200 border borader-gray-200 w-full ${className}`}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select);