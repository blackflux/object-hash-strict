const assert = require('assert');
const objectHash = require('object-hash');
const objectScan = require('object-scan');

const INVALID = [undefined];
const scanner = (obj, { allowedUndefined }) => objectScan(['**'], {
  joined: true,
  filterFn: (key, value) => {
    if (INVALID.includes(value) && !allowedUndefined.includes(key)) {
      throw new Error(`Bad value "${value}" for key "${key}" detected`);
    }
  }
})(obj);

const validateObject = (obj, { allowedUndefined = [] } = {}) => {
  assert(Array.isArray(allowedUndefined), 'Invalid Option Provided');
  scanner(obj, { allowedUndefined });
  return obj;
};

const wrap = (fn) => (object, ...args) => fn(validateObject(object, args[0]), ...args);

module.exports = Object
  .entries(objectHash)
  .reduce(
    (p, [k, v]) => Object.assign(p, { [k]: wrap(v) }),
    wrap(objectHash)
  );
