import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { Lexer } from "../lexer.ts";
import { Parser } from "../parser.ts";
import { ReturnStatement, LetStatement } from "../lib/ast.ts";
import { TokenTypes } from "../lib/token.ts";

// UNIT TEST FOR PARSER

function tester() {
  const input = `

  indha x = 5;
  indha y = 10*5;
  indha num = 838383;

  return 1;
  `;

  const expectedIdentifiers = ["x", "y", "num"];

  const lexer = new Lexer(input);
  // console.log(lexer);
  const parser = new Parser(lexer);
  // console.log(parser);
  const program = parser.parseProgram();
  const errorCount = parser.checkParserErrors();

  if (errorCount > 0) {
    assertEquals(errorCount, 0);
    return;
  }
  console.log(program.statements);
  expectedIdentifiers.forEach((expectedIdentifier, i) => {
    const statement = program.statements[i] as LetStatement;
    assertEquals(statement.refers.tokenLiteral(), expectedIdentifier);
  });
  const statement = program.statements[3] as ReturnStatement;
  assertEquals(statement.token.type, TokenTypes.Return);
}

Deno.test("testing the parser", tester);
