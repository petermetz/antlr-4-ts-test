import { ANTLRInputStream, CommonTokenStream, Token } from 'antlr4ts';
import { SOQLParser } from "../../gen/typescript/soql-parser/src/main/g4/SOQLParser";
import { SOQLLexer } from "../../gen/typescript/soql-parser/src/main/g4/SOQLLexer";

// Create the lexer and parser
let inputStream = new ANTLRInputStream("SELECT Id FROM Account WHERE CreatedDate > LAST_N_DAYS:14");
let lexer = new SOQLLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new SOQLParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
//let result = parser.compilationUnit();

const currentToken: Token = parser.consume();
console.log(`--------  CURRENT TOKEN: `, currentToken.charPositionInLine, currentToken.startIndex, currentToken.stopIndex);
console.log(currentToken);