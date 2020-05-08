const { expect } = require('chai');
const { roomPassGen } = require('../utils/sockets-util');

describe('Room password generator', () => {
  it('must generate a room password with the room name and a random number', () => {
    const actual = roomPassGen('test');
    expect(actual).to.be.a('string');
    expect(actual).to.include('test', '#');
  });
});
