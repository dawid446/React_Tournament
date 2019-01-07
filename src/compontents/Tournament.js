import React, { Component } from 'react';
import { Paper, TextField, Button, FormGroup } from '@material-ui/core';
import ListItemCompotent from './ListItem';
import styled from 'styled-components'

const StyledButton = styled(Button)`
  background: #f45a36 !important;
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  width:300px
  padding: 0 30px;
`
const MytText = styled(TextField)`
    width: 300px;

`
const Square = styled.div`
    height: 150px;
    width: 300px;
    border-radius: 5px;
    background: white
    position: relative;
`
const InSquare = styled.div`

    position: absolute;
    bottom: 0;
    left: 0;

`



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
            <Square>

                    <MytText margin="normal" id="filled-name" label="Tournament" variant="standard" type="text" onChange={this.updateValue.bind(this)} value={this.state.value}></MytText>

                    <InSquare>
                    <StyledButton color="default" onClick={this.onButtonClick.bind(this)}>Add Tournament</StyledButton>
                    </InSquare>

            </Square>
        );
    }
}

export default Tournament;