import React from "react";

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-400",
    color = "text-white",
    className ="",
    ...props
}) {
    return (
        <button className={`px-2 py-2 border border-gray-200 rounded-lg ${color} ${bgColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;