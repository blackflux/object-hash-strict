const assert = require('assert');
const objectHash = require('object-hash');
const objectScan = require('object-scan');

const INVALID = [undefined];
const scanner = objectScan(['**'], {
  joined: true,
  filterFn: (key, value, { context }) => {
    if (INVALID.includes(value) && !context.allowedUndefined.includes(key)) {
      throw new Error(`Bad value "${value}" for key "${key}" detected`);
    }
  }
});

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
