Testing
=======


This **really** isn't the sort of thing I should be attempting, but there's basically nothing built into core js or the apis that I can see save for the lonely `console.assert()` function.

So I'm going to whip together a little module to help with some things.



https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some





A single test will be:

* one or more values/expressions
* a predicate to be said about those values/expressions, eg allEqual

eg
	[1,2]



jsdoc
-----

I want to be able to declare a predicate function type, but not sure how to partial type or similar in jsdoc.




Tests needed
------------

* exceptions
