const stream = require('stream');
const expect = require('chai').expect;
const { describe } = require('node-tdd');
const objectHash = require('object-hash');
const objectHashStrict = require('../src/index');

describe('Testing object-hash-strict', () => {
  describe('Testing throws on undefined', () => {
    try {
      objectHashStrict({ key: undefined });
    } catch (e) {
      expect(e.message).to.equal('Bad value "undefined" for key "key" detected');
    }
  });

  describe('Comparing Behaviour to object-hash', () => {
    const toHash = { id: 0, name: 'Haley Rivera' };

    it('Comparing Signature', () => {
      expect(typeof objectHash).to.equal(typeof objectHashStrict);
      expect(Object.entries(objectHash).map(([k, v]) => [k, typeof v]))
        .to.deep.equal(Object.entries(objectHashStrict).map(([k, v]) => [k, typeof v]));
    });

    it('Comparing Base Function', () => {
      expect(objectHash(toHash)).to.equal(objectHashStrict(toHash));
    });

    it('Comparing sha1', () => {
      expect(objectHash.sha1(toHash)).to.equal(objectHashStrict.sha1(toHash));
    });

    it('Comparing keys', () => {
      expect(objectHash.keys(toHash)).to.equal(objectHashStrict.keys(toHash));
    });

    it('Comparing MD5', () => {
      expect(objectHash.MD5(toHash)).to.equal(objectHashStrict.MD5(toHash));
    });

    it('Comparing keysMD5', () => {
      expect(objectHash.keysMD5(toHash)).to.equal(objectHashStrict.keysMD5(toHash));
    });

    it('Comparing writeToStream', () => {
      const strm1 = new stream.PassThrough();
      const strm2 = new stream.PassThrough();

      objectHash.writeToStream(toHash, strm1);
      objectHashStrict.writeToStream(toHash, strm2);

      expect(strm1.read().toString()).to.equal(strm2.read().toString());
    });
  });
});
