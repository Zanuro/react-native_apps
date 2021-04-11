import { ActivityIndicator, Alert, Image, StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

import Button from '../components/Button';
import configureTransition from '../utils/configureTransition';
import Board from '../components/Board';
import PuzzlePropType from '../validators/PuzzlePropType';
import Preview from '../components/Preview';
import Stats from '../components/Stats';

import { move, movableSquares, isSolved} from '../utils/puzzle';


const State = {
    LoadingImage: 'LoadingImage',
    WillTransitionIn: 'WillTransitionIn',
    WillTransitionOut: 'WillTransitionOut',
    RequestTransitionOut: 'RequestTransitionOut',
}



export default class Game extends React.Component{

    static propTypes = {
        puzzle: PuzzlePropType.isRequired,
        image: Image.propTypes.source,
        onChange: PropTypes.func.isRequired,
        onQuit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        image: null,
    };


    handlePressSquare = (square) => {
        const { puzzle, onChange } = this.props;
        const { moves } = this.state;

        if(!movableSquares(puzzle).includes(square)) return;

        const updated = move(puzzle, square);

        this.setState({ moves: moves+1, previousMove: square});

        onChange(updated);

        if(isSolved(updated)) {
            this.requestTransitionOut();
        }
    }


    render(){
        return null;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    centered: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15,
        alignSelf: 'stretch',
    }
});

