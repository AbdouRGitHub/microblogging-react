import * as React from "react";

interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

function Button({type = 'button', children, className, disabled}: ButtonProps) {
    return (
        <>
            <button
                type={type}
                className={className}
                disabled={disabled}
            >
                {children}
            </button>
        </>
    )
}

export default Button;