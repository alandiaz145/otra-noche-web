// Cloudflare Pages Functions. Requiere D1 con el binding DB y db/schema.sql aplicado.
interface Env { DB?: D1Database }
interface D1Database { prepare: (query:string) => { bind:(...values:unknown[])=> {run:()=>Promise<unknown>} } }
interface RequestContext { request:Request; env:Env }
const reply=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
const clean=(value:unknown,max=200)=>typeof value==='string'?value.trim().slice(0,max):'';
export async function onRequestPost({request,env}:RequestContext):Promise<Response>{
  if(!env.DB) return reply({message:'Todavía estamos configurando la recepción de postulaciones. Intentá más tarde.'},503);
  if(!(request.headers.get('content-type')||'').includes('application/json'))return reply({message:'Formato inválido.'},415);
  const raw=await request.text();
  if(raw.length>10000)return reply({message:'La postulación excede el tamaño permitido.'},413);
  let form:Record<string,unknown>;
  try{form=JSON.parse(raw);if(!form||Array.isArray(form)||typeof form!=='object')throw new Error();}catch{return reply({message:'Datos inválidos.'},400);}
  if(clean(form.website))return reply({message:'Recibimos tu postulación.'}); // honeypot
  const kind=clean(form.kind,8);
  const name=clean(form.name,100),city=clean(form.city,100),email=clean(form.email,180);
  const whatsapp=clean(form.whatsapp,30),instagram=clean(form.instagram,160);
  const experience=clean(form.experience,50),style=clean(form.style,120);
  const musicUrl=clean(form.musicUrl,500),message=clean(form.message,1500);
  if(!['rrpp','dj'].includes(kind)||name.length<2||city.length<2||!/^\S+@\S+\.\S+$/.test(email)||whatsapp.length<6||instagram.length<2)return reply({message:'Revisá los campos obligatorios.'},400);
  if(kind==='dj'){
    if(!style||!musicUrl)return reply({message:'Completá tu estilo y el enlace a tu música.'},400);
    try{const url=new URL(musicUrl);if(!['https:','http:'].includes(url.protocol))throw new Error();}catch{return reply({message:'El enlace a tu música no es válido.'},400);}
  }
  try{
    await env.DB.prepare('INSERT INTO applications(kind,name,city,email,whatsapp,instagram,experience,style,music_url,message) VALUES (?,?,?,?,?,?,?,?,?,?)')
      .bind(kind,name,city,email,whatsapp,instagram,experience,style,musicUrl,message).run();
    // Notificaciones por email pendientes de integrar con un proveedor autenticado.
    return reply({message:'Recibimos tu postulación.'},201);
  }catch{return reply({message:'No pudimos registrar la postulación. Intentá nuevamente más tarde.'},500);}
}
export function onRequestGet():Response{return reply({message:'Método no permitido.'},405);}
