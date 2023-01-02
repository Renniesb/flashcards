import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Card, Container, Row, Col, Alert} from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import BgTitle from '../BgTitle';

 class StudyDeck extends Component {

   state = {
     cardIndex: 0,
     isFlipped: false,
     cardNumber: 1,
     cardRight: true,
     sampleDeck: {deckname: "Sample Deck"},
     sampleCards: [{
      front: "Interpret",
      back: "To execute a program in a high-level language by translating it one line at a time."},
      {
      front: "Program",
      back: "A set of instructions that specifies a computation."
      },
      {
        front:"Source code",
        back:"A program in a high-level language."
      }]
   }

    handleCardChange = e => {

      let name = e.target.name;

      e.preventDefault()

      if( name === "flip"){
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      }

      if(name === "forward"){

        this.setState(prevState => {


          return {cardIndex: prevState.cardIndex + 1, isFlipped: false, cardNumber: prevState.cardNumber + 1, cardRight: true}

        })

      }

      if (name === "goBack"){
        this.setState(prevState => {

          return {cardIndex: prevState.cardIndex - 1, isFlipped: false, cardNumber: prevState.cardNumber - 1, cardRight: false}

        })
      }

    }
    isDeckEmpty=()=>{
      if(this.props.cardsHash[this.props.currentDeck]?.length > 0){
        return false
      } 
      else{
        return true
      }
    }
    cardContents=(side)=>{

      let contents = this.props.currentDeck !== "0" ? this.props.cardsHash[this.props.currentDeck][this.state.cardIndex]?.[side] : this.state.sampleCards[this.state.cardIndex][side];
      let imageLink = "imagelink";

      if(this.isDeckEmpty() && this.props.currentDeck !== "0"){
        return <Alert variant="warning">You have no cards in this deck, Add cards to view</Alert>
      } else if(contents.includes(imageLink)) {
        let link = contents.replace(imageLink,'').trim()
        return <img alt="flashcard content" className="quizimg" src={link} />
      } else {
        return contents
      }
      

    }
    render(){

      return (
      <Container>
          <Row>
            <Col md={{span:6, offset: 3}}>
              <h3 style={{marginTop: 25, marginBottom: 20}}>Studying: {this.props.currentDeck !== "0" ? this.props.deckHash[this.props.currentDeck].deckname : this.state.sampleDeck.deckname}</h3>
              <div key={this.state.cardNumber} className={this.state.cardRight ? 'swing-in-right-bck' : 'swing-in-left-bck'}>
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                  <Card key="front">
                    <BgTitle className="card-header" as="h4" >Term:</BgTitle>
                    <Card.Body>
                      <Card.Title as="h4" style={{minHeight: 150}} className="h-100 align-items-center justify-content-center d-flex">
                      {this.cardContents("front")}
                      </Card.Title>
                      <div className="text-right">
                        <Button variant="secondary" name="flip" onClick={(e)=>{this.handleCardChange(e)}}>Flip Card</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card key="back">
                    <BgTitle className="card-header" as="h4">Definition:</BgTitle>
                    <Card.Body>
                      <Card.Title as="h4" style={{minHeight: 150}} className="h-100 align-items-center justify-content-center d-flex">
                      {this.cardContents("back")}
                      </Card.Title>
                      <div className="text-right">
                        <Button variant="secondary" name="flip" onClick={(e)=>{this.handleCardChange(e)}}>Flip Card</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </ReactCardFlip>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{span:6, offset: 3}} >
            <div className="text-center">
              <Button style={{marginTop: 10, marginRight: 15}} variant="outline-dark" className="center-block" name="goBack" disabled={this.state.cardIndex === 0} onClick={(e)=>{this.handleCardChange(e)}}>{"<"}</Button>
              {this.state.cardNumber}/{this.props.currentDeck !== "0" ? this.props.cardsHash[this.props.currentDeck].length : this.state.sampleCards.length }
              <Button style={{marginTop: 10, marginLeft: 15}} variant="outline-dark" disabled={this.state.cardIndex === (this.props.currentDeck !== "0" ? this.props.cardsHash[this.props.currentDeck].length - 1 : this.state.sampleCards.length - 1)}
              name="forward"
              onClick={(e)=>{this.handleCardChange(e)}}>{">"}</Button>
            </div>
            </Col>
          </Row>
        </Container>
      )
    }
  }

export default StudyDeck;
