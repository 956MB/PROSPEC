import React from 'react';

const TitlebarNavigationButton: React.FC<{
    buttonIcon: string,
    buttonClasses: string,
    onClick: () => void
}> = ({ buttonIcon, buttonClasses, onClick }) => {

    return (
        <button
            className={`titlebar-button refresh-group-button ${buttonClasses} noselect`}
            onClick={onClick}>
            <img src={buttonIcon} alt="backward" id="titlebar-back" />
        </button>
    )
}

export default TitlebarNavigationButton;