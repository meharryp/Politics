/*
Playing with Modulo, 5 mod 2 would equal 1, the modulo equals the remainder or a division. 
*/
//Variable Defining
int x1 = 0;//Starting x position 400
int x2 = 0;//Starting y position 300
int n1 = 0;
int n2 = 0;
int y1 = 0;
int y2 = 0;
int p = 0;

void setup(){
  size(800, 600);//640, 260
  smooth();

}

void draw(){
//
//  print(millis()%4);
//  print(" ");
//
  y1 = millis()%3;  
  if( y1 == 2){
    n1 = +10;//10
  }
  if (y1 ==  1){
    n1 = -10;//10
  }
//  
  y2 = round(random(3));
//  print("y2 = "+y2 + " ");
//
  if(y2 == 2){
    n2 = +10;//10
  }
  if (y2 ==  1){
    n2 = -10;//10
  }
//
  x1 = x1 += n1;//Adding the movement to the old position makes for movement as apose to hopping about the screen.
  x2 = x2 + n2;
  
//STOP DOT GOING OFF SCREEN
if(x1 < 0){x1 = 0;}
if(x2 < 0){x2 = 0;}
if(x1 > 800 ){x1 = 800;}
if(x2 > 600 ){x2 = 600;}

  noStroke();
  fill(random(256),random(256),random(256));//Full colour
  //fill(random(256));//Greyscale
  //if(round(random(3)) == 1){rect(x1,x2,10,10);}else{ellipse(x1,x2,10,10);}
  rect(x1,x2,10,10);
  //ellipse(x1,x2,10,10);
  //rect(x1,x2,10,10);
}

