import React, { useEffect, useState } from 'react'
import { stringToNumber } from '../utils/utils';
import skillsJsonFile from '../data/skills100123.json';
import skills0223 from '../data/skills0223.json';
import { SkillItem } from '../interfaces/skillsItem';
import { customTooltipStyle } from '../style/tooltip.style';
import { CartesianGrid, Cell, LabelList, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import '../style/scatterchart.css'
import excludedSkills from '../data/excludedSkills.json';
import skillsWithDescriptionOnTop from '../data/skillsWithDescriptionOnTop.json';
import skillsWithDescriptionOnTop02 from '../data/skillsWithDescriptionOnTop02.json';
import { addColorToSkill, returnColor } from './colorFunctions';
import { CustomXAxisTick, CustomYAxisTick } from './customChartComponents';

function SkillsChart() {
  const [data, setData] = useState(null as any);
  const [selectedDate, setSelectedDate] = useState("Feb23");

  useEffect(
    () => {
      console.log("selectedDate: ", selectedDate);
      if (selectedDate === "Jan23") loadData(skillsJsonFile, skillsWithDescriptionOnTop);
      if (selectedDate === "Feb23") loadData(skills0223, skillsWithDescriptionOnTop02);
      if (selectedDate === "clear") setData([]);
    }, [selectedDate]);

  useEffect(
    () => {
      console.log("data", data);
    }, [selectedDate]);

    const rename = (name: string) => {
      if(name === "Continuous Improvement") return "CI";
      if(name === "Business Intelligence") return "BI";
      else return name;
    }

  const loadData = (skillsFromJson: any, descriptionOnTop: any) => {
    let skills = skillsFromJson;
    let filteredData = [] as SkillItem[];
    let i = 0;
    skills.forEach(function (item) {
      let filteredItem = {} as SkillItem;
      filteredItem.description = rename(item.description);
      filteredItem.median_salary = stringToNumber(item.median_salary);
      filteredItem.live_jobs = stringToNumber(item.live_jobs);
      //filteredItem.rank = stringToNumber(item.rank);
      filteredItem.id = i;
      let coloredSkill = addColorToSkill(filteredItem);
      if (coloredSkill.median_salary >= 50000 && !excludedSkills.includes(coloredSkill.description)) {
        filteredData.push(coloredSkill);
        i++;
      }
      if (!descriptionOnTop.includes(coloredSkill.description)) {
        filteredItem.descriptionTop = coloredSkill.description;
      }
      else {
        filteredItem.descriptionBottom = coloredSkill.description;
      }
    });
    const sortedData = filteredData.sort((a, b) => b.live_jobs - a.live_jobs);
    setData(sortedData);
  };

  return (
    <div style={{ height: '100%' }}>

      <button style={{ cursor: "pointer" }} onClick={() => { setSelectedDate("Feb23") }}>Feb 23</button>
      <button style={{ cursor: "pointer" }} onClick={() => { setSelectedDate("Jan23") }}>Jan 23</button>
      <button style={{ cursor: "pointer" }} onClick={() => { setSelectedDate("clear") }}>Clear</button>


      <ScatterChart
        className="scatter-chart"
        width={800}
        height={570}
        margin={{ top: 0, right: 0, bottom: 0, left: -40 }}
        
        >

        <XAxis
          dataKey="live_jobs"
          name="Live Jobs"
          unit=""
          stroke="lightgray"
          strokeWidth={0.3}
          tick={<CustomXAxisTick fontSize="11px" />}
        />
        <YAxis
          dataKey="median_salary"
          name="Median Salary"
          unit="£"
          stroke="lightgray"
          strokeWidth={0.3}
          domain={[50000, 87000]}
          // fontSize={12} 
          tick={<CustomYAxisTick fontSize="11px" />}
        />
        <ZAxis
          dataKey="description"
          name="Description" />

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
  return <SkillsChart />
}