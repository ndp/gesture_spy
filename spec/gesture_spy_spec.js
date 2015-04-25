describe("gestureSpy", function () {
  it("should run without errors", function () {
    GestureSpy.spy();
  });
  describe('#eventName', function () {
    it("should return rotate if rotation is < -20", function () {
      expect(GestureSpy.eventName({rotation: -21, scale: 1})).toEqual('rotate');
    });
    it("should return rotate if rotation is > 20", function () {
      expect(GestureSpy.eventName({rotation: 21, scale: 1})).toEqual('rotate');
    });
    it("should return pinch if rotation is > -20 and scale < .9", function () {
      expect(GestureSpy.eventName({rotation: -19, scale: 0.899 })).toEqual('pinch');
    });
    it("should return zoom if rotation is > -20 and scale > 1.1", function () {
      expect(GestureSpy.eventName({rotation: -19, scale: 1.1001 })).toEqual('zoom');
    });
    it("should report drag if -20 < rotation < 20 and .9 < scale < 1.1", function () {
      expect(GestureSpy.eventName({rotation: -19, scale: 0.91 })).toEqual('swipe');
      expect(GestureSpy.eventName({rotation: 19, scale: 0.91 })).toEqual('swipe');
      expect(GestureSpy.eventName({rotation: -19, scale: 1.09 })).toEqual('swipe');
      expect(GestureSpy.eventName({rotation: 19, scale: 1.09 })).toEqual('swipe');
    });
  });

  describe("#eventValue", function () {
    it("should return rotation from rotate event", function () {
      expect(GestureSpy.eventValue({rotation: -21, scale: 1})).toEqual(-21);
    });
    it("should return scale from pinch", function () {
      expect(GestureSpy.eventValue({rotation: -19, scale: 0.899 })).toEqual(0.899);
    });
    it("should return scale from zoom", function () {
      expect(GestureSpy.eventValue({rotation: -19, scale: 1.1001 })).toEqual(1.1001);
    });
    xit("should return distance from swipe", function () {
      expect(GestureSpy.eventValue({rotation: 19, scale: 0.91 })).toEqual(0);
    });
  });

  describe("#eventTarget", function () {
    var dom, divWithId, divWithClass, span;
    beforeEach(function() {
      divWithId = document.createElement('DIV');
      divWithId.setAttribute('id','hah');

      divWithClass = document.createElement('DIV');
      divWithClass.setAttribute('class','heh');
      divWithId.appendChild(divWithClass);

      span = document.createElement('SPAN');
      divWithClass.appendChild(span);
    });
    it("should return ID", function () {
      var event = {};
      event.target = divWithId;
      expect(GestureSpy.eventTarget(event)).toEqual('#hah')
    });
    it("should return parent + .class", function () {
      var event = {};
      event.target = divWithClass;
      expect(GestureSpy.eventTarget(event)).toEqual('#hah>div.heh')
    });
    it("should return parent + .class ...", function () {
      var event = {};
      event.target = span;
      expect(GestureSpy.eventTarget(event)).toEqual('#hah>div.heh>span')
    });
  });
  describe("reportGA", function () {
    it("should push onto _gaq", function () {
      _gaq = [];
      GestureSpy.reportGA('a', 'b', 'c');
      expect(_gaq[0]).toEqual(['_trackEvent', 'GestureSpy', 'a', 'b', 'c']);
    });
  });
});