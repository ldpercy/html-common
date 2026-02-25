Testing
=======



Test categories
---------------
* equality -  IsStrictlyEqual, IsLooselyEqual
* equivalence - to some specified level
* greater/less than a specified comparator
* typeof
* instanceof
* exceptions
* Deep equality?
* ???




Empty tests, `every` & vacuous truths
-------------------------------------

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

> true unless callbackFn returns a falsy value for an array element, in which case false is immediately returned.

> every acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns true. (It is vacuously true that all elements of the empty set satisfy any given condition.)


The `every` method is "none false" - something in the array *has* to be false otherwise it returns true.
Don't feel like boxing with set theorists so I'll go with their findings.
**An empty test passes.**

https://en.wikipedia.org/wiki/Vacuous_truth#In_computer_programming

I may have need for a stronger assertion of "all true" in some cases - try to find a reference or precedent.



Grouping and nesting
--------------------

Need to sort out some structure and vocab for grouped and nested tests.

