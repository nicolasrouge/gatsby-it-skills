import React, { useEffect, useState } from 'react'
import { stringToNumber } from '../utils/utils';
import skillsJsonFile from '../data/skills100123.json';
import { SkillItem } from '../interfaces/skillsItem';
import { customTooltipStyle } from '../style/tooltip.style';
import { CartesianGrid, Cell, LabelList, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import '../style/scatterchart.css'

function SkillsTab() {
  const [data, setData] = useState(null as any);

  const excludedSkills = [
    "Security Cleared",
    "SC Cleared",
    "Consultant",
    "Management Information System",
    "Public Sector",
    "Software Engineering",
    "Senior Developer",
    "Product Ownership",
    "Collaborative Working",
    "Social Skills",
    "Developer",
    "Senior",
    "Retail",
    "Inclusion and Diversity",
    "Microsoft 365",
    "Mathematics",
    "QA",
    "Retail",
    "Stakeholder Management",
    "Computer Science",
    "Project Delivery",
    "Banking",
    "Fintech",
    "Migration",
    "Analytical Skills",
    "Self-Motivation",
    "Decision-Making",
    "Change Management", "Validation",
    "Line Management",
    "Business Analyst"

  ];

  const descriptionTop = [
    "Analytics",
    "Risk Management",
    "Power Platform",
    "SaaS",
    "Git",
    "SDLC",
    "Public Cloud",
    "DevOps Engineer",
    "Design Patterns",
    "Serverless",
    "Business Intelligence",
    "Docker",
    "Roadmaps",
    "Devops",
    "AngularJS",
    "User Experience",
    "Customer Experience",
    "Scrum",
    "TypeScript",
    "Microservices",
    "PowerShell",
    "Decision-Making",
    "HTML",
    "Software Testing",
    "Machine Learning",
    "SQL Server",
    "Python",
    "Software Engineer",
    "Jenkins",
    "REST",
    "Project Manager",
    "Information Security",
  ];

  useEffect(
    () => {
      let skills = skillsJsonFile;

      let filteredData = [] as SkillItem[];
      let i = 0;

      skills.forEach(function (item) {
        let filteredItem = {} as SkillItem;
        filteredItem.description = item.description;
        filteredItem.median_salary = stringToNumber(item.median_salary);
        filteredItem.live_jobs = stringToNumber(item.live_jobs);
        //filteredItem.rank = stringToNumber(item.rank);
        filteredItem.id = i;
        let coloredSkill = addColorToSkill(filteredItem);
        if (coloredSkill.median_salary >= 50000 && !excludedSkills.includes(coloredSkill.description)) {
          filteredData.push(coloredSkill);
          i++;
        }
        if (!descriptionTop.includes(coloredSkill.description)) {
          filteredItem.descriptionTop = coloredSkill.description;
        }
        else {
          filteredItem.descriptionBottom = coloredSkill.description;
        }
      });
      const sortedData = filteredData.sort((a, b) => b.live_jobs - a.live_jobs);
      setData(sortedData);
    }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: 0, margin: 0 }}>
      <ScatterChart className="scatter-chart" width={1200} height={570} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="live_jobs" name="Live Jobs" unit="" stroke="lightgray" strokeWidth={0.3} tick={<CustomXAxisTick fontSize="11px" />} />
        <YAxis dataKey="median_salary" name="Median Salary" unit="£" stroke="lightgray" strokeWidth={0.3} domain={[50000, 87000]} fontSize={12} />
        <ZAxis dataKey="description" name="Description" />
        <CartesianGrid stroke="#cccccc" strokeDasharray="0.3 3" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={customTooltipStyle} />
        <Scatter name="My Skills" fill="#acd157" />
        <Scatter name="Future Skills!" fill="#f1be32" />
        <Scatter name="Cybersecurity" fill="#dbb8ff" />
        <Scatter name="Interrested In" fill="#99c9ff" />
        <Scatter name="other Skills" data={data as any[]} fill="#f5f6f7">
          {
            data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={returnColor(entry.color)} />
            ))
          }
          <LabelList dataKey="descriptionTop" dy={10} dx={0} fontSize={11} angle={0} formatter={(description: string) => `${description}`} />
          <LabelList dataKey="descriptionBottom" dy={-10} dx={0} fontSize={11} angle={0} formatter={(description: string) => `${description}`} />

        </Scatter>
        <Legend verticalAlign="top" height={36} />
      </ScatterChart>

    </div>
  )
}

export default function MyApp() {
  return <SkillsTab />
}

export const mySkills = [
  ".NET Developer",
  "JIRA",
  "OO",
  "C#"
  , "React"
  , "TypeScript"
  , "Agile"
  , "Azure DevOps"
  , "Azure"
  , "JavaScript"
  , "Scrum"
  , "Git"
  , "SQL"
  , ".NET"
  , "CSS"
  , "Degree"
  , "Problem-Solving",
  "Microsoft",
  "Full Stack Development",
  "Software Engineer",
  "REST",
  "HTML",
  "Serverless",
  "Design Patterns",
  "Public Cloud",
  ".NET Core",
  "Automotive"
];

export const myFutureSkills = [
  "AWS",
  "Docker",
  "CI/CD",
  "Artificial Intelligence", "NoSQL", "Microservices", "Kubernetes", "Java", "Python", "DevOps",
];
export const cyber = ["Cybersecurity", "Linux", "Firewall", "Security Cleared", "Information Security"];
export const law = ["Law", "Legal"];
export const interrested = ["Spring", "Machine Learning", "Kafka", "Architect", "Terraform", "TDD", "Node.js", "Jenkins", "Python", "Java", "Kubernetes", "DevOps", "AngularJS", "GCP", "Lead", "Roadmaps", "Mentoring", "Microservices"];


const returnColor = (color: string) => {
  console.log(color);
  if (color == "myskills") { return '#acd157'; }
  else if (color == "cybersecurity") { return '#dbb8ff'; }
  else if (color === "myfutureskills") { return '#f1be32'; }
  else if (color == "interrested") { return '#99c9ff' }
  else { return '#f5f6f7'; }

}

function addColorToSkill(sortedSkillsArray: SkillItem) {
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

const CustomXAxisTick = (props: any) => {
  const { x, y, stroke, payload, fontSize } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={11} y={0} dy={18} textAnchor="end" fill="lightgray" transform="rotate(0)" style={{ fontSize }}>{payload.value}</text>
    </g>
  );
};