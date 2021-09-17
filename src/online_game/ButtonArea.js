// import { useState, useEffect } from 'react';
const ButtonArea = (props) => {
    return (
        <div
            className="resetButton"
            onClick={() => {
                props.resetGame();
            }}
        >
            リセット
        </div>
    );
};
export default ButtonArea;
