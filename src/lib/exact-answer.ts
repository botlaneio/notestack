/** Small arithmetic parser: numbers, fractions, powers and sqrt. Never executes input. */
export function parseExactAnswer(input:string):number|null {
 const source=input.trim().replace(/−/g,'-').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/√/g,'sqrt').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\s+/g,'');
 if(!source||source.length>160||!/^[\d.+*/()^sqrt-]+$/.test(source))return null;
 const tokens=source.match(/sqrt|\d*\.\d+|\d+(?:\.\d*)?|[+*/()^-]/g)??[];
 if(tokens.join('')!==source||tokens.length>100)return null;
 let at=0,depth=0;
 function atom():number{if(++depth>20)throw Error();let v:number;const t=tokens[at++];if(t==='('){v=sum();if(tokens[at++]!==')')throw Error()}else if(t==='sqrt'){v=Math.sqrt(atom())}else if(t&&/^\d*\.?\d/.test(t))v=Number(t);else throw Error();depth--;return v}
 function power():number{let v=atom();if(tokens[at]==='^'){at++;const e=unary();if(Math.abs(e)>20)throw Error();v=v**e}return v}
 function unary():number{if(tokens[at]==='+'){at++;return unary()}if(tokens[at]==='-'){at++;return -unary()}return power()}
 function product():number{let v=unary();while(tokens[at]==='*'||tokens[at]==='/'){const t=tokens[at++],b=unary();v=t==='*'?v*b:v/b}return v}
 function sum():number{let v=product();while(tokens[at]==='+'||tokens[at]==='-'){const t=tokens[at++],b=product();v=t==='+'?v+b:v-b}return v}
 try{const v=sum();return at===tokens.length&&Number.isFinite(v)?v:null}catch{return null}
}
