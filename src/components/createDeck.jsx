import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {Container, Col, Row} from 'react-bootstrap';
import env from '../config.js';



function CreateDeck({onNewDeckChange,onAddDeck}) {
  const [filteredQuizzes, setQuizzes] = useState([]);
  const [deckId, setDeckId] = useState(0);
  
  useEffect(() => {
    Promise.all([
      fetch(`https://still-garden-93095.herokuapp.com/api/quiz`),
      fetch(`${env.ENDPOINT}decks`),
    ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([quizzes, decks]) => {
      let deckIdsList = decks.map(deck=> deck.deckid)
      let quizList = quizzes.filter(quiz=>!deckIdsList.includes(quiz.id))
      setDeckId(quizList[0].id)
      setQuizzes(quizList)
    }).catch((err) => {
        console.log(err);
    });

  }, [])

    return (
      <Container>
        <Row>
          <Col md={{span:6, offset: 3}}>
            <form className="demoForm">
             <h3 style={{marginTop: 25, marginBottom: 20}}>Create a Flashcard Deck</h3>
             <div className="form-group">
               <label htmlFor="label">Deck Name</label>
               <input className="form-control"
                 name="newDeckName" onChange={e => {onNewDeckChange(e)}}/>
             </div>
             <div className="form-group">
               <label htmlFor="description">Description</label>
               <textarea className="form-control"
                 name="newDeckDescription" onChange={e => {onNewDeckChange(e)}} />
             </div>
             <h2 style={{"paddingTop": "10px"}}>Link to a quiz</h2>
             <select onChange={event => setDeckId(event.target.value)} id="select" value={deckId}>
               {filteredQuizzes.map(quiz=><option key={quiz.id+1} value={quiz.id}>{quiz.quizname}</option>)}
             </select>
             <Button style={{"marginTop": "15px"}} variant="secondary" type="submit" className="btn btn-primary" onClick={(e)=>{onAddDeck(e,deckId)}}>
                Create Deck
             </Button>
           </form>
          </Col>
        </Row>

      </Container>

    );

}

export default CreateDeck;
