import React from 'react';
;
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, style = props.style, theme = props.theme;
    return (React.createElement("div", { className: 'progress-bar', style: style },
        React.createElement("div", { className: 'progress-bar-outer', style: { height: "".concat(strokeHeight, "px") } },
            React.createElement("div", { className: "progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, showText && React.createElement("span", { className: 'inner-text' }, "".concat(percent, "%"))))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
