const Square = (props) => {
    return (
        <button className={`square ${props.selected && props.selected.toArea.includes(props.i) ? 'toArea':''} ${props.selected && props.selected.number === props.i ? 'selected':''} `} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;