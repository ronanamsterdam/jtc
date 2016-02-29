//jtc descriptor for jasmine
'use strict';

export default {
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
  subStep: {
    spec: {
      start: '.then((someGotFromAsyncObjHere) => {',
      end: '}) \n',
      enumerable: true
    }
  },
  stepStart: {
    spec: {
      start: 'var someTestVarHere;',
      end: '\n\n'
    }
  },
  stepEnd: {
    spec: {
      start: '',
      end: ''
    }
  },
  click: {
    spec: {
      start: 'yourMethodToTriggerCliks("{{{click.selector}}}") \n',
      end: ''
    }
  },
  input: {
    spec: {
      start: 'yourMethodToSetValues("{{{input.selector}}}", "{{input.text}}") \n',
      end: ''
    }
  },
  contextmenu : {
    spec: {
      start: 'yourMethodToOpenContextMenu("{{{contextmenu.selector}}}") \n',
      end: ''
    }
  },
  wait: {
    spec: {
      start: 'yourAsyncMethod("{{{wait.selector}}}", {{wait.text}}) \n',
      end: ''
    }
  },
  navigate: {
    spec: {
      start: 'yourNavigateSomewhereMethod("{{navigate.text}}", "{{{navigate.selector}}}") \n',
      end: ''
    }
  },
  log: {
    spec: {
      start: 'yourLogMethod("{{{log.text}}}") \n',
      end: ''
    }
  },
  capture: {
    spec: {
      start: 'yourSceenCaptureMethod("{{capture.text}}") \n',
      end: ''
    }
  },
  custom: {
    spec: {
      start: '{{{custom.text}}}',
      end: ''
    }
  },
  expect: {
    spec: {
      start: 'expect({{{expect.expectCondition}}}).{{{expect.toBeCallback}}}({{{expect.successCondition}}}, "{{{expect.assertMessage}}}") \n',
      end: ''
    }
  },
  return: {
    spec: {
      start: 'return ',
      end: ''
    }
  },
  beforeAll: {
      spec: {
        start:  'beforeAll(function (done: () => void): void { \n /* do something here before all tests */',
        end:    '});'
      }
  },
  afterAll: {
      spec: {
        start:  'afterAll(function (done: () => void): void { \n /* do something here after all tests */',
        end:    '});'
      }
  }
};