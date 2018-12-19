import React, { Component } from 'react';
import { Paper, TextField, Button, FormGroup } from '@material-ui/core';
import ListItemCompotent from './ListItem';

class Tournament extends Component {
    state = {
        value: '',
        showComponent: false
    }
    onButtonClick = () => {
        this.setState({ showComponent: true })
    }
    updateValue = event => {
        this.setState({ value: event.target.value })
    }
    render() {
        if(this.state.showComponent === true)
        return(<div><ListItemCompotent tournamentName={this.state.value}/></div>)
        else
        return (
            <Paper>
                <FormGroup>
                    <TextField margin="normal" id="filled-name" label="Tournament" variant="standard" type="text" onChange={this.updateValue.bind(this)} value={this.state.value}></TextField>
                    <Button color="default" onClick={this.onButtonClick.bind(this)}>Add Tournament</Button>
                </FormGroup>
            </Paper>
        );
    }
}

export default Tournament;