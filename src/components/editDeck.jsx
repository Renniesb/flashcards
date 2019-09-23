import React, { Component } from 'react';

class EditDeck extends Component {

  render() {
    let deckInfo = this.props.decks.map((d)=>{
      return (
      <div>
        <h1>{d.name}</h1>
        <ul>{d.cards.map((card)=>{
          return (
            < li > Front: <input name="front" value = {card.front}
            onChange = {(e)=>{this.props.onHandleCardChange(e,d,card)}}/>
             {card.front} <br/> Back: <input name="back" value = {card.back}
            onChange = {(e) => {this.props.onHandleCardChange(e,d,card)}}/>
             {card.back}</li >
          )
        })}</ul>
      </div>

      )
    })
    return (
      <div>
        {deckInfo || <h3>You don't have any decks to show yet</h3>}
      </div>
    );
  }

}

export default EditDeck;
