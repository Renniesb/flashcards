import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CreateDeck from './components/createDeck';
import EditDeck from './components/editDeck';
import ViewDecks from './components/viewDecks';
import StudyDeck from './components/studyDeck';
import Deck from './deck'
import Card from './card'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStudyDeckState: true,
      isCreateState: false,
      isEditDeckState: false,
      isViewDecksState: false,
      currentDeck:{name: "Sample Deck", cards: [{front: "Hello", back: "Moto"},{front: "Here", back: "You go"}]} ,
      newDeckName: "",
      newDeckDescription: "",
      newCardFront: "",
      newCardBack: "",
      decks: [
        {name: "Deck 1", cards: [{front: "Rennie", back: "32"},{front: "22", back: "19"}, {front: "My name", back: "is Shaft"}]},
        {name: "Deck 2", cards: [{front: "Hello", back: "Moto"},{front: "Here", back: "You go"}]}
      ] }
  }

  addNewDeck = () => {
    let createDeck = new Deck(this.state.newDeckName, this.state.newDeckDescription);
    let {...newDeck} = createDeck;
    let decks = [...this.state.decks, newDeck];
    this.setState({
        decks: decks,
        newDeckName: '',
        newDeckDescription: '',
    });

    this.triggerEditDeckState(newDeck)
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
  deleteDeck = (e, deck) => {
    const decks = this.state.decks.filter( d => d !== deck );
    this.setState({decks})

    e.preventDefault();
  }

  deleteCard = (e, card) => {
    const decks = [...this.state.decks];
    const index = decks.indexOf(this.state.currentDeck);
    let {...copyOfCurrentDeck} = this.state.currentDeck;
    const cards = this.state.currentDeck.cards.filter(c => c !== card );
    copyOfCurrentDeck.cards = cards;
    decks[index] = copyOfCurrentDeck;

    this.setState({decks, currentDeck: copyOfCurrentDeck});
  }

  handleNewValuesAdded = event => {
    this.setState({ [event.target.name]: event.target.value });
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
      this.setState({decks, currentDeck: decks[index]});
  }

  triggerEditDeckState = (deck) => {

    this.setState({
      currentDeck: deck,
      isCreateState: false,
      isEditDeckState: true,
      isViewDecksState: false,
      isStudyDeckState: false,
    })
  }
  triggerCreateState = () => {
    this.setState({
      isCreateState: true,
      isEditDeckState: false,
      isViewDecksState: false,
    })
  }
  triggerStudyDeckState = deck => {
    this.setState({
      currentDeck: deck,
      isCreateState: false,
      isEditDeckState: false,
      isViewDecksState: false,
      isStudyDeckState: true,
    });
  }
  triggerViewDecksState = () => {
    this.setState({
      isCreateState: false,
      isEditDeckState: false,
      isViewDecksState: true,
      isStudyDeckState: false,
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
          <button className="btn btn-primary" onClick={this.triggerViewDecksState}>
            + View Flashcard Decks
          </button>
        </span>

          {this.state.isCreateState && <CreateDeck onNewDeckChange={this.handleNewValuesAdded} onAddDeck={this.addNewDeck}/>}

          {this.state.isEditDeckState && <EditDeck decks={this.state.decks}
          newCardFront={this.state.newCardFront} newCardBack={this.state.newCardBack}
          onNewCardChange={this.handleNewValuesAdded} onCardAdd={this.addCardToDeck}
          currentDeck={this.state.currentDeck} onHandleDeckChange={this.handleDeckChange}
          onHandleCardChange={this.handleCardChange} onDeleteCard={this.deleteCard}
           />}

          {this.state.isViewDecksState && <ViewDecks decks={this.state.decks} onEditDeck={this.triggerEditDeckState} onDeleteDeck={this.deleteDeck} onStudyDeck={this.triggerStudyDeckState}/>}
          {this.state.isStudyDeckState && <StudyDeck currentDeck={this.state.currentDeck} />}

        </header>

      </div>
    );
  }

}

export default App;
