'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene({day}:{day:boolean}) {
 const mount=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  let renderer:THREE.WebGLRenderer;
  try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});} catch {return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7)); renderer.setClearColor(0x000000,0);el.appendChild(renderer.domElement);el.classList.add("webgl-ready");
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(37,1,.1,100);camera.position.set(0,2.2,11);camera.lookAt(0,.1,0);
  scene.add(new THREE.HemisphereLight(0xe9f3ff,0x493f65,2));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-3,6,7);scene.add(light);
  const group=new THREE.Group();scene.add(group);
  const mat=(color:number,roughness=.9)=>new THREE.MeshStandardMaterial({color,roughness});
  const sphere=(radius:number,color:number,x:number,y:number,z:number,sx=1,sy=1,sz=1)=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(radius,32,24),mat(color));mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);group.add(mesh);return mesh;};
  sphere(2.05,0xc2cbe0,0,-1.15,0,1,.34,.75);
  [[-1.2,-.8,.75,.35],[.65,-.74,1.03,.29],[1.28,-1.24,.75,.18],[-.3,-1.57,1.45,.22]].forEach(([x,y,z,r])=>sphere(r,0x99a7c2,x,y,z,1,.18,.8));
  const body=sphere(.49,0xe9f0f8,.03,.15,.25,.9,1.1,.78);body.rotation.z=-.18;
  sphere(.51,0xf7f7ff,.02,1.02,.25);sphere(.39,0x233655,.01,1.04,.61,1,.87,.32);sphere(.16,0x97d8ee,-.12,1.16,.73,1,.4,.2);
  sphere(.22,0xe7eef9,-.48,.22,.41,1,1.9,1).rotation.z=-.6;sphere(.22,0xe7eef9,.50,.25,.35,1,1.9,1).rotation.z=.7;
  sphere(.25,0xe7eef9,-.28,-.37,.72,1,1.5,1).rotation.z=-.65;sphere(.25,0xe7eef9,.35,-.36,.72,1,1.5,1).rotation.z=.65;
  const laptop=new THREE.Mesh(new THREE.BoxGeometry(.83,.58,.06),mat(0x7197a6)); laptop.position.set(.04,.02,1.05);laptop.rotation.x=-.22;group.add(laptop);
  const mark=new THREE.Mesh(new THREE.CircleGeometry(.055,24),mat(0xd5f4fa));mark.position.set(.04,.06,1.1);group.add(mark);
  const stars=new THREE.BufferGeometry();const pts=[];for(let i=0;i<120;i++)pts.push((Math.random()-.5)*17,(Math.random()-.5)*11,(Math.random()-.5)*5-2);stars.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));const points=new THREE.Points(stars,new THREE.PointsMaterial({color:day?0x557a9a:0xbddcff,size:.035,transparent:true,opacity:.8}));scene.add(points);
  const resize=()=>{const w=el.clientWidth||500,h=el.clientHeight||500;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()};resize();window.addEventListener('resize',resize);
  let frame=0; const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const animate=()=>{frame=requestAnimationFrame(animate);if(!reduced){group.rotation.y=Math.sin(Date.now()*.00045)*.13;group.position.y=Math.sin(Date.now()*.001)*.06;points.rotation.z+=.00015;}renderer.render(scene,camera)};animate();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose()}});stars.dispose();(points.material as THREE.Material).dispose();renderer.dispose();renderer.domElement.remove()};
 },[day]);
 return <div ref={mount} className="scene" role="img" aria-label="An astronaut with a laptop sitting on the moon"><svg className="scene-fallback" viewBox="0 0 500 500" aria-hidden="true"><ellipse cx="250" cy="361" rx="180" ry="68" fill="#aebbd4"/><ellipse cx="170" cy="347" rx="29" ry="9" fill="#8e9fbb"/><ellipse cx="336" cy="373" rx="23" ry="7" fill="#8e9fbb"/><circle cx="250" cy="181" r="61" fill="#f1f5ff"/><ellipse cx="250" cy="181" rx="44" ry="39" fill="#243856"/><ellipse cx="235" cy="168" rx="16" ry="7" fill="#a9def0" opacity=".8"/><rect x="207" y="239" width="86" height="98" rx="35" fill="#e7edf8"/><path d="M211 257 Q180 266 182 311 M289 257 Q319 266 318 311" fill="none" stroke="#e7edf8" strokeWidth="28" strokeLinecap="round"/><path d="M224 319 Q190 347 174 340 M276 319 Q310 347 326 340" fill="none" stroke="#e7edf8" strokeWidth="29" strokeLinecap="round"/><rect x="208" y="276" width="84" height="58" rx="5" fill="#739bad"/><circle cx="250" cy="304" r="6" fill="#d5f4fa"/><path d="M195 337 H305" stroke="#e1e9f3" strokeWidth="7" strokeLinecap="round"/><path d="M95 132 l5 12 12 5 -12 5 -5 12 -5 -12 -12 -5 12 -5z M395 224 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z" fill="#b7f3d1"/></svg></div>;
}
