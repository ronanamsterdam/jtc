//jwt descriptor form jasmine + our helper specs
'use strict';

export const tstDescriptor = {
  describe: {
    spec: {
      start: 'describe("{{describe.text}}", () => {',
      end: '});',
      enumerable: true
    },
    wrapper: {
      spec : {
        start: 'export function {{describe.slug}}() {',
        end: '}'
      }
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
  },
  return: {
    spec: {
      start: 'return ',
      end: ''
    }
  }
};

export const tstDescriptorWithoutReturn = {
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

export const tstDescriptorInvalidType1 = {
  describe: {}
};

export const tstDescriptorInvalidType2 = {
  describe: {
    spec: {
      start: 'describe("{{describe.text}}", () => {',
      enumerable: true
    }
  }
};

export const tstDescriptorInvalidType3 = {
  describe: {
    spec: {
      end: '});'
    }
  }
};

export const tstDescriptorEmpty = {};