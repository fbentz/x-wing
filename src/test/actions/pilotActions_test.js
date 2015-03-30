'use strict';
import { expect } from 'chai';
import sinon from 'sinon';
import { Action, Flux } from 'flummox';
import { Pilot } from '../fixtures/pilot';
import PilotActions from '../../js/actions/PilotActions';

describe('pilotAction', () => {

  var flux;
  var actions;
  var fakeDb;
  var sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fakeDb = {
      post: sinon.spy()
    };
    flux = new Flux();
    actions = flux.createActions('test', PilotActions, fakeDb);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should have an instance of db', () => {
    expect(actions.db).to.deep.equal(fakeDb);
  });

  it('should be create a new pilot', () => {
    // const promise = actions.create(Pilot);
    actions.create(Pilot);
    sinon.assert.calledWithExactly(fakeDb.post, Pilot);
    // return expect(promise).to.eventually.have(Pilot);
  });

});
