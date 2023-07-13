import { Token } from "./token.ts";

// Types and Interfaces
// - Node
// - Statement
// - Expression

type Node = {
  tokenLiteral(): string;
};

export interface Statement extends Node {
  statementNode(): void;
}

export interface Expression extends Node {
  expressionNode(): void;
}

// Program class
// - statements: Statement[]
// + tokenLiteral(): string

// Root Node of the AST

export class Program {
  statements: Statement[] = [];

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    }
    return "";
  }
}

// Identifier class
// - token: Token
// - refers: string
// - value: string
// + tokenLiteral(): string
// + expressionNode(): void

export class Identifier implements Expression {
  token: Token;
  value!: string;

  constructor(token: Token) {
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  expressionNode(): void {}
}

// VarStatement class
// - token: Token
// - name: Identifier
// - value: Expression | undefined
// + tokenLiteral(): string
// + statementNode(): void

export class VarStatement implements Statement {
  token: Token;
  refers!: Identifier;
  value!: Expression | undefined;

  constructor(token: Token) {
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  statementNode(): void {}
}

