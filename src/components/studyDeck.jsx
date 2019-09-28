import React, {Component} from 'react';

 class StudyDeck extends Component {

   state = {
     cardIndex: 0,
     cardSide: "front"
   }


    handleCardChange = e => {

      let name = e.target.name;


      if( name === "flip"){
        this.state.cardSide === "front" ? this.setState({cardSide:"back"}) : this.setState({cardSide:"front"});
      }

      if(name === "forward"){

        this.setState(prevState => {


          return {cardIndex: prevState.cardIndex + 1, cardSide: "front"}

        })

      }

      if (name === "goBack"){
        this.setState(prevState => {

          return {cardIndex: prevState.cardIndex - 1, cardSide: "front"}

        })
      }

      e.preventDefault()
    }
    render(){

      return (
        <div>
          <h1>{this.props.currentDeck.name}</h1>
          <button name="goBack" disabled={this.state.cardIndex == 0} onClick={(e)=>{this.handleCardChange(e)}}>back</button>
          {this.props.currentDeck.cards[this.state.cardIndex][this.state.cardSide]}
          <button disabled={this.state.cardIndex == this.props.currentDeck.cards.length - 1} name="forward" onClick={(e)=>{this.handleCardChange(e)}}>forward</button>
          <button name="flip" onClick={(e)=>{this.handleCardChange(e)}}>Flip Card</button>
        </div>
      )
    }
  }

export default StudyDeck;
