# dropdown
React Dropdown component

Basic useful feature list:

 * Supporting Single select dropdown
 * Supporting Multi Select dropdown
 * Show Dropdown summary
 * Pre Select dropdown
 * Allowing Search option in dropdown
 * Show clear options
 * TODO:Unit test cases.



 Basic usage

 ```javascript
    import DropDown from "dropdown";
    import React, {PropTypes, Component} from "react";
    import ReactDOM from 'react-dom';
    let app = document.getElementById('app');
    const  items = [] ;let i=1 ,item;
        while(i <1000){
            items.push({id:i,name:'item '+i});
            i++;
        }

        let selectedItems =[];
        selectedItems.push({id:1,name:'item' + 1});
        selectedItems.push({id:2,name:'item' + 2});


    ReactDOM.render(<DropDown showSearch={true} selectedItems={selectedItems} items={items} multiSelect={true}></DropDown>,app)

 ```

Advanced  Supported Option.
```javascript
    * items:PropTypes.array.isRequired,
    * ListItem:PropTypes.object,
    * localeStrings:PropTypes.object,
    * noDataMessage:PropTypes.string,
    * showsearch:PropTypes.bool,
    * selectedItems:PropTypes.array,
    * multiSelect:PropTypes.bool,
    * showClearSelection:PropTypes.bool,
    * selectionManager: PropTypes.object
```
* [Dropdown Sample Example](https://agradipyahoo.github.io/#/advertiser/create)
* Repo:[repo](https://github.com/agradipyahoo/react-mvc)
