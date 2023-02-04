import { cyber, interrested, myFutureSkills, mySkills } from "../data/skillsCategories";
import { SkillItem } from "../interfaces/skillsItem";

export const returnColor = (color: string) => {
    // console.log(color);
    if (color == "myskills") { return '#acd157'; }
    else if (color == "cybersecurity") { return '#dbb8ff'; }
    else if (color === "myfutureskills") { return '#f1be32'; }
    else if (color == "interrested") { return '#99c9ff' }
    else { return '#f5f6f7'; }
  
  }
  
export const addColorToSkill = (sortedSkillsArray: SkillItem) => {
    if (mySkills.includes(sortedSkillsArray.description)) {
      sortedSkillsArray.color = "myskills";
    }
    else if (myFutureSkills.includes(sortedSkillsArray.description)) {
      sortedSkillsArray.color = "myfutureskills";
    }
    else if (interrested.includes(sortedSkillsArray.description)) {
      sortedSkillsArray.color = "interrested";
    }
    else if (cyber.includes(sortedSkillsArray.description)) {
      sortedSkillsArray.color = "cybersecurity";
    }
    else {
      sortedSkillsArray.color = "other";
    }
    return sortedSkillsArray;
  }
  