import React, { Component } from 'react';

class ViewDecks extends Component {

  render() {
    return (
      <div>
        {this.props.decks.map((deck)=>{
          return (
            <div>
              <span>{deck.name} <button onClick={()=>{this.props.onEditDeck(deck)}}>Edit</button> </span>
            </div>
          )
        })}
      </div>
    );
  }

}

export default ViewDecks;
