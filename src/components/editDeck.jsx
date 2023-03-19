import React, {useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import env from '../config.js';



function EditDeck ({currentDeck,deckHash,cardsHash, onHandleDeckChange,onHandleCardChange, onDeleteCard, newCardFront,newCardBack, onNewCardChange, onCardAdd}) {
  const [filteredQuizzes, setQuizzes] = useState([{id: 1, quizname: 'Loading...'}]);
  console.log('the current deck', currentDeck );
  const [quizid, setQuizId] = useState(Number(deckHash[currentDeck].quizid));
  
  useEffect(() => {
    Promise.all([
      fetch(`${env.Quizzes}quiz`),
      fetch(`${env.ENDPOINT}decks`),
    ]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([quizzes, decks]) => {
      let quizIdsList = decks.map(deck=> deck.quizid)
      let quizList = quizzes.filter(quiz=>!quizIdsList.includes(quiz.id) || quizIdsList.includes(quizid));
      // let quizList = quizzes.filter(quiz=>!quizIdsList.includes(quiz.id));

      setQuizzes(quizList)
    }).catch((err) => {
        console.log(err);
    });

  },[quizid]);

  // const [state, setState] = useState([])
  // const [query, setQuery] = useState()
  // useEffect(() => {
  //     fetch("/api/data?q=" + query).then(
  //         res => setState(res.data)
  //     )
  // }, [query])
      // console.log(deckHash[currentDeck].deckdescription)
      // onChange={(e)=>{onHandleDeckChange(e,currentDeck)}
      const changeQuizId = (e) => {
        setQuizId(e.target.value);
        onHandleDeckChange(e,currentDeck)

      }
      return (
      
      <Container>
        <Row>
          <Col md={{span:6, offset: 3}}>
            <InputGroup className="mb-3 mt-3">
              <InputGroup.Prepend>
                <InputGroup.Text><strong>Deck Name:</strong> </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name="deckname" value={deckHash[currentDeck].deckname}
                onChange={(e)=>{onHandleDeckChange(e,currentDeck)}}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text><strong>Deck Description:</strong> </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" name="deckdescription" value={deckHash[currentDeck].deckdescription} onChange={(e)=>{onHandleDeckChange(e,currentDeck)}}/>
            </InputGroup>
          </Col>
        </Row>


        {cardsHash[currentDeck] && cardsHash[currentDeck].map((card,i)=>{

            return (

              <Row key={i}>
                <Col md={{span:6, offset: 3}}>
                  <Card className="mb-4">
                    <Card.Header><strong>Card {i + 1}</strong></Card.Header>
                    <Card.Body>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-lg"><strong>Term</strong> </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" name="front" value = {card.front}
                      onChange = { e => onHandleCardChange(e,currentDeck,card.id)}
                      aria-label="With textarea" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-lg"><strong>Definition</strong>:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="back" value = {card.back}
                     onChange = {e => onHandleCardChange(e,currentDeck,card.id)}
                      as="textarea" aria-label="With textarea" />
                      </InputGroup>
                      <Button variant="outline-dark" onClick={ e => { if (window.confirm('Are you sure you wish to delete this item?')) onDeleteCard(e,card,currentDeck)}
                    }><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
           )
        })}

        <Row>
          <Col md={{span:6, offset: 3}}>
            <form className="newCard">
             <h3>Add a Card to the Deck</h3>
             <div className="form-group">
               <label htmlFor="label">Term:</label>
               <input className="form-control"
                 value = {newCardFront} name="newCardFront" onChange={e => {onNewCardChange(e)}}/>
             </div>
             <div className="form-group">
               <label htmlFor="description">Definition:</label>
               <textarea className="form-control" value = {newCardBack}
                 name="newCardBack" onChange={e => {onNewCardChange(e)}} />
             </div>
             <Button variant="secondary" className="mb-3" type="submit" onClick={e=>{onCardAdd(e,currentDeck)}}>
                Add Card
             </Button>
             <h2 style={{"paddingTop": "10px"}}>Link to a quiz</h2>
             <select name="quizid" onChange={e => changeQuizId(e)} id="select" value={quizid}>
               {filteredQuizzes.map(quiz=><option key={quiz.id+1} value={quiz.id}>{quiz.quizname}</option>)}
             </select>
           </form>
          </Col>

        </Row>

      </Container>

      )
  

}

export default EditDeck;
