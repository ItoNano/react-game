const Square = (props) => {
    const nowSetedPiece = (piece) => {
        if (piece.topIsX === true) {
            const x = 'x'
            return x.repeat(piece.seted[0].number);
            // return 'x'
        } else if (piece.topIsX === false) {
            const x = 'O'
            return x.repeat(piece.seted[0].number);
            // return 'o'
        }
        return ''
    }
    return (
        <button className={`square ${props.selected && props.selected.toArea.includes(props.i) ? 'toArea':''} ${props.selected && props.selected.index === props.i ? 'selected':''} `} onClick={props.onClick}>
            {nowSetedPiece(props.value)}
        </button>
    );
}

export default Square;