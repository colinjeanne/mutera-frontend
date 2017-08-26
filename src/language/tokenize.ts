import { getConstantIndex } from './constantIndex';
import {
    isKeyword,
    isKnownToken,
    isOperator,
    ParsedToken,
    Token
} from './token';

class TokenizationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

const tokenize = (s: string) => {
    const elements = s.
        toLowerCase().
        replace(/[(/><\-*+)]/g, ' $& ').
        split(/\s+/).
        filter(x => x);
    const parsedTokens: ParsedToken[] = [];

    let variableStart = -1;
    for (let i = 0; i < elements.length; ++i) {
        const token = elements[i];
        if (isKnownToken(token)) {
            if (variableStart !== -1) {
                const data = elements.slice(variableStart, i).join(' ');
                parsedTokens.push({
                    data,
                    token: Token.Variable
                });

                variableStart = -1;
            }

            const previousToken = (i !== 0) ?
                parsedTokens[parsedTokens.length - 1].token :
                null;

            if (
                (token === Token.Minus) &&
                (
                    !previousToken ||
                    isOperator(previousToken) ||
                    isKeyword(previousToken)
                )
            ) {
                parsedTokens.push({
                    token: Token.UnaryMinus
                });
            } else {
                parsedTokens.push({
                    token: token as Token
                } as ParsedToken);
            }
        } else if (/\d/.test(token[0])) {
            let constant = parseFloat(token);
            while (
                parsedTokens.length &&
                (parsedTokens[parsedTokens.length - 1].token === Token.UnaryMinus)
            ) {
                parsedTokens.pop();
                constant *= -1;
            }

            const constantIndex = getConstantIndex(constant);
            if (constantIndex === -1) {
                throw new TokenizationError(`Unknown constant "${token}"`);
            }

            parsedTokens.push({
                data: constantIndex,
                token: Token.Constant
            });
        } else if (variableStart === -1) {
            variableStart = i;
        }
    }

    if (variableStart !== -1) {
        const data = elements.slice(variableStart).join(' ');
        parsedTokens.push({
            data,
            token: Token.Variable
        });
    }

    return parsedTokens;
};

export default tokenize;
