import { ANTLRInputStream, CommonTokenStream, Token, ParserRuleContext } from 'antlr4ts';
import { SOQLParser, From_clauseContext, Select_clauseContext, Soql_queryContext, Where_clauseContext } from "../../gen/typescript/soql-parser/src/main/g4/SOQLParser";
import { SOQLLexer } from "../../gen/typescript/soql-parser/src/main/g4/SOQLLexer";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";

const soqlString: string = `SELECT Id FROM Account WHERE CreatedDate > TODAY AND Id IN ('Id1', 'Id2') AND LastModifiedDate > YESTERDAY OR Id NOT IN ('x', 'y')`;
// Create the lexer and parser
let inputStream = new ANTLRInputStream(soqlString);
let lexer = new SOQLLexer(inputStream);
console.log('Lexing finished.');
let tokenStream = new CommonTokenStream(lexer);
console.log('Token stream finished.');
let parser = new SOQLParser(tokenStream);
console.log('Parser finished.');

const soqlQueryContext: Soql_queryContext = parser.soql_query();

const treeAsString: string = soqlQueryContext.toStringTree(parser);

console.log('==============================================================');
console.log(treeAsString)
console.log('==============================================================');


const dumpContext = (parseTree: ParseTree | ParserRuleContext, treeDepth: number = 0) => {
    if (parseTree.childCount > 0) {
        let index: number = 0;
        treeDepth++
        while (index < parseTree.childCount) {
            dumpContext(parseTree.getChild(index++), treeDepth);
        }
    } else { // leaf 
        const magin: string = '---|';
        console.log(magin.repeat(treeDepth) + ' ' + parseTree.text);
    }
};

soqlQueryContext.children.forEach(dumpContext);

console.log('==============================================================');


const whereClause: Where_clauseContext = soqlQueryContext.where_clause();

const whereCondition: string = soqlString.substring(whereClause.start.startIndex, whereClause.stop.stopIndex + 1);
console.log(whereCondition);
console.log(whereCondition.length);

