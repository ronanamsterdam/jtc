[![build pass](https://travis-ci.org/ronanamsterdam/jtc.svg?branch=master)](https://travis-ci.org/ronanamsterdam/jtc)
[![Test Coverage](https://codeclimate.com/github/ronanamsterdam/jtc/badges/coverage.svg)](https://codeclimate.com/github/ronanamsterdam/jtc/coverage)
[![Code Climate](https://codeclimate.com/github/ronanamsterdam/jtc/badges/gpa.svg)](https://codeclimate.com/github/ronanamsterdam/jtc)
[![npm downloads](https://img.shields.io/npm/dm/jtc.svg?style=flat-square)](https://www.npmjs.com/package/jtc)

# JTC - Json To {CODE} Compiler


JTC is a json to any code transformer

### What It Does:

1. takes a tokenized code tree input in form of javaScript ```{Object}```
2. combines that with by default embedded or provided descriptor
3. bakes the code together and gives back a ```{String}``` result

### Installation

To install the stable version:

```
npm install --save jtc
```

### Usage

```js
  import jtc from 'jtc';

  let jtcResult = jtc(compilerInput, userLoadedDescriptor);
```

### Compiler input (```compilerInput```)

 - this the AST data you gather on your app's side

 - goes in this form:

```
  {
    slug: 'slugifiedTestName',
    describe: {
        text: 'dis is a spec description',
        body: [ {
                beforeAll: {
                    body: {
                        value: 'SOME STRING VALUE1'
                    }
                },
              },
              {
                step: {
                  text: 'dis is a step description',
                  body: [
                      {
                        click: {
                          text: 'some text',
                          selector: '[some-valid-selector2]'
                        }
                      },
                      {
                        click: {
                          text: 'some text',
                          selector: '[some-valid-selector3]'
                        }
                      },
                      {
                        expect: {
                          text: 'some text',
                          expectCondition: 'someMethod("[some-valid-selector1]")',
                          toBeCallback: 'toEqual',
                          passCondition: '"I expect nothing, but the truth!"'
                          assertMessage: 'AssertMessage: Well Damn!',
                        }
                      }
                    ]
                }
              },
              {
                afterAll: {
                    body: {
                        value: 'SOME STRING VALUE2'
                    }
                }
              }
            ]
          }
      }
```

  - the only thing compiler cares about is correspondence between top-level key like 'describe',
  for example, with it's presence in descriptor

  - if the key is present in descriptor -> compiler is going to merge start and end together and
will add nested children if there is a body[] array there

### Descriptor (```userLoadedDescriptor```)

 - Descriptor is a JSON formatted normalized representation of each code block that can come from ```compilerInput```

 - goes in this form:

  ```
  {
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
    log: {
      spec: {
        start: 'yourLogMethod("{{{log.text}}}")',
        end: ''
      }
    },
    expect: {
      spec: {
        start: 'expect({{{expect.expectCondition}}}).{{{expect.toBeCallback}}}({{{expect.successCondition}}}, "{{{expect.assertMessage}}}") \n',
        end: ''
      }
    }
  }
  ```

  - each top level key represents a code block that should be described

  - required properties for each code block description are:
    <TOP_LEVEL_KEY_CODE_BLOCK_NAME> : {
      spec: {
        start: '<STRING_DESCRIPTION_OF_CODE_BLOCK_START>',
        end: '<STRING_DESCRIPTION_OF_CODE_BLOCK_END>'
      }
    }

  - optional fields for each code block description are:

      enumerable -> means there might be code blocks inside of this code block

      wrapper -> specifies a wrapper around this code block.Each block can contain N number of wrappers around


  - compiler is using handlebars as template-processor, so in order to reach a property
  passed from client you need to specify it in a way:
    {{<TOP_LEVEL_KEY_CODE_BLOCK_NAME>.<VALUE_PROPERTY_YOU_WANT_TO_REACH>}}

### Compiler output (```jtcResult```)

  - compiler returns back a compiled non-beautyfied ```string``` which can be consumed by a string formatter of choice

### Usage Examples

* https://github.com/ronanamsterdam/nitrorecorder

### Documentation

* TODO

### License

MIT
