import { useState } from 'react';
import Set from './set/Set'
const UseState = (props) => {
    const [sample] = useState('初期値')
    const [update, setUpdate] = useState('')
    const [forState, setForState] = useState('上のボタンを押して表示')
    const [click, setClick] = useState('クリックの渡し方')
    const methodsForState =  () => {
        setForState('更新関数はそのまま渡さず関数化する')
    }
    const methodsSetClick = (getValue) => {
        setClick(getValue)
    }
    return (
        <div>
            <div>reactからuseStateを読み込み</div>
            <div>useStateを定義</div>
            <div>配列内の第一引数に変数名、第二引数に更新関数</div>
            <div>配列内の第一引数に変数名、第二引数に更新関数、useState内に{sample}</div>
            <button onClick={() => {
                setUpdate('更新')
            }}>クリック</button>
            <div>setStateを使って{update}する</div>
            <Set methodsForState={methodsForState} onClick={(getValue) => methodsSetClick(getValue)} />
            <div>{forState}</div>
            <div>{click}</div>
            <br />
        </div>
    );
};

export default UseState;
