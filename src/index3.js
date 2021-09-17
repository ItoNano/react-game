import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChapterFour from './chapter4/ChapterFour'
import ChapterFive from './chapter5/ChapterFive'
import ChapterSix from './chapter6/ChapterSix'
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div>react.fragmentを使用することでrenderした時に出力されないタグを使用できる</div>
                <Fragment />
                <ClassComponents />
                <FunctionComponents />
                <ChapterFour title="propsの受け渡し方" />
                <ChapterFive />
                <ChapterSix />
            </React.Fragment>
        );
    }
}
class Fragment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div>もしくはこれでもfragmentの代わりになる</div>
            </>
        );
    }
}

class ClassComponents extends Component {
    render() {
        return (
            <>
                <div>クラスコンポーネントはあまり使われていないらしい。</div>
                <div>propsを使用するときはthisが必要</div>
            </>
        );
    }
}

const FunctionComponents = () => {
    return (
        <>
            <div>今の主流は関数コンポーネント</div>
            <div>propsを使用するときthisが必要ない</div>
        </>
    );
};

ReactDOM.render(<TodoApp />, document.querySelector('#root'));
