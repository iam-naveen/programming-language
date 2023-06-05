import { Lexer, Token } from "./lexer.ts";

function run() {
  console.log("Interactive Console");
  let input: string | null;
  while ((input = prompt(">>"))) {
    const lexer = new Lexer(input);
    let tok: Token;
    while ((tok = lexer.nextToken()).type !== "EOF") {
      console.log(tok);
    }
  }
}
run();
