import fs from'fs';
const e=process.env,I=e.MAKEFUN_INPUT_DIR||'/input',O=e.MAKEFUN_OUTPUT_DIR||'/output';
function f(s,W,F,X){const P={[s]:''},q=[s];
for(const c of q)for(let j=0,D=[-W,W,-1,1];j<4;j++){const n=c+D[j];
if(F.has(n)&&!X.has(n)&&!(n in P)){P[n]=P[c]+'udlr'[j];q.push(n);}}
return P;}
function r(R,W,e){
const C=R[0],E=R[1],G=R[3],D=[-W,W,-1,1],F=new Set([...C,E]);
const N=[[E,R[2].slice(),-1,0,'']],S=new Set([E+'|'+R[2]]);
let g=-1;
for(let h=0;h<N.length&&g<0;h++){const[p,b]=N[h],x=new Set(b);
const A=f(p,W,F,x);
if(b+''===G+''&&(!e||E in A)){g=h;break;}
for(const i of b)for(let j=0;j<4;j++){const d=D[j],o=i+d;
if(i-d in A&&C.has(o)&&!x.has(o)){
const m=b.map(v=>v-i?v:o).sort((a,b)=>a-b),k=i+'|'+m;
if(!S.has(k)){S.add(k);N.push([i,m,h,d,'udlr'[j]]);}}}}
if(g<0)return 0;
const y=[];for(let c=g;N[c][2]>=0;c=N[c][2])y.unshift(N[c]);
let t='',u=E,b=R[2].slice();
for(const[o,,,d,l]of y){t+=(f(u,W,F,new Set(b))[o-d]||'')+l;u=o;b=b.map(z=>z-o?z:o+d).sort((a,b)=>a-b);}
return[t,u,b];
}
for(const id of fs.readdirSync(I).sort()){
const t=fs.readFileSync(I+'/'+id+'/level.txt','utf8'),W=t.indexOf('\n'),g=t.replace(/\n/g,'');
const F=new Set(),G=[];let B=[],S=-1;
for(let i=0;i<g.length;i++){const c=g[i];
if(c!=='#')F.add(i);
if('.*+'.includes(c))G.push(i);
if('$*'.includes(c))B.push(i);
if('@+'.includes(c))S=i;}
const y=(S/W)|0,E=new Set(),M=[],D=[-W,W,-1,1];
for(const i of F){
if((i/W|0)===y||E.has(i))continue;
const C=new Set(),q=[i];E.add(i);
for(const c of q){C.add(c);
for(const d of D){const o=c+d;
if((o/W|0)!==y&&F.has(o)&&!E.has(o)){E.add(o);q.push(o);}}}
let e=-1;
for(const c of C)for(const d of D){const o=c+d;
if((o/W|0)===y&&F.has(o))e=o;}
M.push([C,e,B.filter(v=>C.has(v)),G.filter(v=>C.has(v))]);}
let m='',u=S,C=B.slice();
for(let k=0;k<M.length;k++){const R=M[k];
m+=(f(u,W,F,new Set(C))[R[1]]||'');u=R[1];
const s=r(R,W,k<M.length-1);
if(!s){m='';break;}
m+=s[0];u=s[1];C=C.filter(v=>!R[0].has(v)).concat(s[2]);}
fs.mkdirSync(O+'/'+id,{recursive:true});
fs.writeFileSync(O+'/'+id+'/solution.txt',m+'\n');
}
