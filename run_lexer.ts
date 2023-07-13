import { Lexer } from "./lexer.ts";
import { Token } from "./lib/token.ts";

function run() {

  console.log("Interactive Console for using the Lexer");

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
