import React, { Component } from 'react';

class ViewDecks extends Component {

  render() {
    return (
      <div>
        {this.props.decks.map((deck)=>{
          return (
            <div>
              <span>{deck.name}
              <button onClick={()=>{this.props.onEditDeck(deck)}}>Edit</button>
              <button onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.onDeleteDeck(e,deck) } }>Delete</button>
              <button onClick={()=>{this.props.onStudyDeck(deck)}}>Study Deck</button>
              </span>
            </div>
          )
        })}
      </div>
    );
  }

}

export default ViewDecks;
