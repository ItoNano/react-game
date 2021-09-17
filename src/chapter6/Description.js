const Description = (props) => {
    return (
        <div>
            <div>propsはコンポーネント に渡される値</div>
            <div>stateはコンポーネントの内部で宣言制御される値</div>
            <div>stateの値をさらにpropsに渡していくパターンが多い</div>
        </div>
    );
};

export default Description;
