import {readdirSync,readFileSync,existsSync} from 'node:fs';import {execFileSync} from 'node:child_process';
for(const dir of ['public','api','lib','scripts','tests'])for(const name of readdirSync(dir)){if(/\.(m?js)$/.test(name))execFileSync(process.execPath,['--check',dir+'/'+name],{stdio:'inherit'});}
execFileSync(process.execPath,['--test','tests/security.test.mjs'],{stdio:'inherit'});
for(const file of ['index.html','admin.html']){const html=readFileSync('public/'+file,'utf8');for(const m of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)){if(/\.(?:css|js|svg)$/.test(m[1])&&!existsSync('public'+m[1]))throw Error('Missing asset '+m[1]);}}
console.log('Build validated: syntax, security tests, public assets.');