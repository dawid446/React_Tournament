import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import Search from '@material-ui/icons/SearchRounded';
import Add from '@material-ui/icons/AddBoxOutlined';


const Square = styled.div`
    height: 300px;
    width: 300px;
    background: #f45a36;
    margin-left: 30px;
    margin-bottom: 30px;
    border-radius: 25px;
    float: left;
    transition:all 0.3s ease;
    &:hover{
        webkit-transform: scale(1.1);
        ms-transform: scale(1.1);
        transform: scale(1.1);
    }
`
const InSquare = styled.div`
    margin-top: 50px
    display: flex;
    align-items: center;
    justify-content: center;
    color: #212121
    fontSize: 200

`

class Start extends Component {
    render() {
        return (
            <div>
                <Link to="/Tournament">
                    <Square>
                        <InSquare>
                        <Add style={{ fontSize: 200 }} />
                        </InSquare>
                    </Square>
                </Link>

                <Link to="/Search">
                    <Square>
                        <InSquare>
                            <Search style={{ fontSize: 200 }} />
                        </InSquare>
                    </Square>
                </Link>

            </div>
        );
    }
}

export default Start;