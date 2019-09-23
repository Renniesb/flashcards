import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CreateDeck from './components/createDeck';
import EditDeck from './components/editDeck';
import Deck from './deck'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreateState: false,
      isEmptyState: true,
      newDeckName: "",
      newDeckDescription: "",
      decks: [
        {name: "Deck 1", cards: [{front: "Rennie", back: "32"},{front: "22", back: "19"}]},
        {name: "Deck 2", cards: [{front: "Hello", back: "Moto"},{front: "Here", back: "You go"}]}
      ] }
  }

  handleDeckChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDeckAdd = () => {
    this.setState(state => {
      let createDeck = new Deck(state.newDeckName, state.newDeckDescription);
      let {...newDeck} = createDeck;
      let decks = [...state.decks, newDeck];
      return {
        decks: decks,
        newDeckName: '',
        newDeckDescription: '',
      };
    });

    this.triggerEditDeckState()
  }

  handleCardChange = (event,deck,card) => {
      const decks = [...this.state.decks];
      const index = decks.indexOf(deck);
      const {...deckChanged} = deck;
      decks[index] = deckChanged;
      const index2 = decks[index].cards.indexOf(card);
      decks[index].cards[index2][event.target.name] = event.target.value;
      this.setState({decks});
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

          {this.state.isCreateState && <CreateDeck onDeckChange={this.handleDeckChange} onAddDeck={this.handleDeckAdd}/>}

          {this.state.isEditDeckState && <EditDeck decks={this.state.decks} onHandleCardChange={this.handleCardChange} />}
        </header>

      </div>
    );
  }

}

export default App;
