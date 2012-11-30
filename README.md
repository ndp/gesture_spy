GestureSpy is a simple utility to spy on your users' actions when using touch-based
devices. It captures them and reports them to Google Analytics (or any mechanism
you choose).

This helps answer the questions about how users want to use your site on their
phones and tablets.
* Do they want to zoom in on that picture?
* Are they trying to swipe to see another product?

It's simple to integrate and does not affect the regular site behavior or performance.

## Usage
```
  <script src=".../gesture_spy.js"></script>
```
Then watch your Google Analytics account for the events. All Gesture Spy events will
have their category set to "GestureSpy". In addition:
```
  Action                 Label                  Value
  orientation change     landscape or portrait  0
  rotate                 element touched        angle
  pinch                  element touched        scale, [0,0.9]
  zoom                   element touched        scale, [1.1,infinity]
  swipe                  element touched        (nothing)
```

Currently it only watches for Safari GestureEvents.

## Contributing
Please! Pull requests. Or requests.

## References
* http://developer.apple.com/library/ios/#documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW1
* http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/GestureEventClassReference/GestureEvent/GestureEvent.html


## License
Copyright(c) 2012 Andrew J. Peterson / NDP Software
All Rights Reserved.