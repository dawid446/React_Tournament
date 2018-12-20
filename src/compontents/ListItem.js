import React, { Component } from 'react';
import { Paper, FormGroup, TextField, Button } from '@material-ui/core';
import Item from './Item';
import { Redirect } from 'react-router'





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
        const lista = this.state.team

        lista.push({TeamName: this.state.value })
        this.setState({ team: lista })
        this.setState({ value: '' })

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

                <FormGroup>
                    <TextField margin="normal" id="filled" label="Tournament" variant="standard" type="text" onChange={this.updateValueTournament.bind(this)} value={this.state.tournamentValue} ></TextField>
                </FormGroup>
                <Paper>
                    <Item delete={this.removeItem} data={this.state.team} />
                    <FormGroup>
                        <TextField margin="normal" id="filled-name" label="Team" variant="outlined" type='text' onChange={this.updateValue.bind(this)} value={this.state.value}></TextField>
                        <Button color="default" onClick={this.addToList.bind(this)}>Dodaj drużynę</Button>

                        <Button color="default" onClick={this.handleSumbit.bind(this)}>Wyślij na serwer</Button>
                    </FormGroup>
                    {this.state.isLoaded ? <Redirect to={this.state.tournament} /> : null}
                </Paper>

            </div>


        );
    }
}

export default ListItemCompotent;