import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TextField, Fab } from '@material-ui/core';
import { Formik } from 'formik';
import AddIcon from '@material-ui/icons/Done';
import styled from 'styled-components'
// import Snackbar from '@material-ui/core/Snackbar';
// import MySnackbar from './MySnackbar';


const MyButtonFab = styled(Fab)`
    margin-top: 15px !important
    margin-left: 15px !important
    background-color: #f45a36 !important
`
const TableRowStyle = styled(TableRow)
`
background-color : ${(props)=> props.isbreak ? 'grey !important' : 'white !important' }

`
class Match extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            match: this.props.match
        }
    }

    render() {
            return (
                <div>
                    <Paper>
                        <Table>

                            <TableBody>
                                {this.state.match.map(row => {
                                    return (
                                        <TableRowStyle isbreak={row.isBreak ? "break" : ""} key={row.matchID}>
                                            <TableCell align="center">{row.teamName === "przerwa" ? "" : row.teamName}</TableCell>
                                            <TableCell algin="center">
                                                <Formik
                                                    initialValues={{ ...row }}
                                                    onSubmit={(values) => {
                                                        values.isPlayed = true;
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
                                                            .then(data => console.log(data.json()))

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
                                                        handleChange,
                                                        handleSubmit,
                                                    }) => (
                                                            <form onSubmit={handleSubmit}>
                                                                <TextField
                                                                    error={errors.score}
                                                                    label={errors.score}
                                                                    name='score'
                                                                    onChange={handleChange}
                                                                    value={values.score ===null ? "" : values.score}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    type={values.isBreak ? "hidden" : "text"}
                                                                ></TextField>


                                                                <TextField
                                                                    error={errors.score1}
                                                                    label={errors.score1}
                                                                    name='score1'
                                                                    onChange={handleChange}
                                                                    value={values.score1 ===null ? "" : values.score1}
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    type={values.isBreak ? "hidden" : "text"}
                                                                ></TextField>

                                                                {values.isBreak ? "" :
                                                                <MyButtonFab disabled={values.isBreak ? true : false} type='submit' color="primary">
                                                                    <AddIcon />
                                                                </MyButtonFab>}
                                                            </form>
                                                        )}
                                                />

                                            </TableCell>
                                            <TableCell align="center">{row.teamName1 === "przerwa" ? "" : row.teamName1}</TableCell>
                                        </TableRowStyle>
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