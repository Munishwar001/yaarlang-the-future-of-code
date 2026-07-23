export default function parser(tokens) {
    const ast = { type: "Program", body: [] };

    while(tokens.length  > 0){
       let token =  tokens.shift(); 
       if(token.type === 'keyword' && token.value === 'maan_lo'){
         let declaration = {
            type: `Declaration`,
            name: tokens.shift().value,
            value: null
         }

         if(tokens[0] && tokens[0].type === 'operator' && tokens[0].value === '='){
            tokens.shift(); // remove '='
            let expression = '';
            while(tokens.length > 0 && tokens[0].type !== 'keyword'){
                expression += tokens.shift().value + ' ';
            }
            declaration.value = expression.trim();
         }
         ast.body.push(declaration);
       }
       if(token.type === 'keyword' && token.value === 'bol'){
         const exprToken = tokens.shift();
         ast.body.push({
            type: 'print',
            expression: exprToken.value,
            expressionType: exprToken.type
         });
       }
    }
    return ast;
}