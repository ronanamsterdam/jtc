'use strict';
export default [{
    slug: 'slugifiedTestName',
    describe: {
        text: 'dis is a spec description',
        body: [{
                beforeEach: {
                    body: {
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
                    }
                }
            }, {
                beforeAll: {

                }
            },


            {
                step: {
                    text: 'dis is a step description',
                    body: [{
                            stepStart: {
                                body: {
                                    value: 'someMethod("Some Stuff1"); someMethod("Some Stuff2"); someMethod("Some Stuff3");'
                                }
                            },
                        }, {
                            click: {
                                text: 'some text',
                                selector: '[some-html-property=some-valid-selector1]',
                                isReturn: true
                            }
                        },
                        /// there must be something before the substep
                        {
                            subStep: {
                                body: [{
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP1]'
                                    }
                                }, {
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP2]',
                                        isReturn: true
                                    }
                                }]
                            }
                        }, {
                            subStep: {
                                body: [{
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP1]'
                                    }
                                }, {
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP2]',
                                        isReturn: true
                                    }
                                }]
                            }
                        }, {
                            subStep: {
                                body: [{
                                    expect: {
                                        text: 'some text',
                                        expectCondition: 'someMethod2("[some-html-property=some-valid-selector-inSUBSTEP1]")',
                                        assertMessage: 'AssertMessage: Whell Damn!',
                                        toBeCallback: 'toEqual',
                                        passCondition: '2'
                                    }
                                }]
                            }
                        }, {
                            stepEnd: {},
                        }
                    ]
                }
            },
            {
                step: {
                    text: 'dis is a step description two',
                    body: [{
                        click: {
                            text: 'some text',
                            selector: '[some-html-property=some-valid-selector2]'
                        }
                    }, {
                        click: {
                            text: 'some text',
                            selector: '[some-html-property=some-valid-selector3]'
                        }
                    }, {
                        expect: {
                            text: 'some text',
                            expectCondition: 'someMethod2("[some-html-property=some-valid-selector1]")',
                            assertMessage: 'AssertMessage: Whell Damn Twise!',
                            toBeCallback: 'toEqual',
                            passCondition: '"I expect nothing, but the truth!"'
                        }
                    }]
                }
            },


            {
                afterEach: {
                    body: {
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
                    }
                }
            }, {
                afterAll: {
                    body: {
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
                    }
                }
            }

        ]
    }
},
{
    slug: 'slugifiedTestName',
    describe: {
        text: 'dis is a spec description',
        body: [{
                beforeEach: {
                    body: {
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
                    }
                }
            }, {
                beforeAll: {}
            },


            {
                step: {
                    text: 'dis is a step description',
                    body: [{
                            stepStart: {
                                body: {
                                    value: 'someMethod("Some Stuff1"); someMethod("Some Stuff2"); someMethod("Some Stuff3");'
                                }
                            },
                        }, {
                            click: {
                                text: 'some text',
                                selector: '[some-html-property=some-valid-selector1]',
                                isReturn: true
                            }
                        },
                        /// there must be something before the substep
                        {
                            subStep: {
                                body: [{
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP1]'
                                    }
                                }, {
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP2]',
                                        isReturn: true
                                    }
                                }]
                            }
                        }, {
                            subStep: {
                                body: [{
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP1]'
                                    }
                                }, {
                                    click: {
                                        text: 'some text',
                                        selector: '[some-html-property=some-valid-selector-inSUBSTEP2]',
                                        isReturn: true
                                    }
                                }]
                            }
                        }, {
                            subStep: {
                                body: [{
                                    expect: {
                                        text: 'some text',
                                        expectCondition: 'someMethod2("[some-html-property=some-valid-selector-inSUBSTEP1]")',
                                        assertMessage: 'AssertMessage: Whell Damn!',
                                        toBeCallback: 'toEqual',
                                        passCondition: '2'
                                    }
                                }]
                            }
                        }, {
                            stepEnd: {},
                        }
                    ]
                }
            },
            {
                step: {
                    text: 'dis is a step description two',
                    body: [{
                        click: {
                            text: 'some text',
                            selector: '[some-html-property=some-valid-selector2]'
                        }
                    }, {
                        click: {
                            text: 'some text',
                            selector: '[some-html-property=some-valid-selector3]'
                        }
                    }, {
                        expect: {
                            text: 'some text',
                            expectCondition: 'someMethod2("[some-html-property=some-valid-selector1]")',
                            assertMessage: 'AssertMessage: Whell Damn Twise!',
                            toBeCallback: 'toEqual',
                            passCondition: '"I expect nothing, but the truth!"'
                        }
                    }]
                }
            },


            {
                afterEach: {
                    body: {
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
                    }
                }
            }, {
                afterAll: {
                    body: {
                        value: '<THIS_RAW_VALUE_SET_ON_CLIENT>'
                    }
                }
            }

        ]
    }
}];