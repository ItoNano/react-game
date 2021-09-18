import Square from './square';
const Board = (props) => {
    const renderSquare = (i) => {
        return <Square value={props.squares[i]} onClick={() => props.onClick(i)} i={i} selected={props.selected} />;
    }

    return (
        <div className="boardWrapper">
            <div className="boardWrapper__row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="boardWrapper__row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="boardWrapper__row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board;