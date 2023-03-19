import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {Container, Col, Row} from 'react-bootstrap';
import env from '../config.js';



function CreateDeck({onNewDeckChange,onAddDeck}) {
  const [filteredQuizzes, setQuizzes] = useState([{id: 1, quizname: 'Loading...'}]);
  const [quizid, setQuizId] = useState(0);
  
  useEffect(() => {
    Promise.all([
      fetch(`${env.ENDPOINT}quiz`),
      fetch(`${env.ENDPOINT}decks`),
    ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([quizzes, decks]) => {
      let quizIdsList = decks.map(deck=> deck.quizid)
      let quizList = quizzes.filter(quiz=>!quizIdsList.includes(quiz.id)|| quizIdsList.includes(quizid))
      setQuizId(quizList[0].id)
      setQuizzes(quizList)
    }).catch((err) => {
        console.log(err);
    });

  }, [quizid])

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
             <select onChange={event => setQuizId(event.target.value)} id="select" value={quizid}>
               {filteredQuizzes.map(quiz=><option key={quiz.id+1} value={quiz.id}>{quiz.quizname}</option>)}
             </select>
             <Button style={{"marginTop": "15px"}} variant="secondary" type="submit" className="btn btn-primary" onClick={(e)=>{onAddDeck(e,quizid)}}>
                Create Deck
             </Button>
           </form>
          </Col>
        </Row>

      </Container>

    );

}

export default CreateDeck;
