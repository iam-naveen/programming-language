import { Token, TokenType, TokenTypes } from "./lib/token.ts";
import { Lexer } from "./lexer.ts";
import {
  Program,
  Statement,
  Identifier,
  LetStatement,
  ReturnStatement,
  // IfStatement,
} from "./lib/ast.ts";

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
        return this.parseLetStatement();
      case TokenTypes.Return:
        return this.parseReturnStatement();
      default:
        return null;
    }
  }

  parseLetStatement(): Statement | null {
    const letStatement = new LetStatement(this.currentToken);

    if (!this.ifNextIs(TokenTypes.Ident)) return null;

    letStatement.refers = this.parseIdentifier();

    if (!this.ifNextIs(TokenTypes.Assign)) return null;

    while (this.currentToken.type != TokenTypes.Semi) {
      this.advanceToken();
    }
    return letStatement;
  }

  parseReturnStatement(): Statement | null {
    const returnStatement = new ReturnStatement(this.currentToken);
    returnStatement.returnValue = undefined;

    while (this.currentToken.type != TokenTypes.Semi) {
      this.advanceToken();
    }

    return returnStatement;
  }

  parseIdentifier() {
    const identifier = new Identifier(this.currentToken);
    return identifier;
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
