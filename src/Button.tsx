import React from 'react';

type PropsButton = {
    title: string
    onclick: () => void
}

export const Button = ({onclick, title}: PropsButton) => {
    return (
        <button onClick={onclick}>{title}</button>
    );
};

