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

  setXUsingNodeNumber(inputNodeNumber: number, width: number){
    this.x = inputNodeNumber % width;
  }

  setYUsingNodeNumber(inputNodeNumber: number, width: number){
    this.y = Math.floor(inputNodeNumber/ width);
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  nodeNumberOfCoordinate(width: number){
    return width * this.y + this.x;
  }


}

export default Coordinate;
