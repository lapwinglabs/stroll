
# stroll

  asynchronously & recursively walk through an object, array or literal.

  uses [wrapped](https://github.com/matthewmueller/wrapped) to provide generator and promise support.

## installation

```
npm install stroll
```

## Usage

```js
var stroll = require('stroll')

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
  if (err) throw err;
  assert.deepEqual(obj, {
    a: 'a a',
    b: ['b0 b0', 'b1 b1'],
    c: 'c c',
    d: {
      e: 'e e',
      f: 'f f'
    }
  })
})
```

## API

##### `stroll(value, fn, done)`

recursively stroll through `value`, calling `fn` on each literal.
`done` is called when all functions have finished.

## License

(The MIT License)

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
