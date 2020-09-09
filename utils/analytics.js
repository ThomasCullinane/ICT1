const assessmentStore = require("../models/assessment-store");

const analytics = {
  getBMI(user,assessments) {
    try{
      const weight = assessments[0].weight
      const bmi = Math.round(((weight/(user.height*user.height))* 100) / 100)
      return bmi;      
    }
    catch{
      const bmi = Math.round(((user.weight/(user.height*user.height))* 100) / 100)
      return bmi;      
    }
  },
  
  getTrend(user,newAssessment,assessments) {
    var weight = newAssessment.weight;
    var previousweight
    try{
      previousweight = assessments[0].weight    
    }
    catch{
      previousweight = user.weight    
    }
    var weightIncrease = false;
    if(weight>previousweight) {
      weightIncrease = true;
    }
    return weightIncrease;
  },
  
  isIdealBodyWeight(user,assessments) {
    var weight
    try{
      weight = assessments[0].weight    
    }
    catch{
      weight = user.weight    
    }
    
    const height = user.height*39.37;
    
    var male =false;
    if(user.gender==='m') {
       male = true;
      }  
    
    var idealBodyWeight;
    
    if (male && height/12 <= 5)
    {
      idealBodyWeight = 50;
    }
    else if (height/12 <= 5)
    {
      idealBodyWeight = 45.5;
    }
    else if (male)
    {
      idealBodyWeight = ( ( (height-(5*12)) * 2.3) + 50 );
    }
    else
    {
      idealBodyWeight = ( ( (height-(5*12)) * 2.3) + 45.5 );
    }
    
    if (Math.abs(idealBodyWeight-weight)>0.2) {
      return false
    }
    else {
      return true
    }
    
  },
  
  getBMICategory(bmiValue) {
    if(bmiValue<16.0)
    {
      return "SEVERELY UNDERWEIGHT";
    }
    else if (bmiValue<18.5)
    {
      return "UNDERWEIGHT";
    }
    else if (bmiValue<25.0)
    {
      return "NORMAL";
    }
    else if (bmiValue<30.0)
    {
      return "OVERWEIGHT";
    }
    else if (bmiValue<35.0)
    {
      return "MODERATELY OBESE";
    }
    else if (bmiValue>=35.0)
    {
      return "SEVERELY OBESE";
    }
  }
}

module.exports = analytics;
