import React, { Component } from 'react';
import { ListItem, List, ListItemText } from '@material-ui/core';

class Item extends Component {
    state = {  }
    render() {
        return (

            <List>
                {this.props.data.map(dates =>
                <ListItem>
                    <ListItemText primary={dates.TeamName}></ListItemText>
                </ListItem>
                )}
            </List>
        );
    }
}

export default Item;