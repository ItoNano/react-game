(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{10:function(t,e,s){"use strict";s.r(e);var r=s(9),a=s(2),n=s(3),i=s(4),c=s(6),u=s(5),o=s(1),h=s.n(o),b=s(8),l=s.n(b),j=(s(15),s(0));function d(t){return Object(j.jsx)("button",{className:"square",onClick:t.onClick,children:t.value})}var p=function(t){Object(c.a)(s,t);var e=Object(u.a)(s);function s(){return Object(n.a)(this,s),e.apply(this,arguments)}return Object(i.a)(s,[{key:"renderSquare",value:function(t){var e=this;return Object(j.jsx)(d,{value:this.props.squares[t],onClick:function(){return e.props.onClick(t)}})}},{key:"render",value:function(){return Object(j.jsxs)("div",{className:"boardWrapper",children:[Object(j.jsxs)("div",{className:"boardWrapper__row",children:[this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)]}),Object(j.jsxs)("div",{className:"boardWrapper__row",children:[this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)]}),Object(j.jsxs)("div",{className:"boardWrapper__row",children:[this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})]})}}]),s}(h.a.Component),x=function(t){Object(c.a)(s,t);var e=Object(u.a)(s);function s(t){var r;return Object(n.a)(this,s),(r=e.call(this,t)).state={},r}return Object(i.a)(s,[{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{className:"buttonArea",children:[Object(j.jsx)("div",{className:"buttonArea__back",onClick:function(){t.props.backStatus()},children:"\u623b\u308b"}),Object(j.jsx)("div",{className:"buttonArea__go",onClick:function(){t.props.goStatus()},children:"\u9032\u3080"})]})}}]),s}(h.a.Component),v=function(t){Object(c.a)(s,t);var e=Object(u.a)(s);function s(t){var r;return Object(n.a)(this,s),(r=e.call(this,t)).state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0},r.backStatus=r.backStatus.bind(Object(a.a)(r)),r.goStatus=r.goStatus.bind(Object(a.a)(r)),r}return Object(i.a)(s,[{key:"handleClick",value:function(t){var e=this.state.history.slice(0,this.state.stepNumber+1),s=e[e.length-1].squares.slice();O(s)||s[t]||(s[t]=this.state.xIsNext?"X":"O",this.setState({history:e.concat([{squares:s}]),stepNumber:e.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(t){this.setState({stepNumber:t,xIsNext:t%2===0})}},{key:"statusText",value:function(){return"\u6b21\u306e\u30d7\u30ec\u30a4\u30e4\u30fc"}},{key:"backStatus",value:function(){0!==this.state.stepNumber&&this.setState({stepNumber:this.state.stepNumber-1,xIsNext:!this.state.xIsNext})}},{key:"goStatus",value:function(){this.state.stepNumber!==this.state.history.length-1&&this.setState({stepNumber:this.state.stepNumber+1,xIsNext:!this.state.xIsNext})}},{key:"render",value:function(){var t,e=this,s=this.state.history,r=s[this.state.stepNumber],a=O(r.squares),n=s.map((function(t,e){return Object(j.jsx)("div",{},e)})),i=Object(j.jsx)("div",{children:"\u30de\u30eb\u30d0\u30c4\u30b2\u30fc\u30e0"});return t=a?"Winner: "+a:this.statusText()+(this.state.xIsNext?"X":"O"),Object(j.jsxs)("div",{className:"gameWrapper",children:[i,Object(j.jsx)("div",{className:"gameWrapper__board",children:Object(j.jsx)(p,{squares:r.squares,onClick:function(t){return e.handleClick(t)}})}),Object(j.jsxs)("div",{className:"gameWrapper__info",children:[Object(j.jsx)("div",{children:t}),Object(j.jsx)("div",{children:n})]}),Object(j.jsx)(x,{backStatus:this.backStatus,goStatus:this.goStatus})]})}}]),s}(h.a.Component);function O(t){for(var e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<e.length;s++){var a=Object(r.a)(e[s],3),n=a[0],i=a[1],c=a[2];if(t[n]&&t[n]===t[i]&&t[n]===t[c])return t[n]}return null}l.a.render(Object(j.jsx)(v,{}),document.getElementById("root"))},15:function(t,e,s){}},[[10,1,2]]]);
//# sourceMappingURL=main.9b5f463e.chunk.js.map