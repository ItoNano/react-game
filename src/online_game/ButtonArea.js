// import { useState, useEffect } from 'react';
const ButtonArea = (props) => {
    return (
        <div
            className="resetButton"
            onClick={() => {
                props.resetGame();
            }}
        >
            ăȘă»ăă
        </div>
    );
};
export default ButtonArea;
