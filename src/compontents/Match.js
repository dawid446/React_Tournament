import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, CircularProgress, TextField, Fab } from '@material-ui/core';
import { Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';

const czcionka = {
    color: 'white',
  };
class Match extends Component {
    state = {
        tournament: '',
        match: [],
        isLoaded: false
    }


   statystyka = () =>
       this.state.match.forEach(key => {
           console.log(key.teamName)
           console.log(key.teamName1)
       })


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
            <div>
            <Typography style={czcionka} component="h2" variant="h1">
                    {this.state.tournament.tournamentName}
                    <Button onClick={this.statystyka.bind(this)}>nacisnij</Button>

                </Typography>
            <Paper>
                <Table>
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
                                                        <TextField
                                                            name='score'
                                                            onChange={handleChange}
                                                            value={values.score}
                                                            variant="outlined"
                                                            margin="normal"
                                                        ></TextField>

                                                        <TextField
                                                            name='score1'
                                                            onChange={handleChange}
                                                            value={values.score1}
                                                            variant="outlined"
                                                            margin="normal"
                                                        ></TextField>
                                                        <Fab type='submit' color="primary">
                                                        <AddIcon/>
                                                        </Fab>
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
            </div>
        );
    }
}

export default Match;