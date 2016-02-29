'use strict';

import {expect} from 'chai';
import jtc from '../jtc';

import tstClientSpec from './mocks/jtc_clientSpec_tst';
import tstClientSpecArray from './mocks/jtc_clientSpec_tstArray';
import tstClientSpecInvalid from './mocks/jtc_clientSpec_tstInvalid';

import {
  tstDescriptor,
  tstDescriptorWithoutReturn,
  tstDescriptorInvalidType1,
  tstDescriptorInvalidType2,
  tstDescriptorInvalidType3,
  tstDescriptorEmpty
} from './mocks/tstDescriptors';

describe('jtc compiler', () => {

  it('should compile client data', () => {
    let expectedResult = "export function () {describe(\"dis is a spec description\", () => {beforeAll(function (done: () => void): void { \n /* do something here before all tests */});it(\"dis is a step description\", (done) => {var someTestVarHere;someMethod(\"Some Stuff1\"); someMethod(\"Some Stuff2\"); someMethod(\"Some Stuff3\");\n\nreturn yourMethodToTriggerCliks(\"[some-property=some-valid-selector1]\") \n.then((someGotFromAsyncObjHere) => {yourMethodToTriggerCliks(\"[some-property=some-valid-selector-inSUBSTEP1]\") \nreturn yourMethodToTriggerCliks(\"[some-property=some-valid-selector-inSUBSTEP2]\") \n}) \n.then((someGotFromAsyncObjHere) => {yourMethodToTriggerCliks(\"[some-property=some-valid-selector-inSUBSTEP1]\") \nreturn yourMethodToTriggerCliks(\"[some-property=some-valid-selector-inSUBSTEP2]\") \n}) \n.then((someGotFromAsyncObjHere) => {expect(someMethod2(\"[some-property=some-valid-selector-inSUBSTEP1]\")).toEqual(, \"AssertMessage: Whell Damn!\") \n}) \n});it(\"dis is a step description two\", (done) => {yourMethodToTriggerCliks(\"[some-property=some-valid-selector2]\") \nyourMethodToTriggerCliks(\"[some-property=some-valid-selector3]\") \nexpect(someMethod2(\"[some-property=some-valid-selector1]\")).toEqual(, \"AssertMessage: Whell Damn Twise!\") \n});afterAll(function (done: () => void): void { \n /* do something here after all tests */<THIS_RAW_VALUE_SET_ON_CLIENT>});});}";
    expect(jtc(tstClientSpec)).to.equal(expectedResult);
  });

  it('should not compile without client data', () => {
    expect(jtc.bind(jtc, null)).to.throw(Error);
  });

  it('should compile client data with provided descriptor', () => {
    let expectedResult = 'export function () {describe("dis is a spec description", () => {it("dis is a step description", (done) => {return yourMethodToTriggerCliks("[some-property=some-valid-selector1]")});it("dis is a step description two", (done) => {yourMethodToTriggerCliks("[some-property=some-valid-selector2]")yourMethodToTriggerCliks("[some-property=some-valid-selector3]")});});}';
    expect(jtc(tstClientSpec, tstDescriptor)).to.equal(expectedResult);
  });

  it('should compile client data passed as array', () => {
    let expectedResult = 'export function () {describe("dis is a spec description", () => {it("dis is a step description", (done) => {return yourMethodToTriggerCliks("[some-html-property=some-valid-selector1]")});it("dis is a step description two", (done) => {yourMethodToTriggerCliks("[some-html-property=some-valid-selector2]")yourMethodToTriggerCliks("[some-html-property=some-valid-selector3]")});});}export function () {describe("dis is a spec description", () => {it("dis is a step description", (done) => {return yourMethodToTriggerCliks("[some-html-property=some-valid-selector1]")});it("dis is a step description two", (done) => {yourMethodToTriggerCliks("[some-html-property=some-valid-selector2]")yourMethodToTriggerCliks("[some-html-property=some-valid-selector3]")});});}';
    expect(jtc(tstClientSpecArray, tstDescriptor)).to.equal(expectedResult);
  });

  it('should compile client data with provided descriptor without return description', () => {
    let expectedResult = 'describe("dis is a spec description", () => {it("dis is a step description", (done) => {yourMethodToTriggerCliks("[some-property=some-valid-selector1]")});it("dis is a step description two", (done) => {yourMethodToTriggerCliks("[some-property=some-valid-selector2]")yourMethodToTriggerCliks("[some-property=some-valid-selector3]")});});';
    expect(jtc(tstClientSpec, tstDescriptorWithoutReturn)).to.equal(expectedResult);
  });

  it('should not compile with invalid descriptors', () => {
    expect(jtc.bind(jtc, tstClientSpec, tstDescriptorInvalidType1)).to.throw(Error);
    expect(jtc.bind(jtc, tstClientSpec, tstDescriptorInvalidType2)).to.throw(Error);
    expect(jtc.bind(jtc, tstClientSpec, tstDescriptorInvalidType3)).to.throw(Error);
  });

  it('should not throw with empty descriptor or client data', () => {
    expect(jtc.bind(jtc, tstClientSpec, tstDescriptorEmpty)).not.throw(Error);
    expect(jtc.bind(jtc, {}, tstDescriptor)).not.throw(Error);
    expect(jtc.bind(jtc, {}, tstDescriptorEmpty)).not.throw(Error);
  });

  it('throws if body of enumerable block is not Array type', () => {
    expect(jtc.bind(jtc, tstClientSpecInvalid)).to.throw(Error);
  });
});