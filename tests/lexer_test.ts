import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { Lexer } from "../lexer.ts";
import { TokenTypes } from "../lib/token.ts";

// UNIT TEST FOR LEXER

function tester() {
  const input = `

  indha five = 5;
  indha ten = 10;
  indha add = seyal(x, y) {
       x + y;
  };
  indha result = add(five, ten);

  result == 15;
  result != 10;
  
`;

  const expected_results = [
    { type: TokenTypes.Var, literal: "intha" },
    { type: TokenTypes.Ident, literal: "five" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Number, literal: 5 },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Var, literal: "intha" },
    { type: TokenTypes.Ident, literal: "ten" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Number, literal: 10 },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Var, literal: "intha" },
    { type: TokenTypes.Ident, literal: "add" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Function, literal: "seyal" },
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
    { type: TokenTypes.Var, literal: "intha" },
    { type: TokenTypes.Ident, literal: "result" },
    { type: TokenTypes.Assign, literal: "=" },
    { type: TokenTypes.Ident, literal: "add" },
    { type: TokenTypes.LParen, literal: "(" },
    { type: TokenTypes.Ident, literal: "five" },
    { type: TokenTypes.Comma, literal: "," },
    { type: TokenTypes.Ident, literal: "ten" },
    { type: TokenTypes.RParen, literal: ")" },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Ident, literal: "result" },
    { type: TokenTypes.Eq, literal: "==" },
    { type: TokenTypes.Number, literal: 15 },
    { type: TokenTypes.Semi, literal: ";" },
    { type: TokenTypes.Ident, literal: "result" },
    { type: TokenTypes.NotEq, literal: "!=" },
    { type: TokenTypes.Number, literal: 10 },
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
