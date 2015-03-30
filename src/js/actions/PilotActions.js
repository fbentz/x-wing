'use strict';
import { Actions } from 'flummox';

export default class PilotActions extends Actions {

  constructor(db) {
    super();
    this.db = db;
  }

  async create(pilot) {
    const response = await this.db.post(pilot);
    return response;
  }

}
