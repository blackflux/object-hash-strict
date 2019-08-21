const objectHash = require('object-hash');
const objectScan = require('object-scan');

const INVALID = [undefined];
const scanner = objectScan(['**'], {
  filterFn: (key, value) => {
    if (INVALID.includes(value)) {
      throw new Error(`Bad value "${value}" for key "${key}" detected`);
    }
  }
});

const validateObject = (obj) => {
  scanner(obj);
  return obj;
};

const wrap = (fn) => (object, ...args) => fn(validateObject(object), ...args);

module.exports = Object
  .entries(objectHash)
  .reduce(
    (p, [k, v]) => Object.assign(p, { [k]: wrap(v) }),
    wrap(objectHash)
  );
