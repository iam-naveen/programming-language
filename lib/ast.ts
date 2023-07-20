import { Token } from "./token.ts";

// Types and Interfaces
// - Node
// - Statement
// - Expression

interface Node {
  tokenLiteral(): string;
  toString(): string;
}

export abstract class Statement implements Node {
  abstract statementNode(): void;
  abstract tokenLiteral(): string;
  abstract toString(): string;
}

export abstract class Expression implements Node {
  expressionNode(): void;
}

// Program class
// - statements: Statement[]
// + tokenLiteral(): string

// Root Node of the AST

export class Program implements Node {
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

export class Identifier implements Expression, Node {
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

export class VarStatement extends Statement {
  toString(): string {
    throw new Error("Method not implemented.");
  }
  token: Token;
  refers!: Identifier;
  value: Expression | undefined;

  constructor(token: Token) {
    super();
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  statementNode(): void {}
}

// ReturnStatement class
// - token: Token
// - returnValue: Expression | undefined
// + tokenLiteral(): string
// + statementNode(): void

export class ReturnStatement extends Statement {
  token: Token;
  returnValue: Expression | undefined;

  constructor(token: Token) {
    super();
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  toString(): string {
    throw new Error("Method not implemented.");
  }

  statementNode(): void {}
}

// IfStatement class
// - token: Token
// - condition: Expression | undefined
// - consequence: BlockStatement | undefined
// - alternative: BlockStatement | undefined
// + tokenLiteral(): string
// + statementNode(): void

export class IfStatement extends Statement {
  token: Token;
  condition: Expression | undefined;
  consequence: BlockStatement | undefined;
  alternative: BlockStatement | undefined;

  constructor(token: Token) {
    super();
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  toString(): string {
    throw new Error("Method not implemented.");
  }

  statementNode(): void {}
}

// BlockStatement class
// - token: Token
// - statements: Statement[]
// + tokenLiteral(): string
// + statementNode(): void

export class BlockStatement extends Statement {
  token: Token;
  statements: Statement[] = [];

  constructor(token: Token) {
    super();
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  toString(): string {
    throw new Error("Method not implemented.");
  }

  statementNode(): void {}
}

// ExpressionStatement class
// - token: Token
// - expression: Expression | undefined
// + tokenLiteral(): string
// + statementNode(): void

export class ExpressionStatement extends Statement {
  token: Token;
  expression: Expression | undefined;

  constructor(token: Token) {
    super();
    this.token = token;
  }

  tokenLiteral(): string {
    return this.token.literal as string;
  }

  toString(): string {
    throw new Error("Method not implemented.");
  }

  statementNode(): void {}
}
