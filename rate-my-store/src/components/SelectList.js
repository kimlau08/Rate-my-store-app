import React, {Component} from 'react';

import '../App.css';

export default class SelectList extends Component{
    constructor(props){
        super(props)
    }

    //On change, pass selected value to parent
    handleChange = (event) =>
    {
        let selectedValue = event.target.value;
        this.props.handleSelectCallback(selectedValue);
    }


    render(){
        let itemArray = this.props.itemList;
        let selectListId = this.props.selectListId;

        let optionList = itemArray.map((item) =>
                <option  key={item.id}  value={item.id} >
                    {`${item.name}, ${item.city}, ${item.st_zip}`}
                </option>
            );

            return (
            <select className="select-item-list" onChange={this.handleChange}>
                <option>Select Item</option>
                {optionList}
           </select>
        )
    }
}

