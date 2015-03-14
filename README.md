#  Exercise

Load external foobar.js module

```
calvin % node
> va a = require('./foobar.js');
undefined
> a
{ foo: [Function], bar: [Function] }
```

Comment out the `bar` function in the module.exports in `foobar.js`.

```
> va a = require('./foobar.js');
undefined
> a
{ foo: [Function], bar: [Function] }
```

Even though `bar` method is no longer supposed to be exported from `foobar.js`, it is still loaded in.

This is because of node's require cache.

Let's see:

```
> require.cache
{ '/Users/calvin/work/nodeshell/foobar.js':
   { id: '/Users/calvin/work/nodeshell/foobar.js',
     exports: { foo: [Function], bar: [Function] },
     parent:
      { id: 'repl',
        exports: [Object],
        parent: undefined,
        filename: '/Users/calvin/work/nodeshell/repl',
        loaded: false,
        children: [Object],
        paths: [Object] },
     filename: '/Users/calvin/work/nodeshell/foobar.js',
     loaded: true,
     children: [],
     paths:
      [ '/Users/calvin/work/nodeshell/node_modules',
        '/Users/calvin/work/node_modules',
        '/Users/calvin/node_modules',
        '/Users/node_modules',
        '/node_modules' ] } }
```

As we can see, node has cached our previously required `foobar.js` and does not load the updated `foobar.js` file where `bar` method is not available.

How do we clear this `require.cache` in node shell so that we can reload our updated `foobar.js` file?

```
> delete require.cache[require.resolve('./foobar.js')];
true
> require.cache
{}
> var a = require('./foobar.js');
undefined
> a
{ foo: [Function] }
```

We first `require.resolve` the loaded file/module; and execute delete require.cache pointing to the resolved module key.

Now, when we `require` our `foobar.js` again, we now import the updated `foobar.js` file.

The easy way is to of course `Ctrl+C` twice to quit the node shell and `require` our updated file but this a good technique to know so we know our nodejs require behavior better.
