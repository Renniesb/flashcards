import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CreateDeck from './components/createDeck';
import EditDeck from './components/editDeck';
import Deck from './deck'
import Card from './card'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreateState: false,
      isEmptyState: true,
      isEditDeckState: false,
      currentDeck:{name: "Deck 2", cards: [{front: "Hello", back: "Moto"},{front: "Here", back: "You go"}]} ,
      newDeckName: "",
      newDeckDescription: "",
      newCardFront: "",
      newCardBack: "",
      decks: [
        {name: "Deck 1", cards: [{front: "Rennie", back: "32"},{front: "22", back: "19"}]},
        {name: "Deck 2", cards: [{front: "Hello", back: "Moto"},{front: "Here", back: "You go"}]}
      ] }
  }

  handleNewValuesAdded = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  addCardToDeck = (e) => {

    this.setState(state => {

      const decks = [...state.decks];
      const index = decks.indexOf(state.currentDeck);
      let createCard = new Card(state.newCardFront, state.newCardBack);
      let {...newCard} = createCard;

      let {...copyOfCurrentDeck} = state.currentDeck;
      copyOfCurrentDeck.cards.push(newCard);
      decks[index] = copyOfCurrentDeck;


      return {
        decks: decks,
        currentDeck: copyOfCurrentDeck,
        newCardFront: '',
        newCardBack: '',
      };
    });

    e.preventDefault();

  }

  addNewDeck = () => {
    this.setState(state => {
      let createDeck = new Deck(state.newDeckName, state.newDeckDescription);
      let {...newDeck} = createDeck;
      let decks = [...state.decks, newDeck];
      return {
        currentDeck: newDeck,
        decks: decks,
        newDeckName: '',
        newDeckDescription: '',
      };
    });

    this.triggerEditDeckState()
  }

  handleDeckChange = (event,deck) => {
    const decks = [...this.state.decks];
    const index = decks.indexOf(deck);
    const {...deckChanged} = deck;
    decks[index] = deckChanged;
    decks[index][event.target.name] = event.target.value;
    this.setState({decks, currentDeck: decks[index]});
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

          {this.state.isCreateState && <CreateDeck onNewDeckChange={this.handleNewValuesAdded} onAddDeck={this.addNewDeck}/>}

          {this.state.isEditDeckState && <EditDeck decks={this.state.decks}
          newCardFront={this.state.newCardFront} newCardBack={this.state.newCardBack}
          onNewCardChange={this.handleNewValuesAdded} onCardAdd={this.addCardToDeck}
          currentDeck={this.state.currentDeck} onHandleDeckChange={this.handleDeckChange}
          onHandleCardChange={this.handleCardChange}
           />}
        </header>

      </div>
    );
  }

}

export default App;
