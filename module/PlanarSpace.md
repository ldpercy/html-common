Planar Space
============


A simple representation of a Euclidean plane.



Todo
----

* Rationalise some getter/converter method names and syntax


### return after a while
Coming back to look at this after while, a bunch of the methods could use use some explanatory notes about use.
I'm looking at the position methods now (trying to figure a bezier movement) and not sure which one to use.
* review the commented out polar interface
* The setXXX methods - are they there for interface implementation, chaining or what? Can they be changed to regular setters?
* A bunch more testing would be *really* nice, improvements to the testing in general...



Space Attachment
----------------


> [!IMPORTANT]
> Speculative, subject to revision

* Coordinates are abstract and can exist unattached to a space instance
* Pure angles are abstract and can exist unattached to a space instance
* Points and Positions require spatial context and must be attached to a space instance


### Points and Positions

Angular calculations will fail or produce spurious results when point and positions instances aren't attached to a space.

To avoid this set the space during construction, eg:

	p1 = new Point(spaceInstance, new CartesianCoordinates(0,0), 'p1');

Or use the space instances's convenience constructors:

	p1 = spaceInstance.newPoint(new CartesianCoordinates(0,0), 'p1');

