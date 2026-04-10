HTML App
========

A small class that combines a few common page setup features.

Event registration is split into two phases:
1. Register initial DOMContentLoaded event at load/instantitaion time
2. Register any other events after that one fires



Methods
-------


### *static* newKeyboardHandler

Returns a function for key-to-handler mapping.
* The keydown event listener needs to be registered elsewhere
* Filters out ctrl, alt and meta combos to not interrupt browser/os operation.
* Currently prevents default, but may remove this

Add to class in the constructor :
```js
	this.keyboardHandler = HTMLApp.newKeyboardHandler(keyFunctionMap, this);
```
Example key function map:
```js
	keyFunctionMap = {
		'?'	: this.showAppInfoDialog,
		' ' : this.playPauseHandler,
	};
```

Example keydown listener:
```js
	{
		element: document,
		type: 'keydown',
		listener: (event) => { this.keyboardHandler(event); }		//	Use this for one generated from HTMLApp
	},
```

Not yet sure how 'this' binding will work in a raw module, will have to try.




Original doco
-------------

>
> [!NOTE]
> Everything below are the older notes as moved in from `experiment-html`
>
> All need to be reviewed and wikified
>







Binding of 'this' for listeners
-------------------------------

In a class context it's useful to have the 'this' bound to the instance so that methods can be called.
So far that's what I've been doing by default in `addEventListeners`:
```js
	// forEach node
	node.addEventListener(
		item.type,
		listenerFunction.bind(this)
	);
```
But there are cases where I want the stock element 'this' to carry through so I can read where the event took place.
So it would be nice to have some options here.

* See if the bind can be added in `eventListeners` array - don't think i like this option, but curious to see if it works
* Force the use of separate listeners/handlers - listeners could hopefully use a 'this' synonym to call instance methods



### Setting `bind` in the listeners array
Turns out it does work:
```js
{
	query: '#form-polygon',
	type: 'change',
	listener: this.polygonChangeListener.bind(this)		// changing the binding here *works* !!!
},
```
So combined with the fact that normal listener rego is working for me now, this will probably be the way to go:
* bind `this` to the instance for quick'n'dirty event rego where a separate listener isn't needed to grab the event target
* leave raw when using a dedicated listener to get info about the originating element


Ahh actually the 'instance' synonym isn't going to work because it exists as 'this.instance' and 'this' is already different.
Might need to pass it as a listener param.

For now I'm going to stick with binding 'this' to the instance by default as only the listener element is lost, but importantly the instance context is gained.


Listener Types
--------------

### Raw

Calls the listener function with 'this' bound to the originating element:
```js
	listener: this.rawListenerFunction

	...

	rawListenerFunction(event) {
		console.log('rawListenerFunction arguments', arguments);		// has normal arguments array
		console.log('rawListenerFunction event', event);				// receives event
		console.log('rawListenerFunction event.target', event.target);	// target	= originating element
		console.log('rawListenerFunction this', this);					// this		= listening element
		this.handler();													// cannot call instance handler as 'this' is now the listening element
	}
```

This style will give you both the originating element *and* the listening element.

This is only really useful for simple cases where the listener function does not require any further interaction with the instance.


### Bind 'this'

Calls the listener function with 'this' bound to the instance:
```js
	listener: this.listenerWithBindThis.bind(this)		// changing the binding here *works* !!!

	...

	listenerWithBindThis(event) {
		console.log('listenerWithBindThis arguments', arguments);		// has normal arguments array
		console.log('listenerWithBindThis event', event);				// receives event
		console.log('rawListenerFunction event.target', event.target);	// target	= originating element
		console.log('listenerWithBindThis this', this);					// receives instance as 'this'
		this.handler();													// can call instance handler
	}
```

This is much more useful for complex tasks, but only passes you the event originator (not the listener) as `this` has been re-bound to the instance.

I think 90+% of the time I'll want to bind the instance `this` for html apps, so much that it's probably worth leaving in as part of the stock addEventListeners method.

There might be dynamic cases where elements are created and events bound on the fly that need to reference the listening element, but that's way far in the future.

For all these simple static cases binding this should be fine.


### IIFE

TBD.

There might be some extended things possible with IIFE style listeners.

```js
	listener: ((event,this) => { return this.styleChangeListener(event, this); } )()
```



Event listener registration
---------------------------

All of a sudden 'normal' listener registration is working for me... (without the function execution).

Not sure what's going on - was I doing something wrong in the past?
Was it something specific to the way I was doing things in year-clock?

I'd better test this some more.








