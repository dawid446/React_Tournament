import React, { Component } from 'react';

class Statistics extends Component {
    state ={
            statistic:[]
        }

    statystyka = () => {
        const statistic  = this.state;
        const match = this.props;

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
    render() {
        return (
            <div>
             {this.props.match.map(v =>{
                 return(
                     <div></div>
                    //  <ul>
                    //      <li>{v.teamName}</li>
                    //      <li>{v.teamName1}</li>
                    //      <li>{v.score}</li>
                    //      <li>{v.score1}</li>
                    //  </ul>
                 )
             })}
            </div>
        );
    }
}

export default Statistics;