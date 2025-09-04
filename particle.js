const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];

function random(min,max){return Math.random()*(max-min)+min;}

function createParticle(x,y,color){
  particles.push({x,y,radius:random(2,6),dx:random(-2,2),dy:random(-4,-1),alpha:1,color});
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    ctx.globalAlpha=p.alpha;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle=p.color;
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy; p.alpha-=0.02;
    if(p.alpha<=0) particles.splice(i,1);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

function explode(x,y,color,count=30){
  for(let i=0;i<count;i++) createParticle(x,y,color);
}
