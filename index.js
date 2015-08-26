/**
 * Module Dependencies
 */

var is_object = require('is-object')
var foreach = require('foreach')
var wrapped = require('wrapped')
var Batch = require('batch')
var is_array = Array.isArray
var noop = function () {}

/**
 * Export `stroll`
 */

module.exports = stroll

/**
 * Initialize `stroll`
 *
 * @param {Mixed} value
 * @param {Function} fn
 * @param {Function} done
 */

function stroll (value, fn, done, key) {
  var wrap = wrapped(fn)
  var batch = Batch()
  var out

  if (is_object(value)) {
    out = {}
    foreach(value, function (v, k) {
      batch.push(function (next) {
        stroll(v, fn, function(err, value) {
          if (err) return next(err)
          out[k] = value
          next()
        }, k)
      })
    })
  } else if (is_array(value)) {
    out = []
    foreach(value, function(v, k) {
      batch.push(function (next) {
        stroll(v, fn, function(err, value) {
          if (err) return next(err)
          out[k] = value
          next()
        }, k)
      })
    })
  } else {
    out = null
    batch.push(function (next) {
      wrap(value, key, function(err, v) {
        if (err) return next(err)
        out = v
        next()
      })
    })
  }

  function run (fn) {
    batch.end(function (err, v) {
      if (err) return fn(err)
      return fn(null, out)
    })
  }

  // run if we have a callback
  done && run(done)

  // thenable
  stroll.then = function (fulfill, reject) {
    run(function(err, value) {
      err ? reject(err) : fulfill(value)
    })
  }

  return stroll
}
