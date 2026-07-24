export default function codeGen(node) {
    switch(node.type){
        case 'Program':
            return [
                `function __yaarlang_print(value) {`,
                `  console.log(typeof value === 'boolean' ? '\\x1b[33m' + (value ? 'sach' : 'jhoot') + '\\x1b[39m' : value);`,
                `}`,
                `function __yaarlang_input(prompt) {`,
                `  if (prompt !== undefined) { process.stdout.write(String(prompt)); }`,
                `  const buffer = Buffer.alloc(4096);`,
                `  const bytesRead = fs.readSync(0, buffer, 0, 4096, null);`,
                `  return buffer.toString('utf8', 0, bytesRead).trim();`,
                `}`,
                ...node.body.map(codeGen)
            ].join('\n');
        case 'Declaration':
            return node.value === null
                ? `let ${node.name};`
                : `let ${node.name} = ${codeGen(node.value)};`;
        case 'Print':
            return `__yaarlang_print(${codeGen(node.expression)});`;
        case 'If': {
            const consequent = node.consequent.map(codeGen).join('\n');
            let code = `if (${codeGen(node.condition)}) {\n${consequent}\n}`;
            if (node.alternate) {
                code += ` else {\n${node.alternate.map(codeGen).join('\n')}\n}`;
            }
            return code;
        }
        case 'While':
            return `while (${codeGen(node.condition)}) {\n${node.body.map(codeGen).join('\n')}\n}`;
        case 'Assignment':
            return `${codeGen(node.target)} = ${codeGen(node.value)};`;
        case 'FunctionDeclaration':
            return `function ${node.name}(${node.params.join(', ')}) {\n${node.body.map(codeGen).join('\n')}\n}`;
        case 'Return':
            return node.value === null ? `return;` : `return ${codeGen(node.value)};`;
        case 'CallExpression':
            return `${node.callee}(${node.args.map(codeGen).join(', ')})`;
        case 'ExpressionStatement':
            return `${codeGen(node.expression)};`;
        case 'BinaryExpression':
            return `(${codeGen(node.left)} ${node.operator} ${codeGen(node.right)})`;
        case 'LogicalExpression':
            return `(${codeGen(node.left)} ${node.operator} ${codeGen(node.right)})`;
        case 'UnaryExpression':
            return `(${node.operator}${codeGen(node.argument)})`;
        case 'NumberLiteral':
            return `${node.value}`;
        case 'StringLiteral':
            return JSON.stringify(node.value);
        case 'Identifier':
            return node.name;
        case 'Input':
            return node.prompt ? `__yaarlang_input(${codeGen(node.prompt)})` : `__yaarlang_input()`;
        case 'ArrayLiteral':
            return `[${node.elements.map(codeGen).join(', ')}]`;
        case 'IndexExpression':
            return `${codeGen(node.object)}[${codeGen(node.index)}]`;
    }
}
