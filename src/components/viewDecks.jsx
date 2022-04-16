import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';




class ViewDecks extends Component {
  componentDidMount() {
    this.props.onGetDecks()
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={{span: 6, offset: 3}}>
          {this.props.decks.map((deck, i)=>{

            return (
                <Card key={i} className="mt-4">
                  <Card.Body>
                    <Card.Title>{deck.deckname}</Card.Title>
                    <Card.Text>{deck.deckdescription}</Card.Text>
                    <Card.Text className="mt-3"><strong>- {this.props.cardsHash[deck.id] ? this.props.cardsHash[deck.id].length : 0 } cards</strong></Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <Button className="mt-1" style={{marginRight: 10}} variant="outline-dark" onClick={()=>{this.props.onEditDeck(deck.id)}}><FontAwesomeIcon icon={faEdit}/> Edit</Button>
                  <Button className="mt-1" style={{marginRight: 10}} variant="outline-dark" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.onDeleteDeck(e,deck) } }><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                  <Button className="mt-1" style={{marginRight: 10}} variant="outline-dark" onClick={()=>{this.props.onStudyDeck(deck.id)}}><FontAwesomeIcon icon={faBook}/> Study Deck</Button>
                  </Card.Footer>
                </Card>
            )
          })}
          </Col>
        </Row>

        </Container>
    );
  }

}

export default ViewDecks;
