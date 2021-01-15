const assert = require('assert');
const objectHash = require('object-hash');
const objectScan = require('object-scan');

const scanner = objectScan(['**'], {
  joined: true,
  filterFn: ({ getKey, value, context }) => {
    if (value === undefined) {
      const key = getKey();
      if (!context.allowUndefined.includes(key)) {
        throw new Error(`Bad value "${value}" for key "${key}" detected`);
      }
    }
  }
});

const validateObject = (obj, opts_ = {}) => {
  assert(!('allowedUndefined' in opts_), 'Bad option "allowedUndefined" provided.');
  const opts = {
    allowUndefined: [],
    ...opts_
  };
  const isArray = Array.isArray(opts.allowUndefined);
  assert(isArray || typeof opts.allowUndefined === 'boolean', 'Invalid Option Provided');
  if (opts.allowUndefined !== true) {
    scanner(obj, { allowUndefined: isArray ? opts.allowUndefined : [] });
  }
  return obj;
};

const wrap = (fn) => (object, ...args) => fn(validateObject(object, args[0]), ...args);

module.exports = Object
  .entries(objectHash)
  .reduce(
    (p, [k, v]) => Object.assign(p, { [k]: wrap(v) }),
    wrap(objectHash)
  );
