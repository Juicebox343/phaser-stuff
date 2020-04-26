export class StateMachine {
      constructor(initialState, possibleStates, stateArgs=[]) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;
    
        // State instances get access to the state machine via this.stateMachine.
        for (const state of Object.values(this.possibleStates)) {
          state.stateMachine = this;
        }
      }
    
      step() {
        // On the first step, the state is null and we need to initialize the first state.
        if (this.state === null) {
          this.state = this.initialState;
          this.possibleStates[this.state].enter(...this.stateArgs);
        }
    
        // Run the current state's execute
        this.possibleStates[this.state].execute(...this.stateArgs);
      }
    
      transition(newState, ...enterArgs) {
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
      }
    }
    
export class State {
      enter() {
    
      }
    
      execute() {
    
      }
    }

export class IdleState extends State {
        enter(scene, hero) {
          hero.setVelocity(0);
          hero.anims.play(`${hero.direction}-walk`);
          hero.anims.stop();
          if (hero.direction === "left") hero.setTexture('heroAtlas', 'hero-6');
              else if (hero.direction === "right") hero.setTexture('heroAtlas', 'hero-20');
              else if (hero.direction === 'up') hero.setTexture('heroAtlas', 'hero-13');
              else if (hero.direction === 'down') hero.setTexture('heroAtlas', 'hero-27');
        }
      
        execute(scene, hero) {
          const {W, A, S, D, SPACE} = scene.keyboard;      
          // Transition to swing if pressing space
          if (SPACE.isDown) {
            this.stateMachine.transition('hack');
            return;
          }
      
          // Transition to move if pressing a movement key
          if (W.isDown || A.isDown || S.isDown || D.isDown) {
            this.stateMachine.transition('move');
            return;
          }
        }
}
      
export class MoveState extends State {
    execute(scene, hero) {
      const {W, A, S, D, SPACE} = scene.keyboard; 

      // Transition to swing if pressing space
      if (SPACE.isDown) {
        this.stateMachine.transition('hack');
        return;
      }

      // Transition to idle if not pressing movement keys
      if (!(W.isDown || A.isDown || S.isDown || D.isDown)) {
        this.stateMachine.transition('idle');
        return;
      }
      hero.setVelocity(0);
      if (W.isDown) {
        hero.setVelocityY(-hero.speed);
        hero.direction = 'up';
      } else if (S.isDown) {
        hero.setVelocityY(hero.speed);
        hero.direction = 'down';
      }
      if (A.isDown) {
        hero.setVelocityX(-hero.speed);
        hero.direction = 'left';
      } else if (D.isDown) {
        hero.setVelocityX(hero.speed);
        hero.direction = 'right';
      }
      hero.anims.play(`${hero.direction}-walk`, true);
      hero.body.velocity.normalize().scale(hero.speed);
    }
    
  }
      
export class HackState extends State {
  enter(scene, hero) {
    hero.setVelocity(0);
    hero.anims.play(`${hero.direction}-hack`);
    hero.once('animationcomplete', () => {
      this.stateMachine.transition('idle');
    });
  }
}