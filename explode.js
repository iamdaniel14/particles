
class Explode {
    constructor(x,y){
    this.pos=createVector (x,y);
    this.vel =p5.Vector.random2D();
    this.vel.mult(random(1))
    this.acc=createVector (0,0.1);
    this.alpha=255;
    this.r =random (8)
    }
  
  
    show (){
      push ();
      fill (255,random(200),random(200),this.alpha);
      noStroke();
       circle (this.pos.x,this.pos.y,this.r);
      pop();
    }
  
    
    update (){
      this.vel.add (this.acc);
      this.pos.add (this.vel);
      this.acc.set(0,0);
      this.alpha-=0.8;
      
        
      } 
  
      finished (){
      if (this.alpha<0){
        return true;
      }
  
      }
  }