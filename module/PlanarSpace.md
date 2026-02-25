Planar Space
============


A simple representation of a Euclidean plane.



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

