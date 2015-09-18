var expect = chai.expect;

describe('Resort', function() {
  it("No one can sit in adjacent seat, and new neighbors can't be old neighbors", function() {
    resort();
    for (var i = 0; i < list.length; i++) {
      check(list[i]);   // check each node in new list for old neighbors;
      expect(getOldNeighbors(list[i].original_position)).to.not.equal(getNewNeighbors(i));
    };
    expect(dict.length).to.equal(0);
  });   // dict holds the neighbor violators
});