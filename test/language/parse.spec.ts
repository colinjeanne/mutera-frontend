/* tslint:disable:only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import 'mocha';
import parse, { VariableTypes } from './../../src/language/parse';

describe('parse', function() {
    const trueNode = {
        operator: 'T'
    };

    const falseNode = {
        operator: 'F'
    };

    const zeroNode = {
        data: 32,
        operator: 'C'
    };

    const twoNode = {
        data: 48,
        operator: 'C'
    };

    const threeNode = {
        data: 56,
        operator: 'C'
    };

    it('fails to parse an empty string', function() {
        const inputVariables = {};
        const outputVariables = {};
        const gene = '';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Empty gene');
    });

    it('defaults the condition to true', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if true';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: trueNode,
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses a nonempty condition', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'if true then good if true';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: trueNode,
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('requires nonempty conditions to end with "then"', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            bad: 'boolean'
        };

        const gene = 'if true bad';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Missing then');
    });

    it('requires empty conditions to be completely omitted', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            bad: 'boolean'
        };

        const gene = 'if then bad';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Empty expression');
    });

    it('fails to parse real conditions', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            bad: 'boolean'
        };

        const gene = 'if 3 then bad';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Expected boolean valued expression');
    });

    it('requires an output variable', function() {
        const inputVariables = {};
        const outputVariables = {};

        const missingOutput = 'if true then';
        expect(() => parse(missingOutput, inputVariables, outputVariables)).
            to.throw('Missing output variable');

        const incorrectOutput = 'if true then is 3';
        expect(() => parse(incorrectOutput, inputVariables, outputVariables)).
            to.throw('Missing output variable');
    });

    it('defaults the expression to true for boolean outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'if true then good';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: trueNode,
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('requires the default expression to be completely empty', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'if true then good if';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Empty expression');
    });

    it('requires non-default expressions to be preceded by "if" for boolean outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'if true then good is true';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Missing if');
    });

    it('parses boolean expressions for boolean outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if true and false';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: trueNode,
                operator: 'A',
                right: falseNode
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('fails to parse real expressions for boolean outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if 3';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Expected boolean valued expression');
    });

    it('requires non-default expressions to be preceded by "is" for real outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const gene = 'if true then good if 3';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Missing is');
    });

    it('parses real expressions for real outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const gene = 'good is 3 + 2';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: threeNode,
                operator: 'P',
                right: twoNode
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('fails to parse boolean expressions for real outputs', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const gene = 'good is true';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Expected real valued expression');
    });

    it('detects parentheses mismatches', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const missingOpening = 'good if true)';
        expect(() => parse(missingOpening, inputVariables, outputVariables)).
            to.throw('Missing opening parentheses');

        const missingClosing = 'good if (true';
        expect(() => parse(missingClosing, inputVariables, outputVariables)).
            to.throw('Missing closing parentheses');
    });

    it('fails to parse unknown input variables', function() {
        const inputVariables: VariableTypes = {
            good: 'boolean'
        };
        const outputVariables = {};

        const gene = 'if bad then good';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Unknown variable "bad"');
    });

    it('fails to parse unknown output variables', function() {
        const inputVariables = {};
        const outputVariables = {};

        const gene = 'if true then bad';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Unknown variable "bad"');
    });

    it('requires one boolean argument for "not"', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const missingArgument = 'good if not';
        expect(() => parse(missingArgument, inputVariables, outputVariables)).
            to.throw('Unexpected token "not"');

        const realArgument = 'good if not 3';
        expect(() => parse(realArgument, inputVariables, outputVariables)).
            to.throw('Operator "not" cannot be applied to real values');

        const gene = 'good if not true';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: trueNode,
                operator: 'N'
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    const tokenOperatorMap: {
        [token: string]: string
    } = {
        '*': 'M',
        '+': 'P',
        '-': 'S',
        '/': 'D',
        '<': 'L',
        '>': 'G',
        'and': 'A',
        'or': 'O'
    };

    for (const token of ['and', 'or']) {
        it(`requires two boolean arguments for "${token}"`, function() {
            const inputVariables = {};
            const outputVariables: VariableTypes = {
                good: 'boolean'
            };

            const noArguments = `good if ${token}`;
            expect(() => parse(noArguments, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const noRightArgument = `good if true ${token}`;
            expect(
                () => parse(noRightArgument, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const noLeftArgument = `good if ${token} true`;
            expect(
                () => parse(noLeftArgument, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const realArguments = `good if 3 ${token} 3`;
            expect(() => parse(realArguments, inputVariables, outputVariables)).
                to.throw(
                    `Operator "${token}" cannot be applied to real values`);

            const gene = `good if true ${token} false`;
            const tree = parse(gene, inputVariables, outputVariables);

            const expected = {
                condition: trueNode,
                expression: {
                    left: trueNode,
                    operator: tokenOperatorMap[token],
                    right: falseNode
                },
                output: 'good'
            };

            expect(tree).to.deep.equal(expected);
        });
    }

    for (const token of ['/', '-', '*', '+']) {
        it(`requires two real arguments for "${token}"`, function() {
            const inputVariables = {};
            const outputVariables: VariableTypes = {
                good: 'real'
            };

            const noArguments = `good is ${token}`;
            expect(() => parse(noArguments, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const noRightArgument = `good is 3 ${token}`;
            expect(
                () => parse(noRightArgument, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            if (token !== '-') {
                const noLeftArgument = `good is ${token} 3`;
                expect(
                    () => parse(noLeftArgument, inputVariables, outputVariables)).
                    to.throw(`Unexpected token "${token}"`);
            }

            const booleanArguments = `good is true ${token} true`;
            expect(() => parse(booleanArguments, inputVariables, outputVariables)).
                to.throw(
                    `Operator "${token}" cannot be applied to boolean values`);

            const gene = `good is 3 ${token} 2`;
            const tree = parse(gene, inputVariables, outputVariables);

            const expected = {
                condition: trueNode,
                expression: {
                    left: threeNode,
                    operator: tokenOperatorMap[token],
                    right: twoNode
                },
                output: 'good'
            };

            expect(tree).to.deep.equal(expected);
        });
    }

    for (const token of ['>', '<']) {
        it(`requires two real arguments for "${token}"`, function() {
            const inputVariables = {};
            const outputVariables: VariableTypes = {
                good: 'boolean'
            };

            const noArguments = `good if ${token}`;
            expect(() => parse(noArguments, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const noRightArgument = `good if 3 ${token}`;
            expect(
                () => parse(noRightArgument, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const noLeftArgument = `good if ${token} 3`;
            expect(
                () => parse(noLeftArgument, inputVariables, outputVariables)).
                to.throw(`Unexpected token "${token}"`);

            const booleanArguments = `good if true ${token} true`;
            expect(() => parse(booleanArguments, inputVariables, outputVariables)).
                to.throw(
                    `Operator "${token}" cannot be applied to boolean values`);

            const gene = `good if 3 ${token} 2`;
            const tree = parse(gene, inputVariables, outputVariables);

            const expected = {
                condition: trueNode,
                expression: {
                    left: threeNode,
                    operator: tokenOperatorMap[token],
                    right: twoNode
                },
                output: 'good'
            };

            expect(tree).to.deep.equal(expected);
        });
    }

    it('fails to parse expressions with too many operands', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if true true';
        expect(() => parse(gene, inputVariables, outputVariables)).
            to.throw('Missing operator');
    });

    it('parses genes containing only a single boolean variable', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: trueNode,
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses negative constants', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const gene = 'good is -4 + -0';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    data: 0,
                    operator: 'C'
                },
                operator: 'P',
                right: zeroNode
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('requires one real argument for unary minus', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const booleanArgument = 'good is -true';
        expect(() => parse(booleanArgument, inputVariables, outputVariables)).
            to.throw('Operator "-" cannot be applied to boolean values');

        const gene = 'good is -(3 + 2)';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    left: threeNode,
                    operator: 'P',
                    right: twoNode
                },
                operator: 'U'
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses unary minus with the highest precendence', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const gene = 'good is -(3 + 2) * -(2 + 3)';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    left: {
                        left: threeNode,
                        operator: 'P',
                        right: twoNode
                    },
                    operator: 'U'
                },
                operator: 'M',
                right: {
                    left: {
                        left: twoNode,
                        operator: 'P',
                        right: threeNode
                    },
                    operator: 'U'
                }
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses "not" with the highest precedence', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if not true and not false or true';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    left: {
                        left: trueNode,
                        operator: 'N'
                    },
                    operator: 'A',
                    right: {
                        left: falseNode,
                        operator: 'N'
                    }
                },
                operator: 'O',
                right: trueNode
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses multiplication and division with higher precedence and addition and subtraction', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'real'
        };

        const gene = 'good is 3 * 2 + 3 / 2 - 3';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    left: {
                        left: threeNode,
                        operator: 'M',
                        right: twoNode
                    },
                    operator: 'P',
                    right: {
                        left: threeNode,
                        operator: 'D',
                        right: twoNode
                    }
                },
                operator: 'S',
                right: threeNode
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses comparison with lower precedence than arithemetic operators', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if 3 * 2 < 3 + 2';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    left: threeNode,
                    operator: 'M',
                    right: twoNode
                },
                operator: 'L',
                right: {
                    left: threeNode,
                    operator: 'P',
                    right: twoNode
                }
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses comparison with higher precedence than "and" and "or"', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if 3 > 2 and 2 < 3 or 3 > 2 or 2 < 3';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: {
                    left: {
                        left: {
                            left: threeNode,
                            operator: 'G',
                            right: twoNode
                        },
                        operator: 'A',
                        right: {
                            left: twoNode,
                            operator: 'L',
                            right: threeNode
                        }
                    },
                    operator: 'O',
                    right: {
                        left: threeNode,
                        operator: 'G',
                        right: twoNode
                    }
                },
                operator: 'O',
                right: {
                    left: twoNode,
                    operator: 'L',
                    right: threeNode
                }
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });

    it('parses "and" with higher precedence than "or"', function() {
        const inputVariables = {};
        const outputVariables: VariableTypes = {
            good: 'boolean'
        };

        const gene = 'good if true or false and true';
        const tree = parse(gene, inputVariables, outputVariables);

        const expected = {
            condition: trueNode,
            expression: {
                left: trueNode,
                operator: 'O',
                right: {
                    left: falseNode,
                    operator: 'A',
                    right: trueNode
                }
            },
            output: 'good'
        };

        expect(tree).to.deep.equal(expected);
    });
});
