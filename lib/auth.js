import {randomBytes,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
export const digest=v=>createHash('sha256').update(v).digest('hex');
export function passwordHash(p){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(p,salt,64).toString('hex');}
export function passwordMatches(p,hash){try{const [salt,key]=hash.split(':');return timingSafeEqual(scryptSync(p,salt,64),Buffer.from(key,'hex'));}catch{return false;}}
export function secretMatches(a,b){if(!a||!b)return false;return timingSafeEqual(Buffer.from(digest(a)),Buffer.from(digest(b)));}
export const token=()=>randomBytes(32).toString('base64url');
export function cookie(value,maxAge=28800){return 'qv_session='+value+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age='+maxAge;}
export function sessionToken(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('qv_session='))?.slice(11)||'';}