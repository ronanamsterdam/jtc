[![alt tag](https://travis-ci.org/ronanamsterdam/jtc.svg?branch=master)](https://travis-ci.org/ronanamsterdam/jtc)

# JTC - Json To {CODE} Compiler
=======

JTC is a json to any code transformer

It:

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
                        value: '<THIS_IS_SOME_RAW_VALUE_SET_ON_CLIENT>'
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
                          selector: '[data-ft=some-valid-selector2]'
                        }
                      },
                      {
                        click: {
                          text: 'some text',
                          selector: '[data-ft=some-valid-selector3]'
                        }
                      },
                      {
                        expect: {
                          text: 'some text',
                          expectCondition: 'Helper.CountElements(page,"[data-ft=some-valid-selector1]")',
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
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
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

* Coming soon

### Documentation

* TODO

### License

MIT
