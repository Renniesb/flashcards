import React, { Component } from 'react';

class EditDeck extends Component {

  render() {

      return (
      <div>
        <input type="text" name="name" value={this.props.currentDeck.name}
          onChange={(e)=>{this.props.onHandleDeckChange(e,this.props.currentDeck)}}
         />
         <textarea name="description" value={this.props.currentDeck.description}
          onChange={(e)=>{this.props.onHandleDeckChange(e,this.props.currentDeck)}}
         ></textarea>
        {this.props.currentDeck.cards.map((card)=>{

            return (
              <div> Front: <textarea name="front" value = {card.front}
            onChange = { e => this.props.onHandleCardChange(e,this.props.currentDeck,card)}/>
               Back: <textarea name="back" value = {card.back}
            onChange = {e => this.props.onHandleCardChange(e,this.props.currentDeck,card)}/>
              <button onClick={ e => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.onDeleteCard(e,card)}
              }>Delete</button>
             </div>
           )
        })}

        <form className="newCard">
         <h3>Create a new Card</h3>
         <div className="form-group">
           <label htmlFor="label">Card Front</label>
           <input className="form-control"
             value = {this.props.newCardFront} name="newCardFront" onChange={e => {this.props.onNewCardChange(e)}}/>
         </div>
         <div className="form-group">
           <label htmlFor="description">Card Back</label>
           <textarea className="form-control" value = {this.props.newCardBack}
             name="newCardBack" onChange={e => {this.props.onNewCardChange(e)}} />
         </div>
         <button type="submit" className="btn btn-primary" onClick={e=>{this.props.onCardAdd(e)}}>
            Create Card
         </button>
       </form>


      </div>

      )
  }

}

export default EditDeck;
