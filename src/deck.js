class Deck {
  cards = [];
  constructor(name="No name given",description ="no description given"){
    this.name = name;
    this.description = description;
  }
  createCard(front,back) {
    this.cards.push({front: front, back: back})
    return this.cards
  }

}
