export const TokenTypes = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",
  IDENT: "IDENT",
  INT: "INT",
  ASSIGN: "=",
  PLUS: "+",
  COMMA: ",",
  SEMICOLON: ";",
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",
  FUNCTION: "FUNCTION",
  LET: "LET",
} as const;

type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

type Token = {
  type: TokenType;
  literal: string | number;
};

export function createToken(type: TokenType, literal: string | number) {
  return { type, literal };
}

export class Lexer {
  private index = 0;
  private position = 0;
  private readPosition = 0;
  private ch = "";

  constructor(private input: string) {
    this.readChar();
  }

  public nextToken(): Token {
    let tok: Token;
    switch (this.ch) {
      case "=":
        tok = createToken(TokenTypes.ASSIGN, this.ch);
        break;
      case ";":
        tok = createToken(TokenTypes.SEMICOLON, this.ch);
        break;
      case "(":
        tok = createToken(TokenTypes.LPAREN, this.ch);
        break;
      case ")":
        tok = createToken(TokenTypes.RPAREN, this.ch);
        break;
      case ",":
        tok = createToken(TokenTypes.COMMA, this.ch);
        break;
      case "+":
        tok = createToken(TokenTypes.PLUS, this.ch);
        break;
      case "{":
        tok = createToken(TokenTypes.LBRACE, this.ch);
        break;
      case "}":
        tok = createToken(TokenTypes.RBRACE, this.ch);
        break; 
      case "\0":
        tok = createToken(TokenTypes.EOF, "");
        break;
      default:
        tok = createToken(TokenTypes.ILLEGAL, this.ch);
        break;
    }
    this.readChar();
    return tok;
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
}
