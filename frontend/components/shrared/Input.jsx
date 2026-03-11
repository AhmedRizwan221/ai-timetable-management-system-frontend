import React, { forwardRef, useId } from "react";

function Input({
    label,
    type = "text",
    className = "",
    icon: Icon,
    ...props
}, ref) {
    const id = useId();
    return (
        <>
            {label && <label className="flex items-center gap-1.5" htmlFor={id}>
                {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />} {label}
            </label>}
            <input
                type={type}
                className={`
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />

        </>
    )

}

export default forwardRef(Input);