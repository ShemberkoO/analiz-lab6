import React, { useContext } from 'react';
import { DataContext } from "../../../contexts/DataContext";
import RadarChart from '../RadarChart';
import SCounter from '../SCounter';

const ProgramingDiagramPage = () => {
    const { expertMarks, startKef, experts } = useContext(DataContext);

    // Дані для діаграми
    let weight = experts[2].weight;
    let marks = expertMarks.map((val) => val[2]);
    let kef = startKef.map((val) => val[2]);
    let marksSum = marks.reduce((acc, val) => acc + val, 0);
    let circleParticle = marks.map((val)=>{return (val/marksSum)*360});
    let temp = [0,0-circleParticle[0]/2];
    for(let i =0; i< circleParticle.length; i++){
        temp.push(temp[temp.length-1]+circleParticle[i]);
    }
    const temp2 = temp.slice(1)
    let angles = [];
    for (let i = 1; i < temp2.length; i++) {
        let angle = ((temp2[i] + temp2[i - 1]) / 2);
        if (!isNaN(angle)) {
            angles.push(angle);
        }
    }

    const radii = marks.map((val,index)=>{ return val*kef[index]*weight/10 });
  console.log( angles, radii)
  const chartWidth = 1000;
  const chartHeight = 1000;
  const maxRadius = 200;


  let s =  SCounter(angles,radii);
  let c_s = Math.PI *10000;
  console.log(s)


  return (
    <div>
      <h1>Діаграма для експертів програмування</h1>
       <div className='row d-flex justify-content-center'>
        <div className='d-flex justify-content-between col-md-8'>
          <h3>Sf = {s}</h3>
          <h3>Sc = {c_s}</h3>
          <h3>H = {weight/10}</h3>
          <h3>Z = {s/c_s}</h3>
        </div>
       </div>
       <RadarChart
        angles={angles}
        radii={radii}
        width={chartWidth}
        height={chartHeight}
        maxRadius={maxRadius}
        weight={weight/10}
      />
    </div>
  );
};

export default ProgramingDiagramPage;