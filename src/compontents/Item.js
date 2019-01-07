import React, { Component } from 'react';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components'

const IconDelete = styled(DeleteIcon)`
color: #f45a36`
class Item extends Component {

    delete(id){
        this.props.delete(id)
    }

    render() {
        return (
            <List>
                {this.props.data.map((dates, i) =>
                    <ListItem key={i}>
                        <ListItemText primary={dates.TeamName} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={this.delete.bind(this,dates)}>
                                <IconDelete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
        );
    }
}

export default Item;