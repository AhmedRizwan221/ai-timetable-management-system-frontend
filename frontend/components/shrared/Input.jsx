import React, { forwardRef, useId } from "react";

function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full py-3">
            {label && <label className="inline-block mb-1 pl-1 text-black" htmlFor={id}>
                {label}
            </label>}
            <input 
                type={type}
                className={`py-3 px-3 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border border-gray-200 w-full
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )

}

export default forwardRef(Input);