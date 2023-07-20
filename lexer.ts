import { Token, TokenTypes, createToken, Keywords } from "./lib/token.ts";

export class Lexer {
  private index = 0;
  private position = 0;
  private readPosition = 0;
  private ch = "";

  constructor(private input: string) {
    this.readChar();
  }

  public nextToken(): Token {
    this.skipWhiteSpaces(); // whitespaces not considered

    // create a token based on the current character
    let tok: Token;
    switch (this.ch) {
      case "=":
        if (this.peekChar() === "=") {
          let literal = this.ch;
          this.readChar();
          literal += this.ch;
          tok = createToken(TokenTypes.Eq, literal);
        } else {
          tok = createToken(TokenTypes.Assign, this.ch);
        }
        break;
      case "!":
        if (this.peekChar() === "=") {
          let literal = this.ch;
          this.readChar();
          literal += this.ch;
          tok = createToken(TokenTypes.NotEq, literal);
        } else {
          tok = createToken(TokenTypes.Bang, this.ch);
        }
        break;
      case "<":
        if (this.peekChar() === "=") {
          let literal = this.ch;
          this.readChar();
          literal += this.ch;
          tok = createToken(TokenTypes.LessThanEq, literal);
        } else {
          tok = createToken(TokenTypes.LessThan, this.ch);
        }
        break;
      case ">":
        if (this.peekChar() === "=") {
          let literal = this.ch;
          this.readChar();
          literal += this.ch;
          tok = createToken(TokenTypes.GreaterThanEq, literal);
        } else {
          tok = createToken(TokenTypes.GreaterThan, this.ch);
        }
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
        // tokens that can be more than one character
        if (isLetter(this.ch)) {
          const ident = this.readIdentifier();
          const keyword = Keywords[ident as keyof typeof Keywords] || undefined;
          // identifier token or keyword token
          tok = keyword || createToken(TokenTypes.Ident, ident);
          return tok;
        }
        // number token with literal values
        else if (isDigit(this.ch)) {
          tok = createToken(TokenTypes.Number, 0);
          tok.literal = this.readNumber();
          return tok;
        }
        // Invalid token
        else {
          tok = createToken(TokenTypes.Illegal, this.ch);
        }
    }
    this.readChar();
    return tok;
  }

  // reads the Number literal and returns it as a number
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

  private peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return "\0";
    } else {
      return this.input[this.readPosition];
    }
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
