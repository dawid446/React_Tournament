import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Match from './Match';
import Statistics from './Statistics';
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Play from '@material-ui/icons/Category';
import Stats from '@material-ui/icons/Assignment'

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
const Tabss = styled(Tabs)
`
    background-color : #f45a36 !important
`
class MainMatch extends Component {
    state = {
        tournament: '',
        match: [],
        isLoaded: false,
        value: 0
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

    handleChange = (event, value) => {
        this.setState({ value })
    }

    render() {
        const { value } = this.state
        if (this.state.isLoaded !== true) {
            return (
                <div>
                    <CircularProgress color="secondary"></CircularProgress>
                </div>)
        } else {
            return (
                <div>
                    <Header>
                        {this.state.tournament.tournamentName}
                    </Header>
                    <Paper>
                        <AppBar position="static">
                            <Tabss
                                onChange={this.handleChange}
                                value={value}
                                fullWidth
                            >
                                <Tab label="Score" icon={<Play />} />
                                <Tab label="Statiscic" icon={<Stats />} />
                            </Tabss>
                        </AppBar>
                        {value === 0 && <Match match={this.state.match}></Match>}
                        {value === 1 && <Statistics match={this.state.match}></Statistics>}

                    </Paper>
                </div>
            );
        }
    }
}

export default MainMatch;