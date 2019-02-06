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
        isPut: null
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
                                                    onSubmit={(values) => {
                                                        let url = 'https://localhost:44346/api/matches/' + values.matchID
                                                        const options = {
                                                            method: 'PUT',
                                                            body: JSON.stringify(values),
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            }
                                                        }
                                                        fetch(url, options)
                                                            .then(response=> {
                                                                if (response.ok)
                                                                {
                                                                    response.json();
                                                                }
                                                                else{
                                                                    throw new Error('Something went wrong...');
                                                                }
                                                            })
                                                            .then(data => data.json())
                                                            .catch(isPut=> this.setState(isPut));
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
                                                    isSumbitting
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
                                                            ></TextField>


                                                            <TextField
                                                                error={errors.score1}
                                                                label={errors.score1}
                                                                name='score1'
                                                                onChange={handleChange}
                                                                value={values.score1}
                                                                variant="outlined"
                                                                margin="normal"
                                                            ></TextField>

                                                            <MyButtonFab type='submit' color="primary">
                                                                <AddIcon />
                                                            </MyButtonFab>
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