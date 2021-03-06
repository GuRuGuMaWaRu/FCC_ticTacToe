import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { drawBoard } from '../utils/drawing';
import * as actions from '../actions';
import '../style/game.css';

class Game extends Component{

  componentDidMount() {
    drawBoard(this.props.playerSymbol);
    if (this.props.isMoving === 'cpu') {
      this.props.cpuMove(true);
    }
  }

  componentDidUpdate() {
    if (this.props.isMoving === 'cpu') {
      this.props.cpuMove(false);
    }
    if (this.props.winLoss !== 'none') {
      setTimeout(() => {
        this.props.gameOver();
      }, 1000);
    }
  }

  render() {
    const {
      playerMove,
      playerSymbol,
      gameOn,
      scoreWin,
      scoreLoss,
      scoreDraw,
    } = this.props;

    const gameStyle = playerSymbol === 'x'
      ? {backgroundColor: '#000', color: '#fff'}
      : {backgroundColor: '#fff', color: '#000'};

    if (!gameOn) {
      return <Redirect to='/end' />
    }

    return (
      <div className="outer-shell" style={gameStyle}>
        <div className="game">
          <div className="game-score">
            <div className="score-win">
              <h4>Player</h4>
              <span>{scoreWin}</span>
            </div>
            <div className="score-draw">
              <h4>Draw</h4>
              <span>{scoreDraw}</span>
            </div>
            <div className="score-loss">
              <h4>Computer</h4>
              <span>{scoreLoss}</span>
            </div>
          </div>
          <canvas
            onClick={playerMove}
            className="game-board"
            height="300px"
            width="300px"></canvas>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  isMoving: PropTypes.string,
  playerSymbol: PropTypes.string,
  winLoss: PropTypes.string,
  gameOn: PropTypes.bool,
  scoreWin: PropTypes.number,
  scoreLoss: PropTypes.number,
  scoreDraw: PropTypes.number,
  playerMove: PropTypes.func,
  cpuMove: PropTypes.func,
  gameOver: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isMoving: state.isMoving,
  playerSymbol: state.playerSymbol,
  winLoss: state.winLoss,
  gameOn: state.gameOn,
  scoreWin: state.scoreWin,
  scoreLoss: state.scoreLoss,
  scoreDraw: state.scoreDraw,
});

export default connect(mapStateToProps, actions)(Game);
