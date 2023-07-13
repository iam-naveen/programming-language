import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { Lexer } from "../lexer.ts";
import { Parser } from "../parser.ts";
import { VarStatement } from "../lib/ast.ts";

// UNIT TEST FOR PARSER

function tester() {

  const input = `

  var x = 5;
  var y = 10*5;
  var num = 838383;

  `;

  const expectedIdentifiers = [
    "x", 
    "y", 
    "num"
  ];

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
  // console.log(program.statements);
  expectedIdentifiers.forEach((expectedIdentifier, i) => {
    const statement = program.statements[i] as VarStatement;
    assertEquals(statement.refers.tokenLiteral(), expectedIdentifier);
  });
}

Deno.test("testing the parser", tester);