import React from 'react';

type PropsButton = {
    title: string
    onclick: () => void
    disabled?: boolean
}

export const Button = ({onclick, title, disabled}: PropsButton) => {
    return (
        <button disabled={disabled} onClick={onclick}>{title}</button>
    );
};

