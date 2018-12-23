import React, { Component } from 'react';
import { Button, Paper } from '@material-ui/core';
import { Link } from "react-router-dom";

class Start extends Component {
    state = {}
    render() {
        return (
            <div>
                <Paper>

                    <Link to="/Tournament">
                        <Button variant="contained" color="primary">Stwórz turniej</Button>
                    </Link>
                    <Link to="/Search">
                        <Button  variant="contained" color="secondary">Wyszukaj turniej</Button>
                    </Link>

                </Paper>
            </div>
        );
    }
}

export default Start;