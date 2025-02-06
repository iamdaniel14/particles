let particles=[];
let quadTree
let boundary; 
let capacity=2; // number of particles in a branch
let explodeParticles =[];
let numberOfParticles=100;

function setup() {
createCanvas(windowWidth, windowHeight);
for (let e=0; e<1; e++){
explodeParticles.push(new Explode  ()) ;
  }
  
  for (let i=0; i<numberOfParticles; i++){
   particles[i]=new Particle () ;
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


     if (otherIndex !==1) {
      particles.splice (otherIndex,1); //removing the particles that has collided


     }
      for (let b=0; b<2; b++) { 
     particles.push (new Particle(random (width),random(height)))
    }
      j--;
     let removedParticleX=removedParticle[0].pos.x; 
     let removedParticleY=removedParticle[0].pos.y;

     for (let e=0; e<5; e++) { 
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
    }

