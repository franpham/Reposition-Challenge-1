var expect = chai.expect;

describe('Resort', function() {
  it("No one can sit in adjacent seat, and new neighbors can't be old neighbors", function() {
    resort();
    for (var i = 0; i < list.length; i++) {
      check(list[i]);
    };
    expect(list.length).to.equal(0);
  });
});