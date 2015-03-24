%lex

%%

"+" return 'ADD';
"-" return 'SUB';
"*" return 'MUL';
"/" return 'DIV';
"^" return 'EXP';
"&" return 'CONCAT';
"(" return 'LEFT_PAREN';
")" return 'RIGHT_PAREN';
"%" return 'PERCENT';
\s+ /* skip whitespace */
"," return 'ARG_SEPARATOR';
"=" return 'EQ';
"<" return 'LT';
">" return 'GT';
"<=" return 'LTE';
">=" return 'GTE';
"<>" return 'NE';
\d+(\.\d+)?([e][+-]\d{1,3})? return 'NUMBER';
\"(""|[^"])*\" return 'STRING_LITERAL';
"True" return 'TRUE';
"False" return 'FALSE';
[A-Z][\w]*\( return 'FUNCTION_NAME';


"#DIV/0!" return 'DIV_ERROR';
"#N/A"    return 'NA_ERROR';
"#NAME?"  return 'NAME_ERROR';
"#NULL!"  return 'NULL_ERROR';
"#REF!"   return 'REF_ERROR';
"#VALUE!" return 'VALUE_ERROR';
"#NUM!"   return 'NUM_ERROR';

\$?[A-Z]{1,2}\$?\d{1,5} return 'CELL';
\$?[A-Z]{1,2}\$?\d{1,5}:\$?[A-Z]{1,2}\$?\d{1,5} return 'CELL_RANGE';
\$?\d{1,5}:\$?\d{1,5} return 'ROW_RANGE';
\$?[A-Z]{1,2}:\$?[A-Z]{1,2} return 'COLUMN_RANGE';
[_A-Z][\w]*! return 'SHEET_NAME';
[_A-Z][\w]* return 'DEFINED_NAME';

/lex

%%

Formula: EQ ScalarFormula | ScalarFormula;

ScalarFormula: PrimaryExpression;

PrimaryExpression: Expression;

Expression: LogicalExpression;

LogicalExpression: ConcatExpression | ConcatExpression LogicalOp ConcatExpression;

LogicalOp: EQ | GT | LT | GTE | LTE | NE;

ConcatExpression: AdditiveExpression | AdditiveExpression CONCAT AdditiveExpression;

AdditiveExpression : MultiplicativeExpression | MultiplicativeExpression AdditiveOp MultiplicativeExpression;

AdditiveOp : PLUS | MINUS;

MultiplicativeExpression : ExponentiationExpression | ExponentiationExpression MultiplicativeOp ExponentiationExpression;

MultiplicativeOp : MUL | DIV;

ExponentiationExpression : PercentExpression | PercentExpression EXP PercentExpression;

PercentExpression : UnaryExpression PERCENT | UnaryExpression;

UnaryExpression : BasicExpression | PLUS BasicExpression | MINUS BasicExpression;

BasicExpression : Primitive | FunctionCall | Reference | ExpressionGroup;

Reference : DEFINED_NAME | GridReferenceExpression;

GridReferenceExpression : SHEET_NAME GridReference | GridReference;

GridReference : CELL | CELL_RANGE | ROW_RANGE | COLUMN_RANGE;

FunctionCall : FUNCTION_NAME ArgumentList RIGHT_PAREN | FUNCTION_NAME RIGHT_PAREN;

ArgumentList : Expression | Expression ARG_SEPARATOR Expression;

ExpressionGroup : LEFT_PAREN Expression RIGHT_PAREN;

Primitive : NUMBER | Boolean | STRING_LITERAL | ErrorExpression;

Boolean : TRUE | FALSE;

ErrorExpression : DIV_ERROR | NA_ERROR | NAME_ERROR | NULL_ERROR | REF_ERROR | VALUE_ERROR | NUM_ERROR;
