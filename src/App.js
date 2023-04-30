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
import env from './config.js';






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
      currentDeck:"0" ,
      newDeckName: "",
      newDeckDescription: "",
      newCardFront: "",
      newCardBack: "",
      decks: [],
      deckHash: {},
      cardsHash: {},
      cardsDeleted: 0

      }
  }
  componentDidMount() {
    document.title = 'Flashcards';
    this.getDecks();
  }

  getDecks = () => {
    //use current units
    let deckHash = {}
    let cardsHash = {}

    Promise.all([fetch(`${env.ENDPOINT}decks`),fetch(`${env.ENDPOINT}cards`) ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([decks,cards]) =>{ 
          decks.forEach((deck)=>{ 
            deckHash[deck.quizid] = deck;
            cardsHash[deck.quizid] = []
          })

          cards.forEach((card)=>{
            cardsHash[card.quizid].push(card);
          })
          
          if(decks.length === 0){
          this.setState({decks: decks, deckHash: deckHash, cardsHash: cardsHash})
          }
          else {
            const deckValue = this.state.currentDeck === "0" ? this.state.currentDeck : decks[0].quizid;
            this.setState({decks: decks, deckHash: deckHash, currentDeck: deckValue, cardsHash: cardsHash})
          }

      }).catch((err) => {
        console.log(err);
    });
  }

  addNewDeck = (e,quizid) => {
    e.preventDefault();
    const deckName = this.state.newDeckName;
    const deckDescription = this.state.newDeckDescription;
    let createDeck = new Deck();
    createDeck.quizid = quizid;
    if(deckName !== ""){
      createDeck.deckname = deckName
    }
    if(deckDescription !== ""){
      createDeck.deckdescription = deckDescription
    }
    let url = `${env.ENDPOINT}decks/`;
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(createDeck), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response)
      createDeck.id = response.id;
      let {...newDeck} = createDeck;
      console.log('new deck', newDeck);
      let decks = [...this.state.decks, newDeck];
      const deckHash = {}
      decks.forEach((deck)=>{ 
        deckHash[deck.quizid] = deck;
      })
      console.log(decks);
      console.log(deckHash)
      this.setState({
        decks: decks,
        deckHash: deckHash,
        currentDeck: newDeck.quizid,
        newDeckName: '',
        newDeckDescription: '',
      },()=>{
        this.triggerEditDeckState(newDeck.quizid)

      });  
    }
    );
    
    
  }

  addCardToDeck = (e,fcard,bcard,quizid) => {
    let createCard = new Card(fcard, bcard, quizid);
    let url = `${env.ENDPOINT}cards`;
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(createCard), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      createCard.id = response.id;
      let {...newCard} = createCard;
      console.log('new card',newCard)
      let copyCardsHash = this.state.cardsHash;
      if(!copyCardsHash[quizid]){
        copyCardsHash[quizid] = [newCard];
      }
      else{
        copyCardsHash[quizid].push(newCard);
      }

      this.setState({
          cardsHash: copyCardsHash,
          currentDeck: quizid,
          newCardFront: '',
          newCardBack: '',
      });
      
    }
    ).catch(error => console.error('Error:', error));
   

    e.preventDefault();

  }
  deleteDeck = (e, deck) => {
    const decks = this.state.decks.filter( d => d !== deck );
    fetch(`${env.ENDPOINT}decks/${deck.id}`, {
    method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => console.log(err));

    let newCardsHash = this.state.cardsHash;
    let newDeckHash = this.state.deckHash;

    delete newCardsHash[deck.id]; 
    delete newDeckHash[deck.id];

    this.setState({
      decks: decks,
      cardsHash: newCardsHash,
      deckHash: newDeckHash
    })

    e.preventDefault();
  }

  deleteCard = (e,card,quizid) => {
    console.log(card.id)
    fetch(`${env.ENDPOINT}cards/${card.id}`,{
      method: 'DELETE',
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
    
    let changedCardsHash = this.state.cardsHash;

    let filteredCards = changedCardsHash[quizid].filter( c => c.id !== card.id ); 
    changedCardsHash[quizid] = filteredCards;
    
    
    this.setState({
      cardsHash: changedCardsHash,
      cardsDeleted: card.id
    })

  }

  handleNewValuesAdded = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDeckChange = (event,quizid) => {
    if(event.target.name === "deckname"){
      if(event.target.value===""){
        event.target.value = null;
      }
      let editdeckname = event.target.value

      this.setState(prevState => ({
        deckHash: {
          [quizid]: {                     // specific object of food object
            ...prevState[quizid],   // copy all pizza key-value pairs
            deckname: editdeckname          // update value of specific key
          }
        }
      }))
      fetch(`${env.ENDPOINT}decks/${quizid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          deckname: editdeckname
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }
    if(event.target.name === "deckdescription"){
      if(event.target.value===""){
        event.target.value = null;
      }
      let editDeckDescription = event.target.value
      console.log("event",editDeckDescription);
      console.log(editDeckDescription);

      this.setState(prevState => ({
        deckHash: {
          [quizid]: {                     
            ...prevState[quizid],   
            deckdescription: editDeckDescription          
          }
        }
      }))
      fetch(`${env.ENDPOINT}decks/${quizid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          deckdescription: editDeckDescription
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }
    if(event.target.name === "quizid"){
      let editquizid = +event.target.value
      this.setState(prevState => ({
        deckHash: {
          [quizid]: {                     
            ...prevState[quizid],   
            quizid: editquizid          
          }
        }
      }))
      fetch(`${env.ENDPOINT}decks/${quizid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          quizid: editquizid
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }
  }
  saveChanges = (quizid) => {
    fetch(`${env.ENDPOINT}decks/${quizid}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: this.state.currentDeck.name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  handleCardChange = (event,quizid,cardid) => {
      let cards = [...this.state.cardsHash[quizid]];
      let cardIndex = cards.findIndex(card => card.id === cardid);
      if(event.target.value===""){
        event.target.value = null;
      }
      cards[cardIndex][event.target.name] = event.target.value;


    
      let newCardsHash = this.state.cardsHash;

      newCardsHash[quizid.toString()] = cards;
      

      fetch(`${env.ENDPOINT}cards/${cardid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          [event.target.name]: event.target.value
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((data) => {
          this.setState({cardsHash: newCardsHash});
        } );
  }

  triggerEditDeckState = (id) => {
    console.log("deck id",id)
    this.setState({
      currentDeck: id,
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
  triggerStudyDeckState = id => {
    console.log(id);
    this.setState({
      currentDeck: id.toString(),
      isCreateState: false,
      isEditDeckState: false,
      isViewDecksState: false,
      isStudyDeckState: true,
    });
  }
  triggerViewDecksState = () => {
    this.setState({
      newCardBack: "",
      newCardFront: "",
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

          {this.state.isEditDeckState && <EditDeck onGetDecks={this.getDecks} deckHash={this.state.deckHash} cardsHash={this.state.cardsHash} decks={this.state.decks} onSaveName={this.saveName}
          newCardFront={this.state.newCardFront} newCardBack={this.state.newCardBack}
          onNewCardChange={this.handleNewValuesAdded} onCardAdd={this.addCardToDeck}
          currentDeck={this.state.currentDeck} onHandleDeckChange={this.handleDeckChange}
          onHandleCardChange={this.handleCardChange} onDeleteCard={this.deleteCard}
           />}

          {this.state.isViewDecksState && <ViewDecks cardsHash={this.state.cardsHash} onGetDecks={this.getDecks} decks={this.state.decks} onEditDeck={this.triggerEditDeckState} onDeleteDeck={this.deleteDeck} onStudyDeck={this.triggerStudyDeckState}/>}
          {this.state.isStudyDeckState && <StudyDeck deckHash={this.state.deckHash} cardsHash={this.state.cardsHash} currentDeck={this.state.currentDeck} />}
          {this.state.decks.length === 0 && this.state.isViewDecksState && <Container><Row><Col md={{span: 6, offset: 3}}><Alert variant="warning" className="mt-5">You currently have no Flashcard Decks. Click Create New Flashcard Deck to add one</Alert></Col></Row></Container>}

      </div>
    );
  }

}

export default App;