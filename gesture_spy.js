var _gaq = _gaq || [];

var GestureSpy = (function () {

  var report;

  function getDistance(pos1, pos2) {
    var x = pos2.x - pos1.x, y = pos2.y - pos1.y;
    return Math.sqrt((x * x) + (y * y));
  }

  var eventTarget = function (event) {
    function nodeName(node) {
      s = '';
      if (node) {
        if (node.id) {
          s = '#'+ node.id;
        } else if (node.nodeName == 'BODY' || node.nodeName == 'HTML') {
          return 'body';
        } else {
          s = nodeName(node.parentNode);
          if (s) s += '>';
          s += node.nodeName.toLowerCase();
          if (node.className) s += '.' + node.className;
        }
      }
      return s;
    }

    return  nodeName(event.target);
  }

  var eventValue = function (event) {
    var name = eventName(event);
    if (name == 'rotate') return event.rotation;
    if (name == 'pinch') return event.scale;
    if (name == 'zoom') return event.scale;
    return name;
  }

  var eventName = function (event) {
    var rot = Math.abs(event.rotation);
    var scale = event.scale;
    if (rot < 20) {
      if (scale > 1.1) return 'zoom';
      if (scale < 0.9) return 'pinch';
      return 'swipe';
    } else {
      return 'rotate';
    }
  }

  var lastRotation = null; // just a value we use to filter out duplicates
  var gestureEnd = function (event) {
    if (lastRotation !== event.rotation) {
      report(eventName(event), eventTarget(event), eventValue(event));
    }
    lastRotation = event.rotation;
  }

  var orientationChange = function (event) {
    var orientation = window.orientation % 180 ? 'landscape' : 'portrait';
    report('orientation change', orientation);
  }

  return {
    spy: function (options) {
      report = (options && options.report) || function (evt, label, value) {
        _gaq.push(['_trackEvent', 'GestureSpy', evt, label, value]);
      };
      setTimeout(function() {
        var bodies = document.getElementsByTagName('BODY');
        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          // Docs say we must add a "fake" click handler (http://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW6)
          body.addEventListener('click', function () {
            void(0)
          });
          body.addEventListener('gestureend', gestureEnd, false);
          body.addEventListener('orientationchange', orientationChange, false);
        }
      }, 1000);
    },
    eventName: eventName,
    eventTarget: eventTarget,
    eventValue: eventValue
  };

})();


