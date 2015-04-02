'use strict';
import { Store } from 'flummox';

export default class SquadStore extends Store {
  constructor() {
    this.state = {
      ships: [],
      type: null,
      total: 0
    };
  }

  addShip(ship) {
    this.setState({
      ships: this.state.ships.concat(ship)
    });
  }
}
