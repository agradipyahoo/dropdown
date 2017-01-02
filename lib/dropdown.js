"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DropDownItem = exports.ClickItemContent = exports.SummaryView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./dropdown.css");

var _reactStarterComponents = require("react-starter-components");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _selectionManager = require("selection-manager");

var _selectionManager2 = _interopRequireDefault(_selectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonComponent = _reactStarterComponents.components.common;
var SelectableList = CommonComponent.SelectableList,
    SelectableItem = CommonComponent.SelectableItem,
    InlinePopupGroup = CommonComponent.InlinePopupGroup;
var InlinePopup = InlinePopupGroup.InlinePopup,
    InlineButton = InlinePopupGroup.InlineButton,
    InlineBody = InlinePopupGroup.InlineBody;

/**
 * @class
 * @classdesc Summary View of drop down selection
 */

var SummaryView = exports.SummaryView = function (_Component) {
    _inherits(SummaryView, _Component);

    function SummaryView(props) {
        _classCallCheck(this, SummaryView);

        var _this = _possibleConstructorReturn(this, (SummaryView.__proto__ || Object.getPrototypeOf(SummaryView)).call(this, props));

        _this.clearSelection = function (e) {
            e.preventDefault();
            _this.selectionManager.clear();
        };

        var selectionManager = props.selectionManager,
            items = props.items,
            showClearSelection = props.showClearSelection,
            localeStrings = props.localeStrings,
            popupProps = _objectWithoutProperties(props, ["selectionManager", "items", "showClearSelection", "localeStrings"]);

        _this.popupProps = popupProps;
        _this.selectionManager = selectionManager;
        _this.showClearSelection = showClearSelection;
        _this.items = items;
        _this.localeStrings = localeStrings;

        return _this;
    }

    _createClass(SummaryView, [{
        key: "getSummary",
        value: function getSummary() {
            var selectionManager = this.selectionManager;
            var items = this.items;
            var selected = selectionManager.getSelected();
            var summary = void 0;
            var defaultStrings = {
                optionsSelected: 'Selected',
                noOptionsSelected: 'No Selection',
                noOptions: 'No Records',
                allSelected: 'All Selected'
            };

            var localeStrings = this.localeStrings;
            localeStrings = _extends({}, defaultStrings, { localeStrings: localeStrings });
            if (selected) {
                if (selectionManager._multiSelect) {
                    var isAllSelected = selected.length === items.length;
                    if (isAllSelected) {
                        summary = localeStrings.allSelected;
                    } else {
                        summary = selected.length + ' ' + localeStrings.optionsSelected;
                    }
                } else {
                    summary = selected.name;
                }
            } else {
                if (items.length === 0) {
                    summary = localeStrings.noOptions;
                } else {
                    summary = localeStrings.noOptionsSelected;
                }
            }

            return summary;
        }
    }, {
        key: "isSelected",
        value: function isSelected() {
            return this.selectionManager.getSelected();
        }
    }, {
        key: "render",
        value: function render() {
            var summary = this.getSummary();
            return _react2.default.createElement(
                "div",
                _extends({ className: "drop-down-summary" }, this.popupProps),
                summary,
                " ",
                this.showClearSelection && this.isSelected() && _react2.default.createElement(
                    "a",
                    { href: "#clear", onClick: this.clearSelection },
                    _react2.default.createElement("i", { className: "close" })
                )
            );
        }
    }]);

    return SummaryView;
}(_react.Component);

SummaryView.propTypes = {
    selectionManager: _react.PropTypes.object.isRequired,
    items: _react.PropTypes.array.isRequired,
    localeStrings: _react.PropTypes.object
};

/**
 *
 * @param props
 * @returns {ReactDOM}
 * @constructor
 */
var SearchContainer = function SearchContainer(props) {
    return _react2.default.createElement(
        "div",
        { className: "drop-down-body" },
        _react2.default.createElement(
            "div",
            { className: "search-box-container" },
            _react2.default.createElement("input", { type: "text", className: "search-box", value: props.searchText, onChange: props.onChange }),
            props.children
        )
    );
};

/**
 *
 * @param props
 * @returns {ReactDom}
 * @constructor
 */
var ClickItemContent = exports.ClickItemContent = function ClickItemContent(props) {
    return _react2.default.createElement(
        "a",
        { href: "#select", onClick: props.onClick },
        _react2.default.createElement("i", { className: "action" }),
        props.name
    );
};

/**
 * @class
 * @classdesc Dropdown Item
 */

var DropDownItem = exports.DropDownItem = function (_SelectableItem) {
    _inherits(DropDownItem, _SelectableItem);

    function DropDownItem() {
        _classCallCheck(this, DropDownItem);

        return _possibleConstructorReturn(this, (DropDownItem.__proto__ || Object.getPrototypeOf(DropDownItem)).apply(this, arguments));
    }

    _createClass(DropDownItem, [{
        key: "renderContent",
        value: function renderContent() {
            var itemData = this.props.itemData;
            var ContainerTag = this.props.tagName;
            var ClickItemContentTag = this.props.ClickItemContentTag || ClickItemContent;
            var tagProps = this.getTagProps();
            return _react2.default.createElement(
                ContainerTag,
                tagProps,
                _react2.default.createElement(ClickItemContentTag, { onClick: this.selectItem.bind(this), name: itemData.name })
            );
        }
    }]);

    return DropDownItem;
}(SelectableItem);

/**
 * @class DropDown
 * @extends Component
 */


var DropDown = function (_Component2) {
    _inherits(DropDown, _Component2);

    function DropDown(props) {
        _classCallCheck(this, DropDown);

        var _this3 = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

        _this3.onChange = _this3.onChange.bind(_this3);
        var _props$items = props.items,
            items = _props$items === undefined ? [] : _props$items,
            _props$multiSelect = props.multiSelect,
            multiSelect = _props$multiSelect === undefined ? false : _props$multiSelect,
            _props$selectionManag = props.selectionManager,
            selectionManager = _props$selectionManag === undefined ? new _selectionManager2.default({ multiSelect: multiSelect }) : _props$selectionManag,
            _props$selectedItems = props.selectedItems,
            selectedItems = _props$selectedItems === undefined ? [] : _props$selectedItems;


        selectedItems.forEach(function (v) {
            selectionManager.select(v);
        });

        selectionManager.on('change', function (selected, prevSelected) {
            console.log(selected);
        });
        _this3.multiSelect = multiSelect;
        _this3.selectionManager = selectionManager;
        _this3.items = items;
        _this3.state = {
            items: items,
            searchText: '',
            selected: selectionManager.getSelected()
        };
        return _this3;
    }

    _createClass(DropDown, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var selectionManager = this.selectionManager;
            var self = this;
            if (selectionManager) {
                this.unsubscribeSelection = selectionManager.on('change', function (selection, prevSelection) {
                    self.setState({
                        selected: selection
                    });
                });
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.unsubscribeSelection) {
                this.unsubscribeSelection();
            }
        }
    }, {
        key: "onChange",
        value: function onChange(e) {
            e.preventDefault();
            var searchText = e.currentTarget.value;
            var items = this.filterItems(searchText);
            this.setState({ searchText: e.currentTarget.value, items: items });
        }
    }, {
        key: "filterItems",
        value: function filterItems(searchText) {
            var items = this.items.filter(function (v) {
                return ~v.name.indexOf(searchText);
            });
            return items;
        }
    }, {
        key: "render",
        value: function render() {
            var items = this.state.items;
            var _props = this.props,
                _props$ListItem = _props.ListItem,
                ListItem = _props$ListItem === undefined ? DropDownItem : _props$ListItem,
                _props$localeStrings = _props.localeStrings,
                localeStrings = _props$localeStrings === undefined ? {} : _props$localeStrings,
                _props$noDataMessage = _props.noDataMessage,
                noDataMessage = _props$noDataMessage === undefined ? '' : _props$noDataMessage,
                _props$showSearch = _props.showSearch,
                showSearch = _props$showSearch === undefined ? false : _props$showSearch,
                _props$showClearSelec = _props.showClearSelection,
                showClearSelection = _props$showClearSelec === undefined ? false : _props$showClearSelec;

            var listClassName = this.multiSelect ? 'multi-select-list' : 'single-select-list';
            var configs = {
                ListItem: ListItem,
                items: items,
                selectionManager: this.selectionManager,
                className: 'item-list ' + listClassName,
                noDataMessage: 'No record found'
            };

            //'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName'
            if (showSearch) {
                return _react2.default.createElement(
                    "div",
                    { className: "drop-down" },
                    _react2.default.createElement(
                        InlinePopup,
                        null,
                        _react2.default.createElement(
                            InlineButton,
                            null,
                            _react2.default.createElement(SummaryView, { localeStrings: localeStrings, selectionManager: this.selectionManager, items: configs.items, showClearSelection: showClearSelection })
                        ),
                        _react2.default.createElement(
                            InlineBody,
                            null,
                            _react2.default.createElement(
                                SearchContainer,
                                { searchText: this.state.searchText, onChange: this.onChange },
                                _react2.default.createElement(SelectableList, configs)
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    { className: "drop-down" },
                    _react2.default.createElement(
                        InlinePopup,
                        null,
                        _react2.default.createElement(
                            InlineButton,
                            null,
                            _react2.default.createElement(SummaryView, { localeStrings: localeStrings, selectionManager: this.selectionManager, items: configs.items })
                        ),
                        _react2.default.createElement(
                            InlineBody,
                            null,
                            _react2.default.createElement(SelectableList, configs)
                        )
                    )
                );
            }
        }
    }]);

    return DropDown;
}(_react.Component);

/**
 * @type {{items: *, ListItem: *, localeStrings: *, noDataMessage: *, showsearch: (boolean|*), multiSelect: (boolean|*), showClearSelection: (boolean|*), selectionManager: *}}
 */


exports.default = DropDown;
DropDown.propTypes = {
    items: _react.PropTypes.array.isRequired,
    ListItem: _react.PropTypes.object,
    localeStrings: _react.PropTypes.object,
    noDataMessage: _react.PropTypes.string,
    showsearch: _react.PropTypes.bool,
    multiSelect: _react.PropTypes.bool,
    showClearSelection: _react.PropTypes.bool,
    selectedItems: _react.PropTypes.array,
    selectionManager: _react.PropTypes.object
};