import React, { Component } from 'react';
import { Button, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';

class Statistics extends Component {
    state = {
        statistic: [
        ],
    }

    componentDidMount = () => {
        const { statistic } = this.state;
        const { match } = this.props;
        const list =[];
        let id = 0;
        //add to array all team
        match.forEach(v => {
            if (v.isBreak === false) {
                id++
                list.push({ id:id, teamName: v.teamName, matches: 0, win: 0, lose: 0, draw: 0 })
                id++;
                list.push({ id:id,teamName: v.teamName1, matches: 0, win: 0, lose: 0, draw: 0 })
            }
        })
        //delete duplicate
        const uniqList = list.filter((s1, pos, arr) => arr.findIndex((s2) => s2.teamName === s1.teamName) === pos);

        match.forEach(key => {
            let team = uniqList.find(s => s.teamName === key.teamName);
            let team1 = uniqList.find(s => s.teamName === key.teamName1);
            // a.win = 1;
            // a.lose = 2
            if (key.isBreak === false) {

                    team.matches++;
                    team1.matches++;

                if (key.score > key.score1) {
                    team.win++;
                    team1.lose++;


                }
                if (key.score < key.score1) {
                    team1.win++;
                    team.lose++;

                }
                if (key.score === key.score1) {
                    team1.draw++;
                    team.draw++;

                }

            }
        })
        this.setState({statistic:uniqList});
        console.log(statistic);

    }
    render() {

        return (
            <div>
                {/* <Button onClick={this.statystyka.bind(this)}>Statystyka</Button> */}
                <Table>

                        <TableHead>
                            <TableRow>

                                <TableCell>Team Name</TableCell>
                                <TableCell>M</TableCell>
                                <TableCell>W</TableCell>
                                <TableCell>D</TableCell>
                                <TableCell>L</TableCell>
                            </TableRow>
                        </TableHead>


                    <TableBody>
                        {this.state.statistic.map(value => (
                            <TableRow key={value.id}>

                                <TableCell align="right">{value.teamName}</TableCell>
                                <TableCell align="right">{value.matches}</TableCell>
                                <TableCell align="right">{value.win}</TableCell>
                                <TableCell align="right">{value.draw}</TableCell>
                                <TableCell align="right">{value.lose}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )

    }
}

export default Statistics;