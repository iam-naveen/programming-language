export const TokenTypes = {
  Illegal: "ILLEGAL",
  EOF: "EOF",
  Ident: "IDENT",
  Number: "NUMBER",
  Assign: "=",
  Plus: "+",
  Comma: ",",
  Semi: ";",
  LParen: "(",
  RParen: ")",
  LBrace: "{",
  RBrace: "}",
  Function: "FUNCTION",
  Var: "VAR",
  True: "TRUE",
  False: "FALSE",
  If: "IF",
  Else: "ELSE",
} as const;

type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export type Token = {
  type: TokenType;
  literal: string | number;
};

function createToken(type: TokenType, literal: string | number): Token {
  return { type, literal } satisfies Token;
}

const Keywords = {
  func: createToken(TokenTypes.Function, "func"),
  var: createToken(TokenTypes.Var, "var"),
  true: createToken(TokenTypes.True, "true"),
  false: createToken(TokenTypes.False, "false"),
  if: createToken(TokenTypes.If, "if"),
  else: createToken(TokenTypes.Else, "else"),
} as const;

export class Lexer {
  private index = 0;
  private position = 0;
  private readPosition = 0;
  private ch = "";

  constructor(private input: string) {
    this.readChar();
  }

  public nextToken(): Token {
    this.skipWhiteSpaces();
    let tok: Token;
    switch (this.ch) {
      case "=":
        tok = createToken(TokenTypes.Assign, this.ch);
        break;
      case ";":
        tok = createToken(TokenTypes.Semi, this.ch);
        break;
      case "(":
        tok = createToken(TokenTypes.LParen, this.ch);
        break;
      case ")":
        tok = createToken(TokenTypes.RParen, this.ch);
        break;
      case ",":
        tok = createToken(TokenTypes.Comma, this.ch);
        break;
      case "+":
        tok = createToken(TokenTypes.Plus, this.ch);
        break;
      case "{":
        tok = createToken(TokenTypes.LBrace, this.ch);
        break;
      case "}":
        tok = createToken(TokenTypes.RBrace, this.ch);
        break;
      case "\0":
        tok = createToken(TokenTypes.EOF, "");
        break;
      default:
        if (isLetter(this.ch)) {
          const ident = this.readIdentifier();
          const keyword = Keywords[ident as keyof typeof Keywords] || undefined;
          tok = keyword || createToken(TokenTypes.Ident, ident);
          return tok;
        } else if (isDigit(this.ch)) {
          tok = createToken(TokenTypes.Number, 0);
          tok.literal = this.readNumber();
          return tok;
        } else {
          tok = createToken(TokenTypes.Illegal, this.ch);
        }
    }
    this.readChar();
    return tok;
  }

  private readNumber(): number {
    const position = this.position;
    while (isDigit(this.ch)) {
      this.readChar();
    }
    return +this.input.slice(position, this.position);
  }

  private readIdentifier(): string {
    const position = this.position;
    while (isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = "\0";
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  private skipWhiteSpaces(): void {
    while (
      this.ch === " " ||
      this.ch === "\t" ||
      this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }
}

function isLetter(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
}

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}
