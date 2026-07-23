export default function codeGen(node) {
    switch(node.type){
        case 'Program':
            return node.body.map(codeGen).join('\n');
        case 'Declaration':
            return `let ${node.name} = ${node.value};`;
        case 'print':
            if (node.expressionType === 'string') {
                return `console.log(${JSON.stringify(node.expression)});`;
            }
            return `console.log(${node.expression});`;
    }
}