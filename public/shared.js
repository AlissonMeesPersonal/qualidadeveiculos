export const $=(q,r=document)=>r.querySelector(q);
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money=v=>Number(v)>0?Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}):'Sob consulta';
export const km=v=>Number(v).toLocaleString('pt-BR')+' km';
export const wa=(phone,message)=>'https://wa.me/'+String(phone).replace(/\D/g,'')+'?text='+encodeURIComponent(message);
export const statusLabels={available:'Disponível',reserved:'Reservado',draft:'Rascunho',sold:'Vendido',archived:'Arquivado'};
export async function api(action,body){const r=await fetch('/api/data?action='+action,{method:body?'POST':'GET',credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});let data;try{data=await r.json()}catch{throw Error('Serviço indisponível. Tente novamente.')}if(!r.ok)throw Object.assign(Error(data.error||'Não foi possível concluir.'),{status:r.status});return data;}
export function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('visible');setTimeout(()=>t.classList.remove('visible'),5000);}
export function imageFallback(root=document){root.querySelectorAll('img').forEach(img=>{img.addEventListener('error',()=>{img.src='/placeholder.svg'},{once:true});});}