
class Particle {
    constructor(){
      this.siz=10;
      this.pos=createVector (random (width),random (height));
      this.vel =p5.Vector.random2D();
    //   this.vel.mult (0.1);
      this.acc=createVector (0,0.1);
        
      }
      
      show (){
        push ()
        noStroke();
        fill (255);
      circle (this.pos.x,this.pos.y,this.siz*2);
        pop ()
    
      }
      
      update (){
      this.vel.add (this.acc);
      this.pos.add (this.vel);
      this.acc.set(0,0)
        
      } 
      
      edges (){
        if (this.pos.y >height-this.siz   || this.pos.y<this.siz) {
          this.vel.y *=-1;
        } else if (this.pos.x>width-this.siz || this.pos.x<this.siz) {
        this.vel.x *=-1;
          
        }
        
      }
      
      collide (other){
        let xdist =other.pos.x-this.pos.x;
        let ydist =other.pos.y-this.pos.y;
        let d = sqrt (xdist*xdist+ydist*ydist);
        
        if (d<this.siz) {
          return true;
        }
        
        
        
      }
      
      
    }