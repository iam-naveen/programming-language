export const TokenTypes = {
  Illegal: "ILLEGAL",
  EOF: "EOF",
  Ident: "IDENT",
  Number: "NUMBER",

  Assign: "=",
  Plus: "+",
  Minus: "-",
  Bang: "!",
  Slash: "/",
  Star: "*",

  LessThan: "<",
  GreaterThan: ">",
  Eq: "==",
  NotEq: "!=",
  LessThanEq: "<=",
  GreaterThanEq: ">=",

  Comma: ",",
  Semi: ";",
  LParen: "(",
  RParen: ")",
  LBrace: "{",
  RBrace: "}",
  LBracket: "[",
  RBracket: "]",
  Colon: ":",
  Quote: '"',
  SQuote: "'",
  Dot: ".",

  Function: "FUNCTION",
  Return: "RETURN",
  Var: "VAR",
  True: "TRUE",
  False: "FALSE",
  If: "IF",
  Else: "ELSE",
  Do: "DO",
  While: "WHILE",
  Until: "UNTIL",
  String: "STRING",
  Comment: "COMMENT",
} as const;

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export type Token = {
  type: TokenType;
  literal: string | number;
};

export function createToken(type: TokenType, literal: string | number): Token {
  return { type, literal } satisfies Token;
}

export const Keywords = {
  seyal: createToken(TokenTypes.Function, "seyal"),
  indha: createToken(TokenTypes.Var, "intha"),
  AAM: createToken(TokenTypes.True, "AAM"),
  ILLAI: createToken(TokenTypes.False, "ILLAI"),
  irundhaal: createToken(TokenTypes.If, "irundhaal"),
  illana: createToken(TokenTypes.Else, "illana"),
  return: createToken(TokenTypes.Return, "return"),
  sei: createToken(TokenTypes.Do, "sei"),
  bodhu: createToken(TokenTypes.While, "bothu"),
  varai: createToken(TokenTypes.Until, "varai"),
} as const;
