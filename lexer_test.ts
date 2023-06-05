import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { TokenTypes, Lexer } from "./lexer.ts";

function tester() {
  const input = `
  var five = 5;
  var ten = 10;
  var add = func(x, y) {
       x + y;
  };
  var result = add(five, ten);
`;

  const expected_results = [
    { type: TokenTypes.Var, literal: "var" },
    { type: TokenTypes.Ident, literal: "five" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Number, literal: 5 },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Var, literal: "var" },
    { type: TokenTypes.Ident, literal: "ten" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Number, literal: 10 },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Var, literal: "var" },
    { type: TokenTypes.Ident, literal: "add" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Function, literal: "func" },
    { type: TokenTypes.LParen, literal: "(" },
    { type: TokenTypes.Ident, literal: "x" },
    { type: TokenTypes.Comma, literal: "," },
    { type: TokenTypes.Ident, literal: "y" },
    { type: TokenTypes.RParen, literal: ")" },
    { type: TokenTypes.LBrace, literal: "{" },
    { type: TokenTypes.Ident, literal: "x" },
    { type: TokenTypes.Plus, literal: "+" },
    { type: TokenTypes.Ident, literal: "y" },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.RBrace, literal: "}" },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Var, literal: "var" },
    { type: TokenTypes.Ident, literal: "result" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Ident, literal: "add" },
    { type: TokenTypes.LParen, literal: "(" },
    { type: TokenTypes.Ident, literal: "five" },
    { type: TokenTypes.Comma, literal: "," },
    { type: TokenTypes.Ident, literal: "ten" },
    { type: TokenTypes.RParen, literal: ")" },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.EOF, literal: "" },
  ];

  const lexer = new Lexer(input);

  expected_results.forEach((tok) => {
    const token = lexer.nextToken();
    // console.log(token);
    assertEquals(token, tok, `token: "${token.literal}"`);
  });
}

Deno.test("testing nextToken() complete", tester);
