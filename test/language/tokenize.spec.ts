/* tslint:disable:only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import 'mocha';
import { Token } from './../../src/language/token';
import tokenize from './../../src/language/tokenize';

describe('tokenize', function() {
    it('tokenizes the empty string', function() {
        const s = '';
        expect(tokenize(s)).to.be.empty;
    });

    it('tokenizes a string containing only whitespace', function() {
        const s = '   ';
        expect(tokenize(s)).to.be.empty;
    });

    it('tokenizes known tokens', function() {
        const s = 'and ) - 3.875 / false > if := < - * not ( or + then true';
        expect(tokenize(s)).to.deep.equal([
            {
                token: Token.And
            },
            {
                token: Token.CloseParenthesis
            },
            {
                token: Token.Minus
            },
            {
                data: 63,
                token: Token.Constant
            },
            {
                token: Token.DividedBy
            },
            {
                token: Token.False
            },
            {
                token: Token.GreaterThan
            },
            {
                token: Token.If
            },
            {
                token: Token.IsSetTo
            },
            {
                token: Token.LessThan
            },
            {
                token: Token.UnaryMinus
            },
            {
                token: Token.MultipliedBy
            },
            {
                token: Token.Not
            },
            {
                token: Token.OpenParenthesis
            },
            {
                token: Token.Or
            },
            {
                token: Token.Plus
            },
            {
                token: Token.Then
            },
            {
                token: Token.True
            }
        ]);
    });

    it('collapses whitespace between tokens', function() {
        const s = '    if  3.875\n\n\t then   ';
        expect(tokenize(s)).to.deep.equal([
            {
                token: Token.If
            },
            {
                data: 63,
                token: Token.Constant
            },
            {
                token: Token.Then
            }
        ]);
    });

    it('tokenizes symbols without surrounding whitespace', function() {
        const s = 'if((0+0-0/0*0<0>0++)then';
        expect(tokenize(s)).to.deep.equal([
            {
                token: Token.If
            },
            {
                token: Token.OpenParenthesis
            },
            {
                token: Token.OpenParenthesis
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.Plus
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.Minus
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.DividedBy
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.MultipliedBy
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.LessThan
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.GreaterThan
            },
            {
                data: 32,
                token: Token.Constant
            },
            {
                token: Token.Plus
            },
            {
                token: Token.Plus
            },
            {
                token: Token.CloseParenthesis
            },
            {
                token: Token.Then
            }
        ]);
    });

    it('ignores case', function() {
        const s = 'if IF iF If';
        expect(tokenize(s)).to.deep.equal([
            {
                token: Token.If
            },
            {
                token: Token.If
            },
            {
                token: Token.If
            },
            {
                token: Token.If
            }
        ]);
    });

    it('tokenizes variables between known tokens', function() {
        const s = 'if I see a blue creature to my left then';
        expect(tokenize(s)).to.deep.equal([
            {
                token: Token.If
            },
            {
                data: 'i see a blue creature to my left',
                token: Token.Variable
            },
            {
                token: Token.Then
            }
        ]);
    });

    it('tokenizes a variable as the first token', function() {
        const s = 'I see a blue creature to my left then';
        expect(tokenize(s)).to.deep.equal([
            {
                data: 'i see a blue creature to my left',
                token: Token.Variable
            },
            {
                token: Token.Then
            }
        ]);
    });

    it('tokenizes a variable as the last token', function() {
        const s = 'if I see a blue creature to my left';
        expect(tokenize(s)).to.deep.equal([
            {
                token: Token.If
            },
            {
                data: 'i see a blue creature to my left',
                token: Token.Variable
            }
        ]);
    });

    it('fails to tokenize unknown constants', function() {
        const s = '3.26';
        expect(() => tokenize(s)).to.throw('Unknown constant "3.26"');
    });
});
