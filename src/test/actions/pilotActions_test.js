'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import { Action, Flux } from 'flummox';
import { Pilot } from '../fixtures/pilot';
import PilotActions from '../../js/actions/PilotActions';

describe('pilotAction', () => {

  var flux, actions, fakeDb;

  beforeEach(() => {
    fakeDb = {
      post: sinon.spy()
    };
    flux = new Flux();
    actions = flux.createActions('test', PilotActions, fakeDb);
  });

  it('should have an instance of db', () => {
    expect(actions.db).to.deep.equal(fakeDb);
  });

  it('should be create a new pilot', () => {
    expect(actions.create(Pilot)).to.deep.equal(Pilot);
  });

});
