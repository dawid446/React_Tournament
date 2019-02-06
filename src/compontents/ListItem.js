import React, { Component } from 'react';
import { Paper, FormGroup, TextField, Button, Drawer, Fab } from '@material-ui/core';
import Item from './Item';
import { Redirect } from 'react-router'
import AddIcon from '@material-ui/icons/Add';
import {StyledButton} from './Tournament'
import styled from 'styled-components'


const MyTextField = styled(TextField)`
    &hover:{
        &before:{
            borderBottom : red !important
        }
    }

 `
const MyButtonFab = styled(Fab)`
    background-color: #f45a36 !important
    color: white !important;
    margin: 15px
`

const Square = styled.div`

    display: flex;
    flex-direction: column;

 `
const WihiteSquare = styled.div`
    background-color: white;
    min-width: 40vh;
    min-height: 40vh
`
const OnBottom = styled.div`

    display: flex;


 `
const ButtonDiv = styled.div`

 `
 const StyledButton1 = styled(Button)`
 background-color: #f45a36 !important;
 color: white;
 width: 100%;


`

class ListItemCompotent extends Component {

    state = {
        team: [],
        isLoaded: false,
        value: '',
        tournamentValue: this.props.tournamentName,
        tournament: []
    }

    removeItem = (id) => {
        this.setState(prevState =>
            ({
                team: prevState.team.filter(el => el !== id)
            })
        )
    }
    updateValueTournament = event => {
        this.setState({ tournamentValue: event.target.value })
    }
    updateValue = event => {
        this.setState({ value: event.target.value })
    }
    addToList = () => {

        let str = this.state.value.replace(/ /g, '');
        if (str != "") {
            const lista = this.state.team

            lista.push({ TeamName: this.state.value })
            this.setState({ team: lista })
            this.setState({ value: '' })
        }


    }

    handleSumbit() {
        let tablica = this.state.team;
        tablica.push({ TeamName: this.state.tournamentValue });

        const options = {
            method: 'POST',
            body: JSON.stringify(tablica),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('https://localhost:44346/api/Tournaments', options)
            .then(response => {
                response.json().then(data => {
                    console.log(data)
                    let url = '/tournament_matches/' + data.tournamentID
                    this.setState({ isLoaded: true, tournament: url })
                    // window.location.replace(url + "/main/subbed");
                })
            })
    }

    render() {
        return (
            <div>
                <Square>

                    <MyTextField margin="normal" id="filled" label="Tournament" variant="standard" type="text" onChange={this.updateValueTournament.bind(this)} value={this.state.tournamentValue} ></MyTextField>

                    <Drawer />
                    <WihiteSquare>
                        <Item delete={this.removeItem} data={this.state.team} />
                    </WihiteSquare>

                </Square>

                <OnBottom>
                    <TextField fullWidth id="filled-name" label="Team" variant="outlined" type='text' onChange={this.updateValue.bind(this)} value={this.state.value}></TextField>



                    <MyButtonFab onClick={this.addToList.bind(this)}>
                        <AddIcon />
                    </MyButtonFab>

                </OnBottom>


                <StyledButton1 color="default" onClick={this.handleSumbit.bind(this)}>Wyślij na serwer</StyledButton1>

                {this.state.isLoaded ? <Redirect to={this.state.tournament} /> : null}
            </div>

        );
    }
}

export default ListItemCompotent;