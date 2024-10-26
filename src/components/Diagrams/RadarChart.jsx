// import React, { useRef, useEffect } from 'react';

// const RadarChart = ({ angles, radii, width, height, maxRadius, weight }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const centerX = width / 2;
//     const centerY = height / 2;
    
//     // Збільшити масштаб у два рази
//     const scaleFactor = 4;
//     const scaledMaxRadius = 100 * scaleFactor;

//     // Очистити полотно
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Малюємо сітку (концентричні кола) з кроком 10
//     ctx.strokeStyle = '#CCCCCC'; // сірий колір для сітки
//     for (let r = 10 * scaleFactor; r <= scaledMaxRadius; r += (10* scaleFactor)) {
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
//       ctx.stroke();
//     }

//     // Малюємо напрямки під кожен кут
//     ctx.strokeStyle = '#AAAAAA'; // лінії для кутів
//     angles.forEach((angle) => {
//       // Відняти кут від 360 для обертання проти годинникової стрілки
//       const adjustedAngle = 360 - angle;
//       const angleInRadians = (adjustedAngle * Math.PI) / 180;
//       const x = centerX + scaledMaxRadius * Math.cos(angleInRadians);
//       const y = centerY + scaledMaxRadius * Math.sin(angleInRadians);
//       ctx.beginPath();
//       ctx.moveTo(centerX, centerY);
//       ctx.lineTo(x, y);
//       ctx.stroke();
//     });

//     // Налаштування стилю для полігону
//     ctx.strokeStyle = 'rgba(255, 99, 132, 1)';
//     ctx.fillStyle = 'rgba(255, 206, 86, 0.2)';
//     ctx.lineWidth = 2;

//     // Переводимо кути з градусів у радіани і змінюємо їх напрямок
//     const anglesInRadians = angles.map((deg) => (360 - deg) * (Math.PI / 180));

//     // Малюємо полігон (радар)
//     ctx.beginPath();
//     for (let i = 0; i < anglesInRadians.length; i++) {
//       const scaledRadius = radii[i] * scaleFactor;
//       const x = centerX + scaledRadius * Math.cos(anglesInRadians[i]);
//       const y = centerY + scaledRadius * Math.sin(anglesInRadians[i]);

//       if (i === 0) {
//         ctx.moveTo(x, y); // Починаємо з першої точки
//       } else {
//         ctx.lineTo(x, y); // Продовжуємо малювати лінії
//       }
//     }
//     ctx.closePath();
//     ctx.stroke();
//     ctx.fill();

//     // Додаємо підписи кутів
//     ctx.fillStyle = 'black';
//     ctx.font = '12px Arial';
//     for (let i = 0; i < angles.length; i++) {
//       const angle = angles[i];
//       const adjustedAngle = 360 - angle;
//       const angleInRadians = (adjustedAngle * Math.PI) / 180;
//       const x = centerX + (scaledMaxRadius + 20) * Math.cos(angleInRadians);
//       const y = centerY + (scaledMaxRadius + 20) * Math.sin(angleInRadians);
//       ctx.fillText(`${angle.toFixed(2)}°`, x - 15, y);
//     }
//   }, [angles, radii, width, height, maxRadius]);

//   return (
//     <canvas ref={canvasRef} width={width} height={height}></canvas>
//   );
// };

// export default RadarChart;


import React, { useRef, useEffect } from 'react';

const RadarChart = ({ angles, radii, width, height, maxRadius, weight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Збільшити масштаб у два рази
    const scaleFactor = 4;
    const scaledMaxRadius = 100 * scaleFactor;

    // Очистити полотно
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Малюємо сітку (концентричні кола) з кроком 10
    ctx.strokeStyle = '#CCCCCC'; // сірий колір для сітки
    ctx.setLineDash([]); // Вимикаємо пунктир
    for (let r = 10 * scaleFactor; r <= scaledMaxRadius; r += 10 * scaleFactor) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Малюємо напрямки під кожен кут
    ctx.strokeStyle = '#AAAAAA'; // лінії для кутів
    angles.forEach((angle) => {
      const adjustedAngle = 360 - angle;
      const angleInRadians = (adjustedAngle * Math.PI) / 180;
      const x = centerX + scaledMaxRadius * Math.cos(angleInRadians);
      const y = centerY + scaledMaxRadius * Math.sin(angleInRadians);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Налаштування стилю для полігону
    ctx.strokeStyle = 'rgba(255, 99, 132, 1)';
    ctx.fillStyle = 'rgba(255, 206, 86, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([]); // Вимикаємо пунктир

    // Переводимо кути з градусів у радіани і змінюємо їх напрямок
    const anglesInRadians = angles.map((deg) => (360 - deg) * (Math.PI / 180));

    // Малюємо полігон (радар)
    ctx.beginPath();
    ctx.strokeStyle = 'black';
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
      const vectorLength = (radii[i] / weight) * scaleFactor;
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
      const vectorLength = (radii[i] / weight) * scaleFactor;
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

    // Додаємо підписи кутів
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    for (let i = 0; i < angles.length; i++) {
      const angle = angles[i];
      const adjustedAngle = 360 - angle;
      const angleInRadians = (adjustedAngle * Math.PI) / 180;
      const x = centerX + (scaledMaxRadius + 20) * Math.cos(angleInRadians);
      const y = centerY + (scaledMaxRadius + 20) * Math.sin(angleInRadians);
      ctx.fillText(`${angle.toFixed(2)}°`, x - 15, y);
    }
  }, [angles, radii, width, height, maxRadius, weight]);

  return (
    <canvas ref={canvasRef} width={width} height={height}></canvas>
  );
};

export default RadarChart;
