import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class EditDeck extends Component {

  render() {

      return (

      <Container>
        <Row>
          <Col md={{span:6, offset: 3}}>
            <InputGroup className="mb-3 mt-3">
              <InputGroup.Prepend>
                <InputGroup.Text><strong>Deck Name:</strong> </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl name="name" value={this.props.currentDeck.name}
                onChange={(e)=>{this.props.onHandleDeckChange(e,this.props.currentDeck)}}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text><strong>Deck Description:</strong> </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" name="description" value={this.props.currentDeck.description}
               onChange={(e)=>{this.props.onHandleDeckChange(e,this.props.currentDeck)}}/>
            </InputGroup>
          </Col>
        </Row>

        {this.props.currentDeck.cards.map((card,i)=>{

            return (


              <Row key={i}>
                <Col md={{span:6, offset: 3}}>
                  <Card className="mb-4">
                    <Card.Header><strong>Card {i + 1}</strong></Card.Header >
                    <Card.Body>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-lg"><strong>Term</strong> </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" name="front" value = {card.front}
                      onChange = { e => this.props.onHandleCardChange(e,this.props.currentDeck,card)}
                      aria-label="With textarea" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="inputGroup-sizing-lg"><strong>Definition</strong>:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="back" value = {card.back}
                     onChange = {e => this.props.onHandleCardChange(e,this.props.currentDeck,card)}
                      as="textarea" aria-label="With textarea" />
                      </InputGroup>
                      <Button variant="outline-dark" onClick={ e => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.onDeleteCard(e,card)}
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
                 value = {this.props.newCardFront} name="newCardFront" onChange={e => {this.props.onNewCardChange(e)}}/>
             </div>
             <div className="form-group">
               <label htmlFor="description">Definition:</label>
               <textarea className="form-control" value = {this.props.newCardBack}
                 name="newCardBack" onChange={e => {this.props.onNewCardChange(e)}} />
             </div>
             <Button variant="secondary" className="mb-3" type="submit" onClick={e=>{this.props.onCardAdd(e)}}>
                Add Card
             </Button>
           </form>
          </Col>

        </Row>

      </Container>

      )
  }

}

export default EditDeck;
