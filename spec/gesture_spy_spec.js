describe("gestureSpy", function () {
  it("should run without errors", function () {
    GestureSpy.spy();
  });
  describe('#eventName', function() {
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
    it("should report drag if -20 < rotation < 20 and .9 < scale < 1.1", function() {
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
});