import React from 'react';
// import logo from './logo.svg';
import CreateDeck from './components/createDeck';
import EditDeck from './components/editDeck';
import ViewDecks from './components/viewDecks';
import StudyDeck from './components/studyDeck';
import Deck from './deck'
import Card from './card'
import {Button, Col, Row, Container, Alert} from 'react-bootstrap';
import './App.css';
import styled from 'styled-components';





const StyledButton = styled(Button)`
  color: palevioletred;
  background-color: white;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid palevioletred;
	border-radius: 3px;

`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isStudyDeckState: true,
      isCreateState: false,
      isEditDeckState: false,
      isViewDecksState: false,
      currentDeck:{name: "Sample Deck", cards: [{
        front: "Interpret",
        back: "To execute a program in a high-level language by translating it one line at a time."},
        {
        front: "Program",
        back: "A set of instructions that specifies a computation."
      },
        {
          front:"Source code",
          back:"A program in a high-level language."
        }]} ,
      newDeckName: "",
      newDeckDescription: "",
      newCardFront: "",
      newCardBack: "",
      decks: [
        {id: 1, deckname: "Sample Deck",deckdescription: "A sample deck with programming terms", cards: [{
          id: 1,
          term: "Interpret",
          definition: "To execute a program in a high-level language by translating it one line at a time.",
          deckid: 1
        },
          {
          id: 2,
          term: "Program",
          definition: "A set of instructions that specifies a computation.",
          deckid: 1
        },
          {
            id: 3,
            term:"Source code",
            definition:"A program in a high-level language.",
            deckid: 1
          }]}
      ] }
  }
  componentDidMount() {
    document.title = 'Flashcards';
  }

  addNewDeck = () => {
    const deckName = this.state.newDeckName;
    const deckDescription = this.state.newDeckDescription;
    let createDeck = new Deck();
    if(deckName !== ""){
      createDeck.name = deckName
    }
    if(deckDescription !== ""){
      createDeck.description = deckDescription
    }

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
    fetch(`http://localhost:8000/api/decks/${deck.id}`, {
    method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => console.log(err));
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
      isStudyDeckState: false,
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
          <StyledButton variant="outline-secondary" onClick={this.triggerCreateState}>
            + Create New Flashcard Deck
          </StyledButton>
          <StyledButton variant="outline-secondary" onClick={this.triggerViewDecksState}>
              View Flashcard Decks
          </StyledButton>
        </span>
        </header>

          {this.state.isCreateState && <CreateDeck onNewDeckChange={this.handleNewValuesAdded} onAddDeck={this.addNewDeck}/>}

          {this.state.isEditDeckState && <EditDeck decks={this.state.decks}
          newCardFront={this.state.newCardFront} newCardBack={this.state.newCardBack}
          onNewCardChange={this.handleNewValuesAdded} onCardAdd={this.addCardToDeck}
          currentDeck={this.state.currentDeck} onHandleDeckChange={this.handleDeckChange}
          onHandleCardChange={this.handleCardChange} onDeleteCard={this.deleteCard}
           />}

          {this.state.isViewDecksState && <ViewDecks decks={this.state.decks} onEditDeck={this.triggerEditDeckState} onDeleteDeck={this.deleteDeck} onStudyDeck={this.triggerStudyDeckState}/>}
          {this.state.isStudyDeckState && <StudyDeck currentDeck={this.state.currentDeck} />}
          {this.state.decks.length === 0 && this.state.isViewDecksState && <Container><Row><Col md={{span: 6, offset: 3}}><Alert variant="warning" className="mt-5">You currently have no Flashcard Decks. Click Create New Flashcard Deck to add one</Alert></Col></Row></Container>}

      </div>
    );
  }

}

export default App;
