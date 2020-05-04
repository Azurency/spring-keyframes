"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var springer_1 = __importDefault(require("springer"));
var emotion_1 = require("emotion");
var defaults = {
    stiffness: 50,
    damping: 80,
    precision: 2,
    unit: 'px',
};
var transformMap = ['x', 'y', 'scale', 'rotate'];
function roundToPrecision(num, precision) {
    if (precision === void 0) { precision = 2; }
    var decimalPoints = Math.pow(10, precision);
    return Math.ceil(num * decimalPoints) / decimalPoints;
}
var calcPropTweenVal = function (prop, frame, from, to, _a) {
    var precision = _a.precision;
    return function (spring) {
        var value = (from[prop] || 0) +
            ((to[prop] || 0) - (from[prop] || 0)) * spring(frame / 100);
        return roundToPrecision(value, precision);
    };
};
var createCalcPropTweenVal = function (from, to, options) { return function (prop, frame) {
    var spring = springer_1.default(options.damping / 100, options.stiffness / 100);
    return calcPropTweenVal(prop, frame, from, to, options)(spring);
}; };
var splitTransform = function (prop, value, transformList) {
    var _a;
    if (transformList === void 0) { transformList = []; }
    return transformMap.includes(prop)
        ? { transform: transformList.concat([[prop, value]]) }
        : (_a = {}, _a[prop] = value, _a);
};
var reduceFrame = function (tween, property, value) { return (__assign({}, tween, splitTransform(property, value, tween.transform))); };
function mapTransformPropToCss(prop, sprungValue, unit) {
    if (unit === void 0) { unit = 'px'; }
    switch (prop) {
        case 'y':
            return "translateY(" + sprungValue + unit + ")";
        case 'x':
            return "translateX(" + sprungValue + unit + ")";
        case 'scale':
            return "scale3d(" + sprungValue + ", " + sprungValue + ", 1)";
        case 'rotate':
            return "rotate(" + sprungValue + "deg)";
        default:
            return prop + "(" + sprungValue + ")";
    }
}
var mapTransformProps = function (sprungFrameTuples, unit) {
    return sprungFrameTuples.reduce(function (transform, _a) {
        var prop = _a[0], spring = _a[1];
        return transform + " " + mapTransformPropToCss(prop, spring, unit);
    }, 'transform:');
};
var mapPropTypes = function (prop, spring, unit) {
    return prop === 'transform'
        ? mapTransformProps(spring, unit) + ";"
        : prop + ": " + spring + ";";
};
var mapToCss = function (spring, unit) {
    return Object.keys(spring).reduce(function (animation, prop) {
        return "" + animation + mapPropTypes(prop, spring[prop], unit);
    }, '');
};
function spring(_a, options) {
    var from = _a.from, to = _a.to;
    var _b = __assign({}, defaults, options), stiffness = _b.stiffness, damping = _b.damping, precision = _b.precision, unit = _b.unit;
    var calcTween = createCalcPropTweenVal(from, to, {
        stiffness: stiffness,
        damping: damping,
        precision: precision,
    });
    var frames = new Array(101).fill('');
    return frames
        .map(function (_, frame) { return [
        Object.keys(from).reduce(function (tween, prop) {
            return reduceFrame(tween, prop, calcTween(prop, frame));
        }, {}),
        frame,
    ]; })
        .map(function (_a) {
        var sprungValues = _a[0], frame = _a[1];
        return [frame + "%", mapToCss(sprungValues, unit)];
    })
        .filter(function (_a, i, frames) {
        var frame = _a[0], spring = _a[1];
        var lastIndex = i - 1 > 0 ? i - 1 : 0;
        return lastIndex > 0 && frame !== '100%'
            ? frames[lastIndex][1] !== spring
            : true;
    })
        .map(function (_a) {
        var frame = _a[0], spring = _a[1];
        return frame + " {" + spring + "}";
    });
}
exports.spring = spring;
function default_1(_a, options) {
    var from = _a.from, to = _a.to;
    return emotion_1.keyframes(spring({ from: from, to: to }, options).join(''));
}
exports.default = default_1;
//# sourceMappingURL=index.js.map