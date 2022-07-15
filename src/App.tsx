import './App.css';
import Board from './components/Board';

import { gameSettingsActions } from './store/game-settings';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const startGameHandler = () => {
    dispatch(gameSettingsActions.startGame());
  }

  return (
    <div className="App">
      <button onClick={startGameHandler}>Start</button>
      <Board/>
    </div>
  );
}

export default App;
