// TODO: create the User class/object
// it must support rank, progress and the incProgress(rank) method

class User {
  constructor(){
    this._rank = -8
    this._progress = 0
  }
  
  get rank(){
    return this._rank
  }

  set rank(newRank){
    if(newRank > 8 || newRank < -8 || newRank == 0){
      throw new Error("Out of bounds rank")
    } else {
      this._rank = newRank
    }
  }
  
  get progress(){
    return this._progress
  }
  set progress(newProgress){
    if(newProgress > 99){
      throw new Error("Too much progress")
    } else {
      this._progress = newProgress
    }
  }
  
  rankUp(){
    //Skip 0
    this.rank = this.rank == -1 ? 1 : this.rank++
  }
  
  incProgress(activityRank){
    //A user cannot progress beyond rank 8
    if(this.rank == 8) return
    
    let d = activityRank - this.rank
    let points
    
    //Adjust d because there is no 0. This isn't scalable and should probably be changed
    if(activityRank > 0 && this.rank < 0) d - 1
    if(activityRank == -1 && this.rank == 1) d = 1
      
    if(d == 0){
      //Completing an activity that is ranked the same as that of the user's will be worth 3 points
      points = 3
    } else if(d == -1){
      //Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
      points = 1
    } else if(d < -1){
      //Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
      return
    } else {
      //Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.
      points = 10 * d * d
    }
    
    //each time the progress reaches 100 the user's rank is upgraded to the next level
    //we don't throw any progress away
    points = this.progress + points
    while(points > 99){
      this.rankUp()
      points = points - 100
    }
    
    this.progress = points
    return(`Progress: ${this.progress}, Rank: ${this.rank}`)
  }  
}

// Since Node 10, we're using Mocha.
// You can use `chai` for assertions.
const chai = require("chai");
const assert = chai.assert;
// Uncomment the following line to disable truncating failure messages for deep equals, do:
// chai.config.truncateThreshold = 0;
// Since Node 12, we no longer include assertions from our deprecated custom test framework by default.
// Uncomment the following to use the old assertions:
// const Test = require("@codewars/test-compat");

describe("Solution", function() {
  it("should test for something", function() {
    var user = new User()
    console.log(user.rank) // => -8
    console.log(user.progress) // => 0
    console.log(user.incProgress(-7))
    console.log(user.progress) // => 10
    console.log(user.incProgress(-5)) // will add 90 progress
  });
});