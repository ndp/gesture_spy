var GestureSpy = (function () {

  var report;

//  function getDistance(pos1, pos2) {
//    var x = pos2.x - pos1.x, y = pos2.y - pos1.y;
//    return Math.sqrt((x * x) + (y * y));
//  }

  var _lastRotation = null; // just a value we use to filter out duplicates

  var gestureSpy = {
    spy: function (options) {
      report = (options && options.report) || gestureSpy.reportGA;
      setTimeout(function () {
        var bodies = document.getElementsByTagName('BODY');
        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];
          // Docs say we must add a "fake" click handler (http://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW6)
          body.addEventListener('click', function () {
            void(0)
          });
          body.addEventListener('gestureend', gestureSpy.gestureEnd, false);
          body.addEventListener('orientationchange', gestureSpy.orientationChange, false);
        }
      }, 1000);
    },
    eventName: function (event) {
        var rot = Math.abs(event.rotation);
        var scale = event.scale;
        if (rot < 20) {
          if (scale > 1.1) return 'zoom';
          if (scale < 0.9) return 'pinch';
          return 'swipe';
        } else {
          return 'rotate';
        }
      },
    eventTarget: function (event) {
        function nodeName(node) {
          var s = '';
          if (node) {
            if (node.id) {
              s = '#' + node.id;
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

        return nodeName(event.target);
      },
    eventValue: function (event) {
        var name = gestureSpy.eventName(event);
        if (name == 'rotate') return event.rotation;
        if (name == 'pinch') return event.scale;
        if (name == 'zoom') return event.scale;
        return name;
      },
    gestureEnd: function (event) {
        if (_lastRotation !== event.rotation) {
          report(gestureSpy.eventName(event),
              gestureSpy.eventTarget(event),
              gestureSpy.eventValue(event));
        }
        _lastRotation = event.rotation;
      },
    orientationChange: function () {
        var orientation = window.orientation % 180 ? 'landscape' : 'portrait';
        report('orientation change', orientation);
      },
    reportGA: function (evt, label, value) {
        _gaq.push(['_trackEvent', 'GestureSpy', evt, label, value]);
      }
  };

  return gestureSpy;
})();


