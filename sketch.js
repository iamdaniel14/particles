let particles=[];
let quadTree
let boundary; 
let capacity=2; // number of particles in a branch
let explodeParticles =[];
let numberOfParticles;
let colors = ['#9d686b' ,'#3d4355' ,'#c18512' ,'#c68413','#d2be68','#a53e2c' ,'#41556d','#cf9f6d','#661f24','#73343c','#aa926e',
  '#e4a77b','#a8585b','#b0865c','#cf4145','#3d4349','#d9be70','#1c1734','#48030d' ,'#884f51','#a98214','#98676b','#d08913','#936d1b' ,'#64545f' ,'#64545f','#1b263b','#1b263b' ,'#bf504b' ,'#bd9f7a' ,'#26242f' ,'#b09d7c','#928e67','#a35120','#41495c'];


  let ages =[14,40,30,20];


  function checkIndex (){





  //   let index= ages.filter (age=>age>20);
  //  if (index !==-1) {
  //   console.log(index)

  //  }

   

  }


function setup() {
createCanvas(windowWidth, windowHeight);
  numberOfParticles=int(width /30);
  for (let i=0; i<numberOfParticles; i++){

   col=random (colors);
   particles[i]=new Particle (random (width),random(height),color(col)) ;
  }


  
 
}

function draw() {
  background(0);
  boundary= new Boundary (width*0.5,height*0.5,width,height); // size of the boundary
  quadTree=new QuadTree (boundary,capacity); //recreating the quad tree each frame because the particles are moving
    for (let j=particles.length-1; j>0; j--) {
    let  p =new Point (particles[j].pos.x,particles[j].pos.y,particles[j]);
    quadTree.insert(p); //inserting the points position (particles  as point )
    }


    

  for (let j=particles.length-1; j>0; j--) {
  let range =new CircleBoundary (particles[j].pos.x,particles[j].pos.y,particles[j].siz*2);
   let points= quadTree.query (range) ;
      for (let point of points) {
      let other=point.userData;
     if (particles[j]!==other&&particles[j].collide(other)) {
     let removedParticle=particles.splice (j,1); //removing the particles that has collided 


     let otherIndex=particles.findIndex (particle=>particle===other);  //finding the other index


     if (otherIndex !==-1) {
      particles.splice (otherIndex,1); //removing the particles that has collided
     }
     //pushing a two new particles
      for (let b=0; b<2; b++) { 
        col=random (colors);
        particles.push (new Particle(random (width),random(height),color(col)))
    }
      j--;
     let removedParticleX=removedParticle[0].pos.x; 
     let removedParticleY=removedParticle[0].pos.y;

     for (let e=0; e<50; e++) { 
     explodeParticles.push(new Explode( removedParticleX,removedParticleY)) ;//pushing explode particle when particless collide
    }

    break;
     }
      }

particles[j].update ();
particles[j].show ();
particles[j].edges ();

}


  for (let explode of explodeParticles) { 
    explode.show ();
    explode.update();

  }

  for (let e=explodeParticles.length-1;e>0 ; e--){
    if (explodeParticles[e].finished()) {
    explodeParticles.splice (e,1)
    }
  }

// quadTree.show ();  //showing the quad tree
    }
    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
      setup();
    }
    checkIndex();

