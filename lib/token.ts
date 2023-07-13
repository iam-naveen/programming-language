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
  Return: "RETURN",
  Var: "VAR",
  True: "TRUE",
  False: "FALSE",
  If: "IF",
  Else: "ELSE",
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
  func: createToken(TokenTypes.Function, "func"),
  var: createToken(TokenTypes.Var, "var"),
  true: createToken(TokenTypes.True, "true"),
  false: createToken(TokenTypes.False, "false"),
  if: createToken(TokenTypes.If, "if"),
  else: createToken(TokenTypes.Else, "else"),
} as const;
