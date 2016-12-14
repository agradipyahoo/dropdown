import {core, components} from "react-starter-components";
import React, {Component} from 'react';
import Selection from "selection-manager";
const {common:CommonComponent} = components;
const {SelectableList, SelectableItem, InlinePopupGroup} = CommonComponent;
const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup;

class SummaryView extends Component {
    constructor(props) {
        super(props);
        let {selectionManager} = props;
        this.state = {
            selected: selectionManager.getSelected()
        }

    }

    componentDidMount() {
        let selectionManager = this.props.selectionManager;
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

    getSummary() {
        let {selectionManager,items} = this.props;
        let selected = selectionManager.getSelected();
        let summary;
        let defaultStrings = {
            optionsSelected: 'options.selected',
            noOptionsSelected: 'no.options.selected',
            noOptions: 'no.options',
            allSelected: 'all.options.selected'
        };

        let strings = this.props.strings;
        strings = {...defaultStrings, strings};

        if (selected) {
            if (selectionManager._multiSelect) {
                let isAllSelected = selected.length === items.length;
                if (isAllSelected) {
                    summary = strings.allSelected;
                } else {
                    summary = selected.length + ' ' + strings.optionsSelected;
                }
            }
            else {
                summary = selected.name;
            }
        }
        else {
            if (items.length === 0) {
                summary = strings.noOptions;
            } else {
                summary = strings.noOptionsSelected;
            }
        }

        return summary;
    }

    render() {
        var summary = this.getSummary();
        return <div className="drop-down-summary" style={{"border":"1px solid #eee","padding":"10px"}} {...this.props}>
            {summary}
        </div>
    }

}

const DropDown = () => {
    var singleSelect = new Selection();
    singleSelect.on('change', function (selected, prevSelected) {
        console.log(selected);
    })
    singleSelect.select({id: 1, name: 'name1'})


    var multiSelect = new Selection({multiSelect: true});

    multiSelect.on('change', function (selected, prevSelected) {
        console.log(selected);
    })


    //multiSelect.select({id:1, name:'name1'})
    //multiSelect.select({id:2, name:'name2'})
    //getconfig from props as parent composablity.

    const configs = {
        ListItem: SelectableItem,
        items: [
            {id: 1, name: 'name1'},
            {id: 2, name: 'name2'}
        ],
        selectionManager: singleSelect,
        className: 'drop-down-body',
        noDataMessage: 'No record found'
    }
    //'className', 'style', 'tagName', 'noDataMessage', 'ListItem', 'itemClassName', 'itemTagName'
    return <InlinePopup>
        <InlineButton><SummaryView {...configs}/></InlineButton>
        <InlineBody><SelectableList {...configs}/></InlineBody>
    </InlinePopup>
}


// add childContext Type to pass everything to both of components from parent.

export default DropDown;