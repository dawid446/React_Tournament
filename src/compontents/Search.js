import React, { Component } from 'react';
import { ListItem, List, ListItemText, TextField, Button, Paper, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const MyButtonColor = styled(Button)`
    background-color: #282c34 !important
    margin-right: 15px !important
`

const SquareForText = styled.div`
    height: 80px;
    width: 400px;
    margin: 0 auto;
    background: #f45a36;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

`
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
                    <SquareForText>
                    <TextField style={{margin: 15}} fullWidth type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} label="Search" ></TextField>
                        <MyButtonColor color="primary" variant="contained" size="medium">Search</MyButtonColor>
                    </SquareForText>
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