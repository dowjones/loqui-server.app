var deepmerge = require('deepmerge');

exports.merge = function (a, b) {
  if (typeof a === 'object' && typeof b === 'object') {

    if (a.method === 'counter' && a.value.counter && b.value.counter) {
      b.value.counter = a.value.counter += b.value.counter;
    }
    return deepmerge(b, a);
  }
  return a;
}
