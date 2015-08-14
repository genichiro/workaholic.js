workaholic.js [![Bower version](https://badge.fury.io/bo/workaholic.js.svg)](http://badge.fury.io/bo/workaholic.js)
===

## Overview
_workaholic.js_ is multi-threading library for Javascript.
it employs a worker thread pattern.

### Installation
```
$ bower install --save workaholic.js
```
```html
<script type="text/javascript" src="./workaholic.js"></script>
```

### Usage
```javascript
var workaholic = Workaholic.create(2);  // create pool, you can set number of threads

var foo = 3;
var bar = 5;
var baz = 10;
workaholic.execute(
    foo, bar, baz, // before function, you can put as many values as you need
    function(a, b, c) {
        // will run on pooled thread
        var sum = a + b + c;
        finish(sum);  // you must call `finish()` after your work, that can return any value
    }
)
.done(function(result) {
    // get value likes promise chain
});
```

## Demo

run `gulp` and open `http://127.0.0.1:5000/demo`
