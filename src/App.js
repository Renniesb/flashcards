import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CreateDeck from './components/createDeck';
import EditDeck from './components/editDeck';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isCreateState: false, isEmptyState: true }
  }
  triggerEditDeckState = () => {
  this.setState({
    isCreateState: false,
    isEmptyState: false,
    isEditDeckState: true
  })
  }
  triggerCreateState = () => {
    this.setState({
      isCreateState: true,
      isEmptyState: false,
      isEditDeckState: false
    })
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
        <span>
          <button className="btn btn-primary" onClick={this.triggerCreateState}>
            + Create New Flashcard Deck
          </button>
          <button className="btn btn-primary">
            + View Flashcard Decks
          </button>
        </span>

          {this.state.isCreateState && <CreateDeck editDeck={this.triggerEditDeckState}/>}

          {this.state.isEditDeckState && <EditDeck />}
        </header>

      </div>
    );
  }

}

export default App;
