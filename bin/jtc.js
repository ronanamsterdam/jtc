//jtc descriptor for jasmine
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  describe: {
    spec: {
      start: 'describe("{{describe.text}}", () => {',
      end: '});',
      enumerable: true
    },
    wrapper: {
      spec: {
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
  contextmenu: {
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
      start: 'beforeAll(function (done: () => void): void { \n /* do something here before all tests */',
      end: '});'
    }
  },
  afterAll: {
    spec: {
      start: 'afterAll(function (done: () => void): void { \n /* do something here after all tests */',
      end: '});'
    }
  }
};
'use strict';

/**
* if webpack is used this import
* will require this line:
*   node: {
*     fs: 'empty'
*   },
* to be added to webpack.config.js
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

//predefined default descriptor

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _defaultDescriptorJasmine = require('./default-descriptor-jasmine');

var _defaultDescriptorJasmine2 = _interopRequireDefault(_defaultDescriptorJasmine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jtc = (function () {
  function Jtc() {
    _classCallCheck(this, Jtc);

    this.descriptor = null;
  }

  _createClass(Jtc, [{
    key: 'transform',

    /**
    * public main input/outut method
    *
    * @param {Object} passedSpec - a tokenized code tree object
    *
    * { < code_block_name > : {
    *       < code_block_param_1 > : '<code_block_param_1_value>',
    *       ....,
    *       < code_block_param_n > : '<code_block_param_n_value>',
    *       body: [
    *       {
    *         < child_code_block_name > : {
    *           < child_code_block_param_1 > : '<child_code_block_param_1_value>',
    *           ....,
    *           < child_code_block_param_n > : '<child_code_block_param_n_value>',
    *           body: [...]
    *               }
    *       }, ....]
    *   }
    * }
    *
    * @param {Object} descriptor - tokenized tree descriptor
    *
    * { < code_block_name > : {
    *         spec: {
    *             start: '<codeblock_start_value>',
    *             end: '<codeblock_end_value>'
    *         }
    *     }
    * }
    *
    *
    * @returns {String} Compiled code string
    *
    */

    value: function transform(passedSpec, descriptor) {
      if (!passedSpec) {
        throw Error("😡 {JTC} Don't pass that stuff here man!");
      }

      this.descriptor = descriptor && this._validateDescriptor(descriptor) || _defaultDescriptorJasmine2.default;

      var result = this._processRoot(passedSpec);

      console.info("😎 {JTC} done");

      return result;
    }

    /**
    * @private
    * checks is value defined or not
    *
    * @param    {Anything} value
    * @returns  {Boolean}
    *
    */

  }, {
    key: '_valueIsDefined',
    value: function _valueIsDefined(value) {
      return value !== undefined && value !== false && value !== null;
    }

    /**
    * @private
    * validates descriptor's structure
    *
    * @param  {Object} descriptor - tokenized tree descriptor
    * @return {Object} tokenized tree descriptor
    *
    */

  }, {
    key: '_validateDescriptor',
    value: function _validateDescriptor() {
      var descriptor = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      for (var key in descriptor) {
        var descriptorItem = descriptor[key];
        if (!descriptorItem.spec || !this._valueIsDefined(descriptorItem.spec.start) || !this._valueIsDefined(descriptorItem.spec.end)) {
          throw Error("{SR} 😤 Boy! That's ain't a valid descriptor!");
        }
      }

      return descriptor;
    }

    /**
    * @private
    * compile subStep if passedSpec is an array instead of object with root code block
    *
    * @param  {Object} passedSpec - a tokenized code tree object
    * @return {String} Compiled code string
    *
    */

  }, {
    key: '_processRoot',
    value: function _processRoot(passedSpec) {
      if (Array.isArray(passedSpec)) {
        var acc = [];
        for (var i = passedSpec.length - 1; i >= 0; i--) {
          acc.push(this._processKeys(passedSpec[i]));
        };
        return acc.join('');
      } else {
        return this._processKeys(passedSpec);
      }
    }

    /**
    * @private
    * tree iterator
    *
    * @param  {Object} clientSpec - a tokenized code tree object
    * @return {String} Compiled code string
    *
    */

  }, {
    key: '_processKeys',
    value: function _processKeys(clientSpec) {
      var returnArr = [];

      for (var specObjkey in clientSpec) {
        if (this.descriptor.hasOwnProperty(specObjkey)) {

          //copying obj to prevent reference changes
          var descriptorObj = this.descriptor[specObjkey];

          var reduceResult = this._reduceString(descriptorObj, clientSpec, specObjkey),
              tempArr = reduceResult[0];

          //Open code block jaws
          tempArr = [tempArr.slice(0, tempArr.length / 2).join(''), tempArr.slice(tempArr.length / 2, tempArr.length).join('')];

          if (clientSpec[specObjkey].body) {
            //Close code block jaws
            if (this.descriptor[specObjkey].spec.enumerable) {
              if (!Array.isArray(clientSpec[specObjkey].body)) {
                throw Error("Its enumerable but from client spec it's not Array");
              }
              var enumerableStringAccumulator = '';

              //if body is array
              for (var i = 0, l = clientSpec[specObjkey].body.length; i < l; ++i) {
                enumerableStringAccumulator = [enumerableStringAccumulator, this._processKeys(clientSpec[specObjkey].body[i])].join('');
              }

              tempArr = this._insertInTheMiddleOfArray(tempArr, [enumerableStringAccumulator]);
            } else if (clientSpec[specObjkey].body.value) {
              //if body is just a raw value
              tempArr = this._insertInTheMiddleOfArray(tempArr, [clientSpec[specObjkey].body.value]);
            } else {
              //if body is object
              tempArr = this._insertInTheMiddleOfArray(tempArr, this._processKeys(clientSpec[specObjkey].body));
            }
          }

          returnArr = [].concat(_toConsumableArray(returnArr), [tempArr.join('')]);
        }
      }

      return returnArr.join('');
    }

    /**
    * @private
    * code block processor
    *
    * @param {Object} specCompileResult - a compiled spec compilation result
    * @param {Object} clientSpecScoped - a scoped tokenized code tree object
    * @param {String} specObjkey - codeblock name key
    *
    * @return {Object} compiled spec result
    *
    * {
    *   spec: {
    *     start:  <compiled_code_block_start>,
    *     end:    <compiled_code_block_end>
    *   },
    *   wrapper: {...}
    * }
    *
    */

  }, {
    key: '_reduceString',
    value: function _reduceString(specCompileResult, clientSpecScoped) {
      var specObjkey = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

      var processedString = [];

      specCompileResult = this._processTemplate(specCompileResult, clientSpecScoped, specObjkey);

      //Open code block jaws
      processedString = [specCompileResult.spec.start, specCompileResult.spec.end];

      if (specCompileResult.wrapper) {

        var reduceResult = this._reduceString(specCompileResult.wrapper, clientSpecScoped, specObjkey);

        var wrapperArr = reduceResult[0];

        //Close code block jaws
        processedString = this._insertInTheMiddleOfArray(wrapperArr, processedString);
      }

      return [processedString, clientSpecScoped, specObjkey];
    }
  }, {
    key: '_insertInTheMiddleOfArray',
    value: function _insertInTheMiddleOfArray(slicableArray, insertableArray) {
      return [].concat(_toConsumableArray(slicableArray.slice(0, slicableArray.length / 2)), _toConsumableArray(insertableArray), _toConsumableArray(slicableArray.slice(slicableArray.length / 2, slicableArray.length)));
    }

    /**
    * @private
    * compiles start and end of code block
    *
    * @param {Object} specCompileResult - a compiled spec compilation result
    * @param {Object} clientSpecScoped - a scoped tokenized code tree object
    * @param {String} specObjkey - codeblock name key
    *
    * @return {Object} compiled spec result
    *
    */

  }, {
    key: '_processTemplate',
    value: function _processTemplate(specCompileResult, clientSpecScoped, specObjkey) {
      var start = clientSpecScoped[specObjkey].isReturn ? [this.descriptor['return'] && this.descriptor['return'].spec.start || '', specCompileResult.spec.start].join('') : specCompileResult.spec.start;

      var end = clientSpecScoped[specObjkey].isReturn ? [specCompileResult.spec.end, this.descriptor['return'] && this.descriptor['return'].spec.end || ''].join('') : specCompileResult.spec.end;

      return {
        spec: {
          start: _handlebars2.default.compile(start)(clientSpecScoped),
          end: _handlebars2.default.compile(end)(clientSpecScoped)
        },
        wrapper: specCompileResult.wrapper
      };
    }
  }]);

  return Jtc;
})();

// that singleton you expect it to be

var jtc = null;

jtc = jtc || new Jtc();

exports.default = (_context = jtc).transform.bind(_context);
