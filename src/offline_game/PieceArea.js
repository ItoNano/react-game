// import { useState, useEffect } from 'react';
const PieceArea = (props) => {
    const restPiece = props.myPiece[props.xIsNext].rest.slice();
    const changeMyPiece = (item, index) => {
        return props.xIsNext.repeat(item, index)
    }
    return (
        <div className="pieceArea">
            {restPiece.map((item, index) => {
                return <div className={`pieceArea__button ${props.myPiece.set && props.myPiece.set.item === item && props.myPiece.set.index === index ? 'pieceArea__button--selected':''}`} key={index} onClick={() =>{props.usePiece(item, index)}}>{changeMyPiece(item)}</div>
            })}
        </div>
    );
};
export default PieceArea;
