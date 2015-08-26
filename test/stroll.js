/**
 * Module Dependencies
 */

var assert = require('assert')
var stroll = require('..')

/**
 * Tests
 */

describe('objects', function() {
  it('should work with objects', function(done) {
    var obj = {
      a: 'a',
      b: 'b',
      c: 'c',
      d: {
        e: 'e',
        f: 'f'
      }
    }

    stroll(obj, function(v, k, next) {
      setTimeout(function() {
        next(null, v + v)
      }, 50)
    }, function(err, obj) {
      if (err) return done(err)
      assert.deepEqual(obj, {
        a: 'aa',
        b: 'bb',
        c: 'cc',
        d: {
          e: 'ee',
          f: 'ff'
        }
      })
      done()
    })
  })

  it('should pass errors through', function(done) {
    var obj = {
      a: 'a',
      b: 'b',
      c: 'c'
    }

    stroll(obj, function(v, k, next) {
      setTimeout(function() {
        if (v == 'b') {
          next(new Error('error on b'))
        } else {
          next(null, v + v)
        }
      }, 50)
    }, function(err, obj) {
      assert.equal(err.message, 'error on b')
      assert.ok(!obj)
      done()
    })
  })

  it('should support passing errors back into the object', function(done) {
    var obj = {
      a: 'a',
      b: 'b',
      c: 'c'
    }

    stroll(obj, function(v, k, next) {
      setTimeout(function() {
        next(null, new Error('error on ' + v))
      }, 50)
    }, function(err, obj) {
      if (err) return done(err)
      assert.equal(obj.a.message, 'error on a')
      assert.equal(obj.b.message, 'error on b')
      assert.equal(obj.c.message, 'error on c')
      done()
    })
  })
})

describe('arrays', function() {
  it('should work with arrays', function(done) {
    var arr = ['a', 'b', 'c']

    stroll(arr, function(v, k, next) {
      setTimeout(function() {
        next(null, v + v)
      }, 50)
    }, function(err, arr) {
      if (err) return done(err)
      assert.deepEqual(arr, [
        'aa',
        'bb',
        'cc'
      ])
      done()
    })
  })

  it('should pass errors through', function(done) {
    var arr = ['a', 'b', 'c']
    stroll(arr, function(v, k, next) {
      setTimeout(function() {
        if (v == 'b') {
          next(new Error('error on b'))
        } else {
          next(null, v + v)
        }
      }, 50)
    }, function(err, arr) {
      assert.equal(err.message, 'error on b')
      assert.ok(!arr)
      done()
    })
  })

  it('should support passing errors back into the array', function(done) {
    var arr = ['a', 'b', 'c']

    stroll(arr, function(v, k, next) {
      setTimeout(function() {
        next(null, new Error('error on ' + v))
      }, 50)
    }, function(err, arr) {
      if (err) return done(err)
      assert.equal(arr[0].message, 'error on a')
      assert.equal(arr[1].message, 'error on b')
      assert.equal(arr[2].message, 'error on c')
      done()
    })
  })
})

describe('literals', function() {
  it('should work with literals', function(done) {
    stroll(10, function(v, k, fn) {
      return fn(null, v + v)
    }, function(err, v) {
      if (err) return done(err)
      assert.equal(v, 20)
      done()
    })
  })

  it('should pass errors through', function(done) {
    stroll(10, function(v, k, fn) {
      return fn(new Error('10 is not okay'), v + v)
    }, function(err, v) {
      assert.equal(err.message, '10 is not okay')
      assert.ok(!v)
      done()
    })
  })

  it('should support passing errors back but not erroring out', function(done) {
    stroll(10, function(v, k, fn) {
      return fn(null, new Error('10 is not okay'))
    }, function(err, v) {
      if (err) return done(err)
      assert.equal(v.message, '10 is not okay')
      done()
    })
  })
})

describe('mixed', function() {
  it('should work with mixed values', function(done) {
    var obj = {
      a: 'a',
      b: ['b0', 'b1'],
      c: 'c',
      d: {
        e: 'e',
        f: 'f'
      }
    }

    stroll(obj, function(v, k, next) {
      setTimeout(function() {
        next(null, v + ' ' + v)
      }, 50)
    }, function(err, obj) {
      if (err) done(err);
      assert.deepEqual(obj, {
        a: 'a a',
        b: ['b0 b0', 'b1 b1'],
        c: 'c c',
        d: {
          e: 'e e',
          f: 'f f'
        }
      })
      done()
    })
  })
})
