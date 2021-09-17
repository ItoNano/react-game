const Set = (props) => {
    return (
        <>
            <button
                onClick={() => {
                    props.methodsForState();
                }}
            >
                更新
            </button>
            <button
                onClick={() => {
                    props.onClick('こうやって引数を渡す。括弧に注意');
                }}
            >
                更新2
            </button>
        </>
    );
};

export default Set;
