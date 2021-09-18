// import { useState, useEffect } from 'react';
const ButtonArea = (props) => {
    return (
        <>
            <div className="buttonArea">
                <div
                    className="buttonArea__back"
                    onClick={() => {
                        props.backStatus();
                    }}
                >
                    戻る
                </div>
                <div
                    className="buttonArea__go"
                    onClick={() => {
                        props.goStatus();
                    }}
                >
                    進む
                </div>
            </div>
            <div
                className="resetButton"
                onClick={() => {
                    props.resetGame();
                }}
            >
                リセット
            </div>
        </>
    );
};
export default ButtonArea;
