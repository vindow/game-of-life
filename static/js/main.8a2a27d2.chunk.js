(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){},271:function(e,t,a){},272:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(89),i=a.n(r),o=(a(98),a(12)),s=a(13),c=a(16),d=a(14),u=a(15),h=a(90),p=a(3),m=a(91),v=a.n(m),g=(a(105),a(106),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleClick=function(e){a.props.onClick(a.props)},a.handleClick=a.handleClick.bind(Object(p.a)(a)),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e={backgroundColor:this.props.aliveColor},t={backgroundColor:this.props.deadColor};return this.props.alive?l.a.createElement("button",{className:"cell",id:"aliveCell",onClick:this.handleClick,style:e}):l.a.createElement("button",{className:"cell",id:"deadCell",onClick:this.handleClick,style:t})}}]),t}(l.a.Component)),b=a(1),C=a.n(b),E=a(92),f=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleClick=function(){a.setState({displayColorPicker:!a.state.displayColorPicker})},a.handleClose=function(){a.setState({displayColorPicker:!1})},a.handleChange=function(e){a.props.onChange(e)},a.state={displayColorPicker:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=C()({default:{color:{width:"36px",height:"14px",borderRadius:"2px",background:this.props.color},swatch:{padding:"5px",background:"#fff",borderRadius:"1px",boxShadow:"0 0 0 1px rgba(0,0,0,.1)",display:"inline-block",cursor:"pointer"},popover:{position:"absolute",zIndex:"2",right:"0em",bottom:"0em"},cover:{position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}}});return l.a.createElement("div",null,l.a.createElement("div",{style:e.swatch,onClick:this.handleClick},l.a.createElement("div",{style:e.color})),this.state.displayColorPicker?l.a.createElement("div",{style:e.popover},l.a.createElement("div",{style:e.cover,onClick:this.handleClose}),l.a.createElement(E.ChromePicker,{disableAlpha:!0,color:this.props.color,onChange:this.handleChange})):null)}}]),t}(l.a.Component),k=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).createBoard=function(){for(var e=[],t=0;t<a.state.grid.length;t++){for(var n=[],r=0;r<a.state.grid[t].length;r++)a.state.grid[t][r]?n.push(l.a.createElement("td",null,l.a.createElement(g,{onClick:a.toggleCell,alive:!0,row:t,col:r,aliveColor:a.state.aliveColor,deadColor:a.state.deadColor}))):n.push(l.a.createElement("td",null,l.a.createElement(g,{onClick:a.toggleCell,alive:!1,row:t,col:r,aliveColor:a.state.aliveColor,deadColor:a.state.deadColor})));e.push(l.a.createElement("tr",null,n))}return e},a.toggleCell=function(e){var t=a.state.grid;e.alive?t[e.row][e.col]=!1:t[e.row][e.col]=!0,a.setState({grid:t})},a.nextGeneration=function(e){for(var t=[],n=0;n<a.state.grid.length;n++){for(var l=[],r=0;r<a.state.grid[n].length;r++)l.push(a.checkNeighbors(n,r));t.push(l)}a.setState({grid:t})},a.checkNeighbors=function(e,t){for(var n=0,l=e-1;l<=e+1;l++)for(var r=t-1;r<=t+1;r++)if(a.state.wrapping){var i=l,o=r;l<0?i=a.state.grid.length-1:l>=a.state.grid.length&&(i=0),r<0?o=a.state.grid[i].length-1:r>=a.state.grid[i].length&&(o=0),a.state.grid[i][o]&&n++}else{if(l<0||l>=a.state.grid.length||r<0||r>=a.state.grid[0].length)continue;a.state.grid[l][r]&&n++}return a.state.grid[e][t]?(n--,a.state.survival[n]):a.state.birth[n]},a.autoGeneration=function(e){a.setState({running:!0}),a.runInterval=a.props.setInterval(a.nextGeneration,1e3/a.state.speed)},a.pauseGeneration=function(e){a.setState({running:!1}),a.props.clearInterval(a.runInterval)},a.handleInput=function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,l=t.name;a.setState(Object(h.a)({},l,n))},a.handleSurvivalInput=function(e){var t=e.target.name,n=e.target.checked;if(t.startsWith("birth")){var l=a.state.birth.slice();l[t.slice(-1)]=n,a.setState({birth:l})}else{var r=a.state.survival.slice();r[t.slice(-1)]=n,a.setState({survival:r})}},a.randomize=function(e){for(var t=[],n=0;n<a.state.grid.length;n++){for(var l=[],r=0;r<a.state.grid[n].length;r++)Math.random()<a.state.density?l.push(!0):l.push(!1);t.push(l)}a.setState({grid:t})},a.clearBoard=function(e){for(var t=[],n=0;n<40;n++){for(var l=[],r=0;r<75;r++)l.push(!1);t.push(l)}a.setState({grid:t})},a.handleAliveColorChange=function(e){a.setState({aliveColor:e.hex})},a.handleDeadColorChange=function(e){a.setState({deadColor:e.hex})};for(var n=[],r=0;r<40;r++){for(var i=[],s=0;s<75;s++)i.push(!1);n.push(i)}return a.state={grid:n,speed:2,density:.5,running:!1,wrapping:!1,birth:[!1,!1,!1,!0,!1,!1,!1,!1,!1],survival:[!1,!1,!0,!0,!1,!1,!1,!1,!1],aliveColor:"#25892D",deadColor:"#EFEFEF"},a.nextGeneration=a.nextGeneration.bind(Object(p.a)(a)),a.toggleCell=a.toggleCell.bind(Object(p.a)(a)),a.autoGeneration=a.autoGeneration.bind(Object(p.a)(a)),a.pauseGeneration=a.pauseGeneration.bind(Object(p.a)(a)),a.handleInput=a.handleInput.bind(Object(p.a)(a)),a.handleSurvivalInput=a.handleSurvivalInput.bind(Object(p.a)(a)),a.randomize=a.randomize.bind(Object(p.a)(a)),a.clearBoard=a.clearBoard.bind(Object(p.a)(a)),a.handleAliveColorChange=a.handleAliveColorChange.bind(Object(p.a)(a)),a.handleDeadColorChange=a.handleDeadColorChange.bind(Object(p.a)(a)),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){for(var e=[],t=[],a=0;a<9;a++){var n="birth"+a,r="survival"+a;e.push(l.a.createElement("input",{name:n,type:"checkbox",checked:this.state.birth[a],onChange:this.handleSurvivalInput})),e.push(l.a.createElement("label",null,a)),t.push(l.a.createElement("input",{name:r,type:"checkbox",checked:this.state.survival[a],onChange:this.handleSurvivalInput})),t.push(l.a.createElement("label",null,a))}return l.a.createElement("div",{id:"board"},l.a.createElement("table",{id:"table"},this.createBoard()),l.a.createElement("div",{id:"footer"},l.a.createElement("div",{id:"options"},l.a.createElement("span",{className:"optionsHeader"},"Simulation Options"),l.a.createElement("div",{className:"optionRow"},l.a.createElement("div",null,l.a.createElement("span",null,"Auto-Run Speed (iterations per second): ",this.state.speed),l.a.createElement("input",{className:"slider",id:"speed",name:"speed",type:"range",disabled:this.state.running,min:"1",max:"4",defaultValue:this.state.speed,onChange:this.handleInput,step:"1"})),l.a.createElement("div",null,l.a.createElement("button",{onClick:this.autoGeneration,disabled:this.state.running},"Auto-Run Generation"),l.a.createElement("button",{onClick:this.pauseGeneration,disabled:!this.state.running},"Pause Generation"),l.a.createElement("button",{onClick:this.nextGeneration,disabled:this.state.running},"Step Generation")),l.a.createElement("div",null,l.a.createElement("input",{name:"wrapping",type:"checkbox",checked:this.state.wrapping,onChange:this.handleInput}),l.a.createElement("label",null,"Board Wrapping"))),l.a.createElement("div",{className:"optionRow"},l.a.createElement("div",{id:"randomOptions"},l.a.createElement("div",{className:"row"},l.a.createElement("span",null,"Randomize Cell Density: ",this.state.density),l.a.createElement("input",{className:"slider",id:"density",name:"density",type:"range",min:"0.1",max:"0.9",defaultValue:this.state.density,onChange:this.handleInput,step:"0.1"})),l.a.createElement("div",{id:"buttonRow"},l.a.createElement("button",{onClick:this.randomize,disabled:this.state.running},"Randomize Cells"),l.a.createElement("button",{id:"clearButton",onClick:this.clearBoard,disabled:this.state.running},"Clear All"))),l.a.createElement("div",null,l.a.createElement("div",{className:"row"},l.a.createElement("span",null,"Birth Conditions: "),e),l.a.createElement("div",{className:"row"},l.a.createElement("span",null,"Survival Conditions: "),t)))),l.a.createElement("div",{id:"colors"},l.a.createElement("span",{className:"optionsHeader"},"Color Options"),l.a.createElement("div",{className:"optionRow"},l.a.createElement("label",null,"Cell Color"),l.a.createElement(f,{color:this.state.aliveColor,onChange:this.handleAliveColorChange})),l.a.createElement("div",{className:"optionRow"},l.a.createElement("label",null,"Grid Color"),l.a.createElement(f,{color:this.state.deadColor,onChange:this.handleDeadColorChange})))))}}]),t}(l.a.Component),O=v()(k),j=(a(271),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"Life-like Cellular Automaton Simulator"),l.a.createElement(O,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},93:function(e,t,a){e.exports=a(272)},98:function(e,t,a){}},[[93,1,2]]]);
//# sourceMappingURL=main.8a2a27d2.chunk.js.map