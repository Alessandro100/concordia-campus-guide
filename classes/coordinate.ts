class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setX(inputX: number){
    this.x = inputX;
  }

  setY(inputY: number){
    this.y = inputY;
  }


  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

}

export default Coordinate;
