//jwt descriptor form jasmine + our helper specs
'use strict';

export default {
  describe: {
    spec: {
      start: 'describe("{{describe.text}}", () => {',
      end: '});',
      enumerable: true
    }
  },
  step: {
    spec: {
      start: 'it("{{step.text}}", (done) => {',
      end: '});',
      enumerable: true
    }
  },
  click: {
    spec: {
      start: 'yourMethodToTriggerCliks("{{{click.selector}}}")',
      end: ''
    }
  }
};