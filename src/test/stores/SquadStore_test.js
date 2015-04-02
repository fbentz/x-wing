'use strict';
import { expect } from 'chai';
import SquadStore from '../../js/store/SquadStore';

describe('SquadStore', () => {

  it('should be an object', function () {
    expect(new SquadStore()).to.be.an.instanceOf(SquadStore);
  });

  it('should have an empty list of ships', function () {
    var squad = new SquadStore();
    expect(squad.getStateAsObject().ships).to.have.length.of(0);
  });

  it('should have 0 points by default', function () {
    var squad = new SquadStore();
    expect(squad.getStateAsObject().total).eql(0);
  });

  it('should have a type of squad', function () {
    var squad = new SquadStore();
    expect(squad.getStateAsObject().type).eql(null);
  });

  it('should be able to add a ship to the list of ships', function() {
    var squad = new SquadStore();
    var fakeShip = {ship: 'obiwan', points: 0};

    squad.addShip(fakeShip);

    expect(squad.getStateAsObject().ships.length).to.be.above(0);
    expect(squad.getStateAsObject().ships[0]).eql(fakeShip);
  });

});
