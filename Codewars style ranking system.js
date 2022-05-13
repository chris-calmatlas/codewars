/* Write a class called User that is used to calculate the amount that a user will progress through a ranking system similar to the one Codewars uses.

Business Rules:
A user starts at rank -8 and can progress all the way to 8.
There is no 0 (zero) rank. The next rank after -1 is 1.
Users will complete activities. These activities also have ranks.
Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
The progress earned from the completed activity is relative to what the user's current rank is compared to the rank of the activity
A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the next level
Any remaining progress earned while in the previous rank will be applied towards the next rank's progress (we don't throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8 there is no more progression).
A user cannot progress beyond rank 8.
The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
The progress is scored like so:

Completing an activity that is ranked the same as that of the user's will be worth 3 points
Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.
Logic Examples:
If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in the user being upgraded to rank -7 and having earned 60 progress towards their next rank
If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero rank is ignored)
Code Usage Examples:
var user = new User()
user.rank // => -8
user.progress // => 0
user.incProgress(-7)
user.progress // => 10
user.incProgress(-5) // will add 90 progress
user.progress # => 0 // progress is now zero
user.rank # => -7 // rank was upgraded to -7
Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math based solution that gives consistent results no matter what order a set of ranked activities are completed at. */

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
  
  rankUp(points){
    if(this.rank == 8) return
    
    //each time the progress reaches 100 the user's rank is upgraded to the next level
    //we don't throw any progress away
    points = this.progress + points
    while(points > 99 && this.rank < 8){
      //Skip 0
      this.rank = this.rank == -1 ? 1 : this.rank + 1
      points = points - 100
    }
    
    if(this.rank == 8){
      this.progress = 0
    } else {
      this.progress = points
    }
  }
  
  reset() {
    this.rank = -8
    this.progress = 0
  }
  
  incProgress(activityRank){
    console.log(`Passed ${activityRank} and starting with`, this)
    if(activityRank > 8 || activityRank < -8 || activityRank == 0) throw new Error("Activity rank out of bounds")
    //A user cannot progress beyond rank 8
    if(this.rank == 8) return
    
    let d
    //Get the difference and reduce it by one if we cross 0
    if(activityRank * this.rank < 0){
      //When activityRank is positive then it's bigger so d should be positive to provide more points
      //Since d values less than -1 provide no points, we're really only concerned with activityRank = -1 and this.rank = 1
      //d value needs to be -1 in this case to get the 1 point. In any case, when activityRank is negative and this.rank is 
      //positive, we add 1 to correct the difference, otherwise, we subtract 1 to compensate for a lack of 0 rank.
      d = activityRank > this.rank ? activityRank - this.rank - 1 : activityRank - this.rank + 1
    } else {
      //no compensation needed if we don't cross 0 in our diff. 
      d = activityRank - this.rank
    }
    
    //Set the number of points based on the diff 
    let points
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
    
    this.rankUp(points)
    console.log(`passed ${activityRank} got`, this)
  }  
}