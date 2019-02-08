import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, CircularProgress, TextField, Fab } from '@material-ui/core';
import { Formik } from 'formik';
import AddIcon from '@material-ui/icons/Done';
import styled from 'styled-components'
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbar from './MySnackbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const MyButtonFab = styled(Fab)`
    margin-top: 15px !important
    margin-left: 15px !important
    background-color: #f45a36 !important
`
const Header = styled.div`
    height: 80px;
    width: 900px;
    background: #f45a36;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color white;
`
class Match extends Component {
    state = {
        tournament: '',
        match: [],
        isLoaded: false,
        isPut: null,
        statistic: []
    }


    statystyka = () => {
        const { match, statistic } = this.state;

        match.forEach(v => {
            if (v.isBreak === false) {
                statistic.push({ teamName: v.teamName })
                statistic.push({ teamName: v.teamName1 })
            }
        })
        match.forEach(key => {

            if (key.isBreak === false) {



                if (key.score > key.score1) {


                }
                if (key.score === key.score1) {

                }

            }
        })
        let a = statistic.find(v => v.teamName === "Dawid");
        a.win = 1;
        a.lose = 2
        console.log();

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
            return (
                <div>
                    <CircularProgress color="secondary"></CircularProgress>
                </div>)
        } else
            return (
                <div>
                    <Button onClick={this.statystyka.bind(this)}>nacisnij</Button>
                    <Header>
                        {this.state.tournament.tournamentName}

                    </Header>
                    <Paper>
                        <AppBar position="static">
                            <Tabs
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Wyniki" />
                                <Tab label="Statiscic" />

                            </Tabs>
                        </AppBar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Team name</TableCell>
                                    <TableCell align="center"> Score </TableCell>
                                    <TableCell >Team name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.match.map(row => {
                                    return (

                                        <TableRow key={row.matchID}>
                                            <TableCell align="center">{row.teamName === "przerwa" ? "" : row.teamName}</TableCell>
                                            <TableCell algin="center">
                                                <Formik
                                                    initialValues={{ ...row }}
                                                    onSubmit={(values) => {
                                                        let url = 'https://localhost:44346/api/matches/' + values.matchID
                                                        const options = {
                                                            method: 'PUT',
                                                            credentials: 'include',
                                                            body: JSON.stringify(values),
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            }
                                                        }
                                                        fetch(url, options)
                                                            .then(response => {
                                                                if (response.status === 400) {
                                                                    response.json();
                                                                }
                                                                else {
                                                                    throw new Error('Something went wrong...');
                                                                }
                                                            })
                                                            .then(data => data.json())
                                                            .catch(isPut => this.setState({ isPut: true }));
                                                        alert("OK");
                                                    }

                                                    }
                                                    validate={(values) => {
                                                        let errors = {}
                                                        var numbers = /^[0-9]+$/;

                                                        if (numbers.match(values.score)) {
                                                            errors.score = "Only Numbers"
                                                        }
                                                        // if(values.score1.exec(numbers))

                                                        // {
                                                        //     errors.score1 = "Only Numbers"
                                                        // }

                                                        return errors
                                                    }

                                                    }
                                                    render={({
                                                        values,
                                                        errors,
                                                        touched,
                                                        handleBlur,
                                                        handleChange,
                                                        handleSubmit,

                                                    }) => (

                                                            <form onSubmit={handleSubmit}>

                                                                <TextField
                                                                    error={errors.score}
                                                                    label={errors.score}
                                                                    name='score'
                                                                    onChange={handleChange}
                                                                    value={values.score}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    disabled={values.isBreak ? true : false}


                                                                ></TextField>


                                                                <TextField
                                                                    error={errors.score1}
                                                                    label={errors.score1}
                                                                    name='score1'
                                                                    onChange={handleChange}
                                                                    value={values.score1}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    disabled={values.isBreak ? true : false}
                                                                ></TextField>

                                                                <MyButtonFab disabled={values.isBreak ? true : false} type='submit' color="primary">
                                                                    <AddIcon />
                                                                </MyButtonFab>
                                                            </form>

                                                        )}
                                                />

                                            </TableCell>
                                            <TableCell align="center">{row.teamName1 === "przerwa" ? "" : row.teamName1}</TableCell>

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