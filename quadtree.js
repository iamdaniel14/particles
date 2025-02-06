
class Point{
    constructor(x,y,userData){
        this.x=x;
        this.y=y;
        this.userData=userData
    }
}


class Boundary{
    constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.w=w
    this.h=h;
    }

    contains (point) {
 if (point.x >= this.x-this.w && 
    point.x <this.x+this.w&&
     point.y>=this.y-this.h&&
     point.y<=this.y+this.h) {
    return true;
 } else {
    return false;
 }


    }

  
    intersects (range){
      // if they are not intersecting returning this
     return !(range.x -range.w >this.x +this.w || 
              range.x+range.w<this.x -this.w||
              range.y  -range.h>this.y +this.h ||
             range.y+range.h<this.y-this.h )
         
    }

}



class CircleBoundary  {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.rSquared = this.r * this.r;
    }
  
    contains(point) {
      // check if the point is in the circle by checking if the euclidean distance of
      // the point and the center of the circle if smaller or equal to the radius of
      // the circle
      let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
      return d <= this.rSquared;
    }
  
    intersects(range) {
  
     let  xDist = Math.abs(range.x - this.x);
     let yDist = Math.abs(range.y - this.y);
  
      // radius of the circle
      let r = this.r;
      let w = range.w;
      let h = range.h;
  
      let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
  
      // no intersection
      if (xDist > (r + w) || yDist > (r + h))
        return false;
  
      // intersection within the circle
      if (xDist <= w || yDist <= h)
        return true;
  
      // intersection on the edge of the circle
      return edges <= this.rSquared;
    }

}

class QuadTree{
    constructor(boundary,capacity){
    this.boundary=boundary;
    this.capacity=capacity;
    this.points=[];
    this.divided=false;
    }


    insert (point){
         //if the boundary does not contains a point(s) should return false
    if (!this.boundary.contains (point)) {
      return false;
    }

    

    //if the number of points is less than the capacity 
    if (this.points.length<this.capacity) {
        this.points.push(point);

    } else {

        // if the number of particles is greater than the capacity and is not divided the boundary should be subdivided
    if (!this.divided) {
        this.subdivide();
      }  

      if (this.northEast.insert(point)) {
        return true;
      } else if (this.northWest.insert(point)) {
        return true;
      } else if (this.southEast.insert (point)) {
         return true;
      } else if (this.southWest.insert (point)) {
        return true;
      }

    }

    return false;

    }

    subdivide (){

        let x =this.boundary.x;
        let y=this.boundary.y;
        let w=this.boundary.w;
        let h=this.boundary.h;


     let northEastBoundary =new Boundary (x+(w*0.5),y-(h*0.5),(w*0.5),(h*0.5));
     this.northEast=new QuadTree (northEastBoundary,this.capacity);

     let northWestBoundary =new Boundary (x-(w*0.5),y-(h*0.5),(w*0.5),(h*0.5));
     this.northWest=new QuadTree (northWestBoundary,this.capacity);
     let southEastBoundary =new Boundary (x+(w*0.5),y+(h*0.5),(w*0.5),(h*0.5));
     this.southEast=new QuadTree (southEastBoundary,this.capacity);

     let southWestBoundary =new Boundary (x-(w*0.5),y+(h*0.5),(w*0.5),(h*0.5));
     this.southWest=new QuadTree (southWestBoundary,this.capacity);

    //once we have subdivided
    this.divided=true;




    }

    query (range,found){


      //if there is no point(s) found
        if (!found) {
          found=[];

        }

        if (!this.boundary.intersects(range)) {
            // return an empty Array;
            return ;

        } else {
            //loop through all the points if it intersect and push them through a found array
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }

            }


                
      if(this.divided) {
        this.northEast.query (range,found);
        this.northWest.query (range,found);
        this.southEast.query(range,found);
        this.southWest.query (range,found);
      }
        }
        return found;


    }


    
    show (){
        noFill();
        stroke(255,0,0);
        rectMode (CENTER);
        rect (this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2);
        for (let p of this.points){
          noStroke()
          fill (255,0,0);
        circle (p.x,p.y,5);
        }



      if(this.divided) {
        this.northEast.show ();
        this.northWest.show ();
        this.southEast.show();
        this.southWest.show ();
      }
  
       }

}