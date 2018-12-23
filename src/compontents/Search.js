import React, { Component } from 'react';
import { ListItem, List, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button, Paper, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom'

class Search extends Component {
    state = {
        tournament: [],
        search: '',
        isLoaded: false
    }
    componentDidMount = () => {
        fetch("https://localhost:44346/api/Tournaments/")
            .then(response => response.json())
            .then(json => this.setState({ tournament: json, isLoaded: true }))
    }
    updateSearch = (event) => {
        this.setState({ search: event.target.value })
    }
    render() {
        if (this.state.isLoaded !== true) {
            return (
                <div>
                    <CircularProgress color="secondary"></CircularProgress>
                </div>

            );
        } else {
            let filtredTournament = this.state.tournament.filter(
                (tournaments) => {
                    return tournaments.tournamentName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                }
            );
            return (
                <div>
                    <Paper>
                        <TextField type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}></TextField>
                        <Button color="primary" variant="contained">Szukaj</Button>
                    </Paper>

                    <Paper>
                        <List>
                            {filtredTournament.map((item, i) =>
                                <ListItem key={i} component={Link} to={`/tournament_matches/${item.tournamentID}`} button>
                                    <ListItemText primary={item.tournamentName}>
                                    </ListItemText>
                                </ListItem>
                            )}
                        </List>
                    </Paper>

                </div>
            );

        }
    }
}

export default Search;