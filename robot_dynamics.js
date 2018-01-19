// Abstract robot class : exposes interface for dynamical updates
// Note that our optimal safety controller can only handle control-affine systems
class Robot extends PIXI.Sprite {
  // Dynamical update function that realizes the difference equation describing the system
  dynamics(delT,u){
    this.states[0] += (0) * delT
    this.states[1] += (0) * delT
    this.states[2] += (0) * delT
  }
  // Control affine function that multiplies the input in the difference equation
  // Realized as a function to include possible state dependence
  controlCoefficient(){
    return(0)
  }
  // Method that translates states from the state vector into the corresponding
  // position for rendering in the JS
  displayState(){
    this.x = this.states[0]
    this.y = this.states[1]
    this.rotation = this.states[2]
  }
  // Constructor initializes PIXI.Sprite members and sets initial state
  constructor(texture){
    // Image
    super(texture)
    this.pivot.x = 50 ; this.pivot.y = 50
    this.width = 100 ; this.height = 100
    // State Vector
    this.states = [0,0,0];
    // Display State
    this.displayState()
  }
  // Method to be called each loop
  update(delT,u){
    this.dynamics(delT,u)
    this.displayState()
  }
}

// Double Integrating simplified Quadrotor
class QuadrotorRobot extends Robot {
  // Dynamical update function that realizes the double integrator Diff. Eq.
  dynamics(delT,u){
    this.states[0] += this.states[1] * delT
    this.states[1] += u[0] * delT
    this.states[2] += this.states[3] * delT
    this.states[3] += u[1] * delT
  }
  // Control affine function that multiplies the input in the difference equation
  controlCoefficient(){
    return([[0,1,0,0],[0,0,0,1]])
  }
  // Method that translates states from the state vector into the corresponding
  // position for rendering in the JS
  displayState(){
    let mappedState = graphics.mapper.mapStateToPosition(this.states[0],this.states[2])
    this.x =  mappedState[0]
    this.y =  mappedState[1]
    //this.rotation = this.states[1]/15.0
    this.rotation = 0
  }
  // Constructor initializes PIXI.Sprite members fitting the quadrotor Texture
  // and sets initial state data
  constructor(initial_state){
    // Image
    super(PIXI.Texture.fromImage("QuadcopterSide.png"))
    this.pivot.x = 100 ; this.pivot.y = 50
    this.width = 100 ; this.height = 50
    // State Vector
    this.states = initial_state;
    // Display State
    this.displayState()
  }
}

// Double Integrating simplified Quadrotor
class VerticalQuadrotorRobot extends Robot {
  // Dynamical update function that realizes the double integrator Diff. Eq.
  dynamics(delT,u){
    this.states[0] += this.states[1] * delT
    this.states[1] += u[0] * delT
  }
  // Control affine function that multiplies the input in the difference equation
  controlCoefficient(){
    return([[0,1]])
  }
  // Method that translates states from the state vector into the corresponding
  // position for rendering in the JS
  displayState(){
    let mappedState = graphics.mapper.mapStateToPosition(0,this.states[0])
    this.x =  mappedState[0]
    this.y =  mappedState[1]
    //this.rotation = this.states[1]/15.0
    this.rotation = 0
  }
  // Constructor initializes PIXI.Sprite members fitting the quadrotor Texture
  // and sets initial state data
  constructor(initial_state){
    // Image
    super(PIXI.Texture.fromImage("QuadcopterSide.png"))
    this.pivot.x = 100 ; this.pivot.y = 50
    this.width = 100 ; this.height = 50
    // State Vector
    this.states = initial_state;
    // Display State
    this.displayState()
  }
}

// Double Integrating simplified Quadrotor
class DubinsRobot extends Robot {
  // Dynamical update function that realizes the double integrator Diff. Eq.
  dynamics(delT,u){
    this.states[0] += this.speed * Math.cos(this.states[2]) * delT
    this.states[1] += this.speed * Math.sin(this.states[2]) * delT
    this.states[2] += (u[0]) * delT
    // Wrap around the angle
    if(this.states[2]>Math.pi){
      this.states[2] -= 2*Math.pi
    }
    if(this.states[2]<-Math.pi){
      this.states[2] += 2*Math.pi
    }
  }
  // Control affine function that multiplies the input in the difference equation
  controlCoefficient(){
    return([[0,0,1]])
  }
  // Method that translates states from the state vector into the corresponding
  // position for rendering in the JS
  displayState(){
    let mappedState = graphics.mapper.mapStateToPosition(this.states[0],this.states[1])
    this.x =  mappedState[0]
    this.y =  mappedState[1]
    this.rotation = this.states[2] + 3.1415/2
  }
  // Constructor initializes PIXI.Sprite members fitting the quadrotor Texture
  // and sets initial state data
  constructor(initial_state){
    // Image
    super(PIXI.Texture.fromImage("DubinsCar.png"))
    this.pivot.x = 60 ; this.pivot.y = 100
    this.width = 60 ; this.height = 100
    // State Vector
    this.states = initial_state.slice(0);
    this.speed = 1
    // Display State
    this.displayState()
  }
}
