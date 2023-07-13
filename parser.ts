import { Program, VarStatement, Identifier, Statement } from "./lib/ast.ts";
import { Token, TokenType, TokenTypes } from "./lib/token.ts";
import { Lexer } from "./lexer.ts";

export class Parser {

  lexer: Lexer;

  currentToken!: Token;
  nextToken!: Token;
  
  errors: string[] = [];

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.advanceToken();
    this.advanceToken();
  }

  advanceToken() {
    this.currentToken = this.nextToken;
    this.nextToken = this.lexer.nextToken();
  }

  checkParserErrors(): number {
    if (this.errors.length == 0) {
      return 0;
    }
    console.log("parser has errors");
    this.errors.forEach((error) => {
      console.error(error);
    });
    return this.errors.length;
  }

  parseProgram() {
    const program = new Program();
    while (this.nextToken.type != TokenTypes.EOF) {
      const statement = this.parseStatement();
      if (statement) {
        program.statements.push(statement);
      }
      this.advanceToken();
    }

    return program;
  }

  parseStatement(): Statement | null {
    switch (this.currentToken.type) {
      case TokenTypes.Var:
        return this.parseVarStatement();
      case TokenTypes.Return:
        return this.parseReturnStatement();
      default:
        return null;
    }
  }

  parseVarStatement(): Statement | null {
    const varStatement = new VarStatement(this.currentToken);

    if (!this.ifNextIs(TokenTypes.Ident)) return null;

    varStatement.refers = new Identifier(this.currentToken);
    varStatement.value = undefined;

    if (!this.ifNextIs(TokenTypes.Assign)) return null;

    while (this.currentToken.type != TokenTypes.Semi) {
      this.advanceToken();
    }
    return varStatement;
  }

  parseReturnStatement(): Statement | null {
    return null;
  }
  parseIfStatement(): Statement | null {
    return null;
  }

  private ifNextIs(tokenType: TokenType) {
    if (this.nextToken.type == tokenType) {
      this.advanceToken();
      return true;
    } else {
      this.generateParseError(tokenType);
      return false;
    }
  }

  private generateParseError(expectedTokenType: TokenType) {
    const msg = `Expected next token to be ${expectedTokenType}, got ${this.nextToken.literal}`;
    this.errors.push(msg);
  }
}
