import React, { Component } from 'react';
import {Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';

class Statistics extends Component {
    state = {
        statistic: [],
    }

    componentDidMount = () => {
        const { match } = this.props;
        const list =[];
        let id = 0;


        //add to array all team
        match.forEach(v => {
            if (v.isBreak === false) {
                id++
                list.push({ id:id, teamName: v.teamName, matches: 0, win: 0, lose: 0, draw: 0, scoregoal:0, losescore:0,bilanse:0,point:0 })
                id++;
                list.push({ id:id,teamName: v.teamName1, matches: 0, win: 0, lose: 0, draw: 0,scoregoal:0, losescore:0,bilanse:0,point:0 })
            }
        })
        //delete duplicate
        const uniqList = list.filter((s1, pos, arr) => arr.findIndex((s2) => s2.teamName === s1.teamName) === pos);

        match.forEach(key => {
            //find team
            let team = uniqList.find(s => s.teamName === key.teamName);
            let team1 = uniqList.find(s => s.teamName === key.teamName1);
            if (key.isBreak === false && key.isPlayed === true) {

                    team.matches++;
                    team1.matches++;

                    team.scoregoal += key.score;
                    team.losescore += key.score1;
                    team.bilanse = team.scoregoal + (-team.losescore);

                    team1.scoregoal += key.score1;
                    team1.losescore += key.score;
                    team1.bilanse = team1.scoregoal + (-team1.losescore);

                if (key.score > key.score1) {
                    team.win++;
                    team.point += 3;
                    team1.lose++;


                }
                if (key.score < key.score1) {
                    team1.win++;
                    team1.point += 3;
                    team.lose++;

                }
                if (key.score === key.score1) {
                    team1.draw++;
                    team.draw++;
                    team.point += 1
                    team1.point += 1
                }

            }
        })
        //sort desc
        uniqList.sort((a,b) => b.point - a.point)
        this.setState({statistic:uniqList});
    }
    render() {

        return (
            <div>
                <Table>

                        <TableHead>
                            <TableRow>

                                <TableCell>Team Name</TableCell>
                                <TableCell align="center">M</TableCell>
                                <TableCell align="right">W</TableCell>
                                <TableCell align="right">D</TableCell>
                                <TableCell align="right">L</TableCell>
                                <TableCell align="right">SG</TableCell>
                                <TableCell align="right">LG</TableCell>
                                <TableCell align="right">B</TableCell>
                                <TableCell align="right">PKT</TableCell>
                            </TableRow>
                        </TableHead>


                    <TableBody>
                        {this.state.statistic.map(value => (
                            <TableRow key={value.id}>

                                <TableCell align="left">{value.teamName}</TableCell>
                                <TableCell align="right">{value.matches}</TableCell>
                                <TableCell align="right">{value.win}</TableCell>
                                <TableCell align="right">{value.draw}</TableCell>
                                <TableCell align="right">{value.lose}</TableCell>
                                <TableCell align="right">{value.scoregoal}</TableCell>
                                <TableCell align="right">{value.losescore}</TableCell>
                                <TableCell align="right">{value.bilanse}</TableCell>
                                <TableCell align="right">{value.point}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )

    }
}

export default Statistics;