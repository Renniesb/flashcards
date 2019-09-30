import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';

class CreateDeck extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col md={{span:6, offset: 3}}>
            <form className="demoForm">
             <h3 style={{marginTop: 25, marginBottom: 20}}>Create a Flashcard Deck</h3>
             <div className="form-group">
               <label htmlFor="label">Deck Name</label>
               <input className="form-control"
                 name="newDeckName" onChange={e => {this.props.onNewDeckChange(e)}}/>
             </div>
             <div className="form-group">
               <label htmlFor="description">Description</label>
               <textarea className="form-control"
                 name="newDeckDescription" onChange={e => {this.props.onNewDeckChange(e)}} />
             </div>
             <Button variant="secondary" type="submit" className="btn btn-primary" onClick={this.props.onAddDeck}>
                Create Deck
             </Button>
           </form>
          </Col>
        </Row>

      </Container>

    );
  }

}

export default CreateDeck;
