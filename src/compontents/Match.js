import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';


class Match extends Component {
    state = {
        tournament: '',
        match: [],
        isLoaded: false
    }

    componentDidMount = () => {
        const id = this.props.match.params.iteamId;

        var urlTournament = 'https://localhost:44346/api/Tournaments/' + id
        var urlMatch = `https://localhost:44346/api/matches/` + id

        fetch(urlTournament)
            .then(response => response.json())
            .then(json => this.setState({ tournament: json }))

        fetch(urlMatch)
            .then(response => response.json())
            .then(json => this.setState({ match: json, isLoaded: true }))
    }
    render() {
        if (this.state.isLoaded !== true) {
            return(
            <div>
            <CircularProgress color="secondary"></CircularProgress>
            </div>)
        }else
        return (
            <Paper>
                <Typography variant="h6" id="tableTitle">
                    {this.state.tournament.tournamentName}

                </Typography>
                <Table >

                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa drużyny</TableCell>
                            <TableCell align="center"> Wynik </TableCell>
                            <TableCell >Nazwa drużyny</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.match.map(row => {
                            return (
                                <TableRow key={row.matchID}>
                                    <TableCell align="center">{row.teamName}</TableCell>
                                    <TableCell algin="center">
                                        <Formik
                                            initialValues={{ ...row }}
                                            onSubmit={(values) => { console.log('submitted', values)
                                            let url = 'https://localhost:44346/api/matches/' + values.matchID
                                            const options = {
                                                method: 'PUT',
                                                body: JSON.stringify(values),
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            }
                                            fetch(url, options)
                                                .then(response => {
                                                    response.json().then(data => {
                                                        console.log(data)
                                                    })
                                                })
                                        }}

                                            render={({
                                                values,
                                                errors,
                                                touched,
                                                handleBlur,
                                                handleChange,
                                                handleSubmit,
                                                isSumbitting
                                            }) => (

                                                    <form onSubmit={handleSubmit}>
                                                        <input
                                                            name='score'
                                                            onChange={handleChange}
                                                            value={values.score}
                                                        ></input>

                                                        <input
                                                            name='score1'
                                                            onChange={handleChange}
                                                            value={values.score1}
                                                        ></input>
                                                        <Button type='submit'>Zapisz</Button>
                                                    </form>

                                                )}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{row.teamName1}</TableCell>
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