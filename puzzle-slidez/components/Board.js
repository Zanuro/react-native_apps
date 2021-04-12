import { Animated, Image, StyleSheet, View,
         Dimensions, Easing } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';


import { availableMove, getIndex } from '../utils/puzzle';
import { calculateContainerSize, calculateItemSize, itemMargin,
         calculateItemPosition, } from '../utils/grid';

import Draggable from './Draggable';
import PuzzlePropType from '../validators/PuzzlePropType';
import clamp from '../utils/clamp';


const State = {
    WillTransitionIn: 'WillTransitionIn',
    DidTransitionIn: 'DidTransitionIn',
    DidTransitionOut: 'DidTransitionOut',
};

  
export default class Board extends React.PureComponent{

    static propTypes = {
        puzzle: PuzzlePropType.isRequired,
        teardown: PropTypes.bool.isRequired,
        //image: Image.propTypes.source,
        previousMove: PropTypes.number,
        onMoveSquare: PropTypes.func.isRequired,
        onTransitionIn: PropTypes.func.isRequired,
        onTransitionOut: PropTypes.func.isRequired,
    };


    static defaultProps = {
        image:null,
        previousMove: null,
    };

    constructor(props){
        super(props);

        const { puzzle: { size, board}} = props;

        this.state = { transitionState: State.WillTransitionIn };
        this.animatedValues = [];

        const height = Dimensions.get('window').height;

        board.forEach((square, ix) => {
            const { top, left } = calculateItemPosition(size, ix);

            this.animatedValues[square] = {
                scale: new Animated.Value(1),
                top: new Animated.Value(top + height),
                left: new Animated.Value(left),
            }
        })

    }

    animateAllSquares(visible){
        const { puzzle: {board, size } } = this.props;

        const height = Dimensions.get('window').height;

        const animations = board.map((square,ix) => {
            const { top } = calculateItemPosition(size, ix);

            return Animated.timing(this.animatedValues[square].top, {
                toValue: visible ? top : top + height,
                delay: 800 * (ix / board.length),
                duration: 400,
                easing: visible ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
                useNativeDriver: true,
            })
        })

        return new Promise( res => Animated.parallel(animations).start(res));
    }

    renderSquare = (square, ix) => {
        const { puzzle: {size, empty }, image } = this.props;
        const {transitionState } = this.state;

        if ( square === empty ) return null;

        const itemSz = calculateItemSize(size);
    
        return(
            <Draggable key={square} enabled={transitionState === State.DidTransitionIn}
                       onTouchStart={() => this.handleTouchStart(square)}
                       onTouchMove={offset => this.handleTouchMove(square, ix, offset)}
                       onTouchEnd={offset => this.handleTouchEnd(square, ix, offset)}>
                    {(
                        {handlers, dragging}
                    ) => {
                    const itemStyle = {
                        position: 'absolute',
                        width: itemSz,
                        height: itemSz,
                        overflow: 'hidden',
                        transform: [
                            {
                                translateX: this.animatedValues[square].left
                            },
                            {
                                translateY: this.animatedValues[square].top
                            },
                            {
                                scale: this.animatedValues[square].scale
                            }
                        ],
                        zIndex: dragging ? 1 : 0,
                    };
                    
                    const imageStyle = {
                        position: 'absolute',
                        width: itemSz * size + (itemMargin* size - 1),
                        height: itemSz * size + (itemMargin* size - 1),
                        overflow: 'hidden',
                        transform: [
                            {
                                translateX: -Math.floor(square % size) * (itemSz + itemMargin)
                            },
                            {
                                translateY: -Math.floor(square / size) * (itemSz + itemMargin)
                            },
                        ]
                    };

                    return (
                        <Animated.View {...handlers} style={itemStyle}>
                            <Image style={imageStyle} source={image} />
                        </Animated.View>
                    );
                }}
            </Draggable>
        )

    }
    
    handleTouchStart(square){
        Animated.spring(this.animatedValues[square].scale, {
            toValue: 1.1,
            friction: 20,
            tension: 200,
            useNativeDriver: true,
        }).start();
    }

    handleTouchMove(square, ix, { top, left}){
        const {puzzle, puzzle: {size}} = this.props;

        const itemSz = calculateItemSize(size);
        const move= availableMove(puzzle,square);

        const { top: initialTop, left: initialLeft} = calculateItemPosition(
            size, ix
        );

        const dist = itemSz + itemMargin;

        const clampedTop = clamp(
            top, move === 'up' ? -dist : 0,
            move === 'down' ? dist :0,
        );

        const clampedLeft = clamp(
            left,
            move === 'left'? -dist : 0,
            move === 'right' ? dist : 0,
        );

        this.animatedValues[square].left.setValue(initialLeft + clampedLeft);
        this.animatedValues[square].top.setValue(initialTop + clampedTop);
    }

    handleTouchEnd(square, ix, {top, left}){
        const { puzzle, puzzle: {size}, onMoveSquare} = this.props;

        const itemSz = calculateItemSize(size);
        const move = availableMove(puzzle, square);

        Animated.spring(this.animatedValues[square].scale, {
            toValue: 1,
            friction: 20,
            tension: 200,
            useNativeDriver: true,
        }).start();

        if( 
            (move === 'up' && top < -itemSz / 2) ||
            (move === 'down' && top > itemSz / 2) ||
            (move === 'left' && left < -itemSz / 2) ||
            (move === 'right' && left > itemSz / 2)
         ) 
         {
             onMoveSquare(square);
         }
         else{
             this.updateSquarePosition(puzzle,square, ix);
         }
    }

    updateSquarePosition(puzzle, square, ix){
        const { size } = puzzle;

        const { top, left } = calculateItemPosition(size, ix);

        const animations = [
            Animated.spring(this.animatedValues[square].top, {
                toValue: top,
                friction: 20,
                tension: 200,
                useNativeDriver: true,
            }),
            Animated.spring(this.animatedValues[square].left, {
                toValue: left,
                friction: 20,
                tension: 200,
                useNativeDriver: true,
            })
        ]

        return new Promise(res => Animated.parallel(animations).start(res));
    }


    async UNSAFE_componentWillReceiveProps(nextProps){
        const {previousMove, onTransitionOut, puzzle, teardown} = nextProps;

        const didMovePiece = this.props.puzzle !== puzzle && previousMove !== null;
        const shouldTeardown = !this.props.teardown && teardown;

        if(didMovePiece){
            await this.updateSquarePosition(
                puzzle, previousMove, getIndex(puzzle, previousMove)
            );
        }

        if(shouldTeardown){
            await this.animateAllSquares(false);

            this.setState({
                transitionState: State.DidTransitionOut
            })
            onTransitionOut();
        }
    }


    async componentDidMount(){

        // show squares animation
        await this.animateAllSquares(true);

        const { onTransitionIn } = this.props;

        this.setState({
            transitionState: State.DidTransitionIn
        })
        onTransitionIn();
    }



    render() {
        
        const { puzzle: {board} } = this.props;
        const { transitionState } = this.state;


        const containerSz = calculateContainerSize();
        const containerStyle = { width: containerSz, height: containerSz };

        return(
            <View style={[styles.container, containerStyle]}>
                {transitionState !== State.DidTransitionOut && board.map(this.renderSquare)}
            </View>
        )

    };
}


const styles = StyleSheet.create({
    container: {
        padding: 6,
        borderRadius: 6,
        backgroundColor: '#1F1E2A',
      },
      title: {
        fontSize: 24,
        color: '#69B8FF',
      },
})