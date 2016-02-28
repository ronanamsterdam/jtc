'use strict';

/**
* if webpack is used this import
* will require this line:
*   node: {
*     fs: 'empty'
*   },
* to be added to webpack.config.js
*/
import handlebars from 'handlebars';

//predefined default descriptor
import defaultDescriptor from './default-descriptor-jasmine';

class Jtc {

  descriptor = null;

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

  transform(passedSpec, descriptor) {
    if (!passedSpec) { throw Error("😡 {JTC} Don't pass that stuff here man!"); }

    this.descriptor = descriptor && this._validateDescriptor(descriptor) || defaultDescriptor;

    let result = this._processRoot(passedSpec);

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

  _valueIsDefined(value) {
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

  _validateDescriptor(descriptor = {}) {
    for(let key in descriptor) {
      let descriptorItem = descriptor[key]
      if(!descriptorItem.spec || !this._valueIsDefined(descriptorItem.spec.start) || !this._valueIsDefined(descriptorItem.spec.end)){
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

  _processRoot(passedSpec) {
    if(Array.isArray(passedSpec)) {
      let acc = [];
      for (let i = passedSpec.length - 1; i >= 0; i--) {
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

  _processKeys(clientSpec) {
    let returnArr = [];

    for (let specObjkey in clientSpec) {
      if(this.descriptor.hasOwnProperty(specObjkey)) {

        //copying obj to prevent reference changes
        let descriptorObj = this.descriptor[specObjkey];

        let reduceResult = this._reduceString(descriptorObj, clientSpec, specObjkey),
            tempArr = reduceResult[0];

        //Open code block jaws
        tempArr = [
          tempArr.slice(0, tempArr.length/2).join(''),
          tempArr.slice(tempArr.length/2, tempArr.length).join(''),
        ];

        if (clientSpec[specObjkey].body) {
          //Close code block jaws
          if(this.descriptor[specObjkey].spec.enumerable) {
            if (!Array.isArray(clientSpec[specObjkey].body)) {
              throw Error("Its enumerable but from client spec it's not Array");
            }
            let enumerableStringAccumulator = '';

            //if body is array
            for(let i=0,l=clientSpec[specObjkey].body.length;i<l;++i) {
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

        returnArr = [
          ...returnArr,
          tempArr.join('')
        ];
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

  _reduceString(specCompileResult, clientSpecScoped, specObjkey = '') {
    let processedString = [];

    specCompileResult = this._processTemplate(specCompileResult, clientSpecScoped, specObjkey);

    //Open code block jaws
    processedString = [
      specCompileResult.spec.start,
      specCompileResult.spec.end,
    ];

    if(specCompileResult.wrapper) {

      let reduceResult = this._reduceString(specCompileResult.wrapper, clientSpecScoped, specObjkey);

      let wrapperArr = reduceResult[0];

      //Close code block jaws
      processedString = this._insertInTheMiddleOfArray(wrapperArr, processedString);
    }

    return [processedString, clientSpecScoped, specObjkey];
  }

  _insertInTheMiddleOfArray(slicableArray, insertableArray) {
    return [
        ...slicableArray.slice(0, slicableArray.length/2),
        ...insertableArray,
        ...slicableArray.slice(slicableArray.length/2, slicableArray.length),
      ];
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

  _processTemplate(specCompileResult, clientSpecScoped, specObjkey) {
    let start = clientSpecScoped[specObjkey].isReturn ?
      [(this.descriptor['return'] && this.descriptor['return'].spec.start || ''), specCompileResult.spec.start].join('') : specCompileResult.spec.start;

    let end = clientSpecScoped[specObjkey].isReturn ?
      [specCompileResult.spec.end, (this.descriptor['return'] && this.descriptor['return'].spec.end || '')].join('') : specCompileResult.spec.end;

    return {
      spec: {
        start: handlebars.compile(start)(clientSpecScoped),
        end: handlebars.compile(end)(clientSpecScoped)
      },
      wrapper: specCompileResult.wrapper
    };
  }
}

// that singleton you expect it to be
let jtc = null;

jtc = jtc || new Jtc();

export default ::jtc.transform;