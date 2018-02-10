"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// copied from https://github.com/acdlite/recompose/blob/de0577682b5f0066378261942305aa7676965b02/src/packages/recompose/utils/omit.js
var omit = function omit(obj, keys) {
  var rest = _objectWithoutProperties(obj, []);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (rest.hasOwnProperty(key)) {
      delete rest[key];
    }
  }
  return rest;
};

// copied from https://github.com/acdlite/recompose/blob/de0577682b5f0066378261942305aa7676965b02/src/packages/recompose/utils/pick.js
var pick = function pick(obj, keys) {
  var result = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Higher-order component that allows debouncing the component update for the
 * specified props. e.g. for use with type-ahead search and a react-apollo query
 */
var withDebouncedProps = function withDebouncedProps(propNames, debounce) {
  return function (BaseComponent) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
      _inherits(ComponentWithDebouncedProps, _React$Component);

      function ComponentWithDebouncedProps(props) {
        _classCallCheck(this, ComponentWithDebouncedProps);

        var _this = _possibleConstructorReturn(this, (ComponentWithDebouncedProps.__proto__ || Object.getPrototypeOf(ComponentWithDebouncedProps)).call(this, props));

        _this.debouncedUpdate = debounce(function (nextProps) {
          _this.setState(pick(nextProps, propNames));
        });

        _this.state = pick(props, propNames);
        return _this;
      }

      _createClass(ComponentWithDebouncedProps, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          this.debouncedUpdate(nextProps);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.debouncedUpdate.cancel();
        }
      }, {
        key: "render",
        value: function render() {
          return _react2.default.createElement(BaseComponent, _extends({}, omit(this.props, propNames), this.state));
        }
      }]);

      return ComponentWithDebouncedProps;
    }(_react2.default.Component), _class.displayName = "withDebouncedProps(" + (BaseComponent.displayName || BaseComponent.name) + ")", _temp;
  };
};

exports.default = withDebouncedProps;