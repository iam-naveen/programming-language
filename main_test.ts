import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { TokenTypes, Lexer } from "./main.ts";

function tester() {
  const input = `=+(){},;`;

  const expected_results = [
    TokenTypes.ASSIGN,
    TokenTypes.PLUS,
    TokenTypes.LPAREN,
    TokenTypes.RPAREN,
    TokenTypes.LBRACE,
    TokenTypes.RBRACE,
    TokenTypes.COMMA,
    TokenTypes.SEMICOLON,
  ];

  const lexer = new Lexer(input);

  expected_results.forEach((token_type) => {
    assertEquals(lexer.nextToken().type, token_type);
  });
}

Deno.test(tester);
