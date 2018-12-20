import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';


class Match extends Component {
    state = {
        tournament: '',
        match: []
    }

    componentDidMount = () => {
        const id = this.props.match.params.iteamId;

        var urlTournament = 'https://localhost:44346/api/Tournaments/'+id
        var urlMatch = `https://localhost:44346/api/matches/`+id

        fetch(urlTournament)
            .then(response => response.json())
            .then(json => this.setState({ tournament: json }))

        fetch(urlMatch)
            .then(response => response.json())
            .then(json => this.setState({ match: json }))
    }
    render() {
        return (
            <Paper>
                <Typography variant="h6" id="tableTitle">
                        {this.state.tournament.tournamentName}

                    </Typography>
                <Table >

                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa drużyny</TableCell>
                            <TableCell> Wynik </TableCell>
                            <TableCell >Wynik</TableCell>
                            <TableCell >Nazwa drużyny</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.match.map(row => {
                            return (
                                <TableRow key={row.matchID}>
                                    <TableCell align="right">{row.teamName}</TableCell>
                                    <TableCell align="right">{row.score}</TableCell>
                                    <TableCell align="right">{row.score1}</TableCell>
                                    <TableCell align="right">{row.teamName1}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Match;