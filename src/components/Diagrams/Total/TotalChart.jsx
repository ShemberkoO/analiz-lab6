import React, { useRef, useEffect, useContext } from 'react';
import { DataContext } from "../../../contexts/DataContext";

const calculateAnglesAndRadii = (marks, kef, weight) => {
   
    let marksSum = marks.reduce((acc, val) => acc + val, 0);
    let circleParticle = marks.map((val) => (val / marksSum) * 360);
    
    let temp = [0, 0 - circleParticle[0] / 2];
    for (let i = 0; i < circleParticle.length; i++) {
        temp.push(temp[temp.length - 1] + circleParticle[i]);
    }
    const temp2 = temp.slice(1);
    
    let angles = [];
    for (let i = 1; i < temp2.length; i++) {
        let angle = (temp2[i] + temp2[i - 1]) / 2;
        if (!isNaN(angle)) {
            angles.push(angle);
        }
    }
    
    const radii = marks.map((val, index) => val * kef[index]*weight/10);
    
    return [ angles, radii ];
};
const TotalChart = () => {
  const canvasRef = useRef(null);

  const { expertMarks, startKef, experts} = useContext(DataContext);

  console.log(expertMarks,startKef)
    let anglesArray = [];
    let radiiArray = [];
    const width = 1000;
    const height = 1000;
    const maxRadius = 100;

    for(let i=0; i<4;i++){
        let res = calculateAnglesAndRadii(expertMarks.map((val) => val[i]),startKef.map((val) => val[i]),experts[i].weight);
        anglesArray.push(res[0]);
        radiiArray.push(res[1]);
        console.log(res)
    }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = width / 2;
    const centerY = height / 2;

    const scaleFactor = 4;
    const scaledMaxRadius = maxRadius * scaleFactor;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.strokeStyle = '#CCCCCC'; 
    for (let r = 20; r <= scaledMaxRadius; r += 20) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
      ctx.stroke();
    }

    ctx.strokeStyle = '#AAAAAA'; 
    const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'];
    const fillColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'];
    
    radiiArray.forEach((radii, index) => {
      ctx.strokeStyle = colors[index % colors.length];
      ctx.fillStyle = fillColors[index % fillColors.length];
      ctx.lineWidth = 2;

    
      const anglesInRadians = anglesArray[index].map((deg) => (360 - deg) * (Math.PI / 180));

      ctx.beginPath();
      for (let i = 0; i < anglesInRadians.length; i++) {
        const scaledRadius = radii[i] * scaleFactor;
        const x = centerX + scaledRadius * Math.cos(anglesInRadians[i]);
        const y = centerY + scaledRadius * Math.sin(anglesInRadians[i]);

        if (i === 0) {
          ctx.moveTo(x, y); 
        } else {
          ctx.lineTo(x, y); 
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();


    // Малюємо червоні вектори з стрілками
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
      ctx.lineWidth = 1;
      ctx.setLineDash([]); // Вимикаємо пунктир
      anglesInRadians.forEach((angle, i) => {
      const vectorLength = (radii[i] / (experts[index].weight/10)) * scaleFactor;
      const x = centerX + vectorLength * Math.cos(angle);
      const y = centerY + vectorLength * Math.sin(angle);

      // Лінія вектора
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Стрілка на кінці вектора
      const arrowSize = 15;
      const arrowAngle = 30 * (Math.PI / 180); // кут 30 градусів для стрілки
      const arrowX1 = x - arrowSize * Math.cos(angle - arrowAngle);
      const arrowY1 = y - arrowSize * Math.sin(angle - arrowAngle);
      const arrowX2 = x - arrowSize * Math.cos(angle + arrowAngle);
      const arrowY2 = y - arrowSize * Math.sin(angle + arrowAngle);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(arrowX1, arrowY1);
      ctx.lineTo(arrowX2, arrowY2);
      ctx.closePath();
      ctx.fill();
    });

    // З'єднання кінців векторів пунктирною лінією
    ctx.setLineDash([5, 5]); // Увімкнути пунктир тільки для з'єднання вершин
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    anglesInRadians.forEach((angle, i) => {
      const vectorLength = (radii[i] / (experts[index].weight/10)) * scaleFactor;
      const x = centerX + vectorLength * Math.cos(angle);
      const y = centerY + vectorLength * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.stroke();

    // Вимикаємо пунктир після завершення з'єднання вершин
    ctx.setLineDash([]);

    });

    // Додаємо підписи кутів
    // ctx.fillStyle = 'black';
    // ctx.font = '12px Arial';
    // anglesArray.flat().forEach((angle) => {
    //   const adjustedAngle = 360 - angle;
    //   const angleInRadians = (adjustedAngle * Math.PI) / 180;
    //   const x = centerX + (scaledMaxRadius + 20) * Math.cos(angleInRadians);
    //   const y = centerY + (scaledMaxRadius + 20) * Math.sin(angleInRadians);
    //   ctx.fillText(`${angle.toFixed(2)}°`, x - 15, y);
    // });
  }, [anglesArray, radiiArray, width, height, maxRadius]);

  return (
    <div>
      <h1>Узагальнена діаграма</h1>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
};

export default TotalChart;
