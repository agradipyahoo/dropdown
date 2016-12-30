import "./dropdown.css";
import {core, components} from "react-starter-components";
import React, {PropTypes, Component} from "react";
import Selection from "selection-manager";
const {common:CommonComponent} = components;
const {SelectableList, SelectableItem, InlinePopupGroup} = CommonComponent;
const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup;

/**
 * @class
 * @classdesc Summary View of drop down selection
 */
export class SummaryView extends Component {
    constructor(props) {
        super(props);
        const { selectionManager,items,showClearSelection,localeStrings, ...popupProps } = props;
        this.popupProps = popupProps;
        this.selectionManager = selectionManager;
        this.showClearSelection = showClearSelection;
        this.items = items;
        this.localeStrings = localeStrings;

    }
    clearSelection =(e)=>{
        e.preventDefault();
        this.selectionManager.clear();
    }
    getSummary() {
        let selectionManager = this.selectionManager;
        let items = this.items;
        let selected = selectionManager.getSelected();
        let summary;
        let defaultStrings = {
            optionsSelected: 'Selected',
            noOptionsSelected: 'No Selection',
            noOptions: 'No Records',
            allSelected: 'All Selected'
        };

        let localeStrings = this.localeStrings;
        localeStrings = {...defaultStrings, localeStrings};
        if (selected) {
            if (selectionManager._multiSelect) {
                let isAllSelected = selected.length === items.length;
                if (isAllSelected) {
                    summary = localeStrings.allSelected;
                } else {
                    summary = selected.length + ' ' + localeStrings.optionsSelected;
                }
            }
            else {
                summary = selected.name;
            }
        }
        else {
            if (items.length === 0) {
                summary = localeStrings.noOptions;
            } else {
                summary = localeStrings.noOptionsSelected;
            }
        }

        return summary;
    }

    isSelected(){
        return this.selectionManager.getSelected();
    }

    render() {
        let summary = this.getSummary();
        return <div className="drop-down-summary"  {...this.popupProps}>
            {summary} {this.showClearSelection && this.isSelected() && <a href="#clear" onClick={this.clearSelection}><i className="close"></i></a>}
        </div>
    }

}

SummaryView.propTypes = {
    selectionManager: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    localeStrings:PropTypes.object
}

/**
 *
 * @param props
 * @returns {ReactDOM}
 * @constructor
 */
const SearchContainer =(props) => {
    return <div className="drop-down-body"><div className="search-box-container"><input type="text" className="search-box" value={props.searchText} onChange={props.onChange} />{props.children}</div></div>
}

/**
 *
 * @param props
 * @returns {ReactDom}
 * @constructor
 */
export const ClickItemContent = (props) => {
    return <a href="#select" onClick={props.onClick}><i className="action"></i>{props.name}</a>
}

/**
 * @class
 * @classdesc Dropdown Item
 */
export class DropDownItem extends SelectableItem {
    renderContent() {
        var itemData = this.props.itemData;
        var ContainerTag = this.props.tagName
        var ClickItemContentTag = this.props.ClickItemContentTag || ClickItemContent;
        var tagProps = this.getTagProps();
        return (<ContainerTag {...tagProps} >
            <ClickItemContentTag onClick={this.selectItem.bind(this)} name={itemData.name}/>
        </ContainerTag>);
    }
}

/**
 * @class DropDown
 * @extends Component
 */
export default class DropDown extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        let {items: items = [],multiSelect: multiSelect = false,
            selectionManager:selectionManager = new Selection({multiSelect:multiSelect}),selectedItems:selectedItems=[]} = props;

        selectedItems.forEach(function(v){
            selectionManager.select(v);
        });
        
        selectionManager.on('change', function (selected, prevSelected) {
            console.log(selected);
        });
        this.multiSelect = multiSelect;
        this.selectionManager = selectionManager;
        this.items = items;
        this.state= {
            items:items,
            searchText:'',
            selected:selectionManager.getSelected()
        };
    }

    componentDidMount() {
        let selectionManager = this.selectionManager;
        let self = this;
        if (selectionManager) {
            this.unsubscribeSelection = selectionManager.on('change', function (selection, prevSelection) {
                self.setState({
                    selected: selection
                });
            })
        }
    }

    componentWillUnmount() {
        if (this.unsubscribeSelection) {
            this.unsubscribeSelection();
        }
    }

    onChange(e){
        e.preventDefault();
        let searchText = e.currentTarget.value;
        let items = this.filterItems(searchText);
        this.setState({searchText:e.currentTarget.value,items:items});
    }

    filterItems(searchText){
        let items = this.items.filter(function(v){
            return ~v.name.indexOf(searchText);
        });
        return items;
    }
    render(){
        const items = this.state.items;
        let {ListItem: ListItem = DropDownItem,
            localeStrings: localeStrings = {},
            noDataMessage: noDataMessage = '',
            showSearch: showSearch = false,
            showClearSelection:showClearSelection = false} = this.props;
        let listClassName = this.multiSelect ? 'multi-select-list' : 'single-select-list';
        const configs = {
            ListItem: ListItem,
            items: items,
            selectionManager: this.selectionManager,
            className: 'item-list ' + listClassName,
            noDataMessage: 'No record found'
        }

        //'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName'
        if(showSearch){
            return <div className="drop-down"><InlinePopup>
                <InlineButton><SummaryView localeStrings={localeStrings} selectionManager={this.selectionManager} items={configs.items} showClearSelection={showClearSelection}/></InlineButton>
                <InlineBody><SearchContainer searchText={this.state.searchText} onChange={this.onChange}><SelectableList {...configs}/></SearchContainer></InlineBody>
            </InlinePopup></div>
        }
        else{
            return <div className="drop-down">
                    <InlinePopup>
                        <InlineButton><SummaryView localeStrings={localeStrings} selectionManager={this.selectionManager} items={configs.items}/></InlineButton>
                        <InlineBody><SelectableList {...configs}/></InlineBody>
                    </InlinePopup>
                </div>;
        }

    }
}

/**
 * @type {{items: *, ListItem: *, localeStrings: *, noDataMessage: *, showsearch: (boolean|*), multiSelect: (boolean|*), showClearSelection: (boolean|*), selectionManager: *}}
 */
DropDown.propTypes = {
    items:PropTypes.array.isRequired,
    ListItem:PropTypes.object,
    localeStrings:PropTypes.object,
    noDataMessage:PropTypes.string,
    showsearch:PropTypes.bool,
    multiSelect:PropTypes.bool,
    showClearSelection:PropTypes.bool,
    selectedItems:PropTypes.array,
    selectionManager: PropTypes.object
}
