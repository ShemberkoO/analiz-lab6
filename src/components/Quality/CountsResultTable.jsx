import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';


export default function CountsResultTable() {
  const { expertMarks, marksAvg, startKef, kefAvg, experts } = useContext(DataContext);

  const criteria = [
    'Точність управління та обчислень',
    'Ступінь стандартності інтерфейсів',
    'Функціональна повнота',
    'Стійкість до помилок',
    'Можливість розширення',
    'Зручність роботи',
    'Простота роботи',
    'Відповідність чинним стандартам',
    'Переносимість між ПЗ',
    'Зручність навчання'
  ];

 
  function sumByColumns(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    console.log(kefAvg)
  
    let columnSums = new Array(cols).fill(0); // Ініціалізуємо масив для зберігання суми добутків по стовпцях
  
    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows; i++) {
        // Знайдемо добуток ij елементів і додамо до відповідного стовпця
        columnSums[j] += matrixA[i][j] * matrixB[i][j];
      }
    }
    return columnSums;
  }
  

  let avg = 0;
  let kefAvgAvg = 0;
  kefAvg.forEach((val,index)=>{
     avg+= kefAvg[index] * marksAvg[index];
     kefAvgAvg += kefAvg[index];
  })

  kefAvgAvg/=10;
  avg/=10;
  const ColSum = sumByColumns(expertMarks,startKef); 
  
//   const columnSums = expertMarks.reduce((sums, expertMark) => {
//     expertMark.forEach((mark, index) => {
//       sums[index] = (sums[index] || 0) + mark; 
//     });
//     return sums;
//   }, new Array(expertMarks[0].length).fill(0));

  const startKefSums = startKef.reduce((sums, criterion) => {
    criterion.forEach((kef, index) => { 
      sums[index] = (sums[index] || 0) + kef;
    });
    return sums;
  }, new Array(startKef[0].length).fill(0));

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Критерії </th>
            <th>Експерт галузі</th>
            <th>Експерт юзабіліті</th>
            <th>Експерт з програмування</th>
            <th>Потенційні користувачі</th>
            <th>Усереднені значення показника</th>
            <th>Усереднені значення оцінок</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>Коефіцієнти вагомості</td>
                {experts.map((val,index)=>(
                    <td>{val.weight/10}</td>
                ))}
            </tr>
            <tr>
                <td>Узагальнені оцінки</td>
                {ColSum.map((val,ind)=>(<td>{(val/startKefSums[ind]).toFixed(2)}</td>))}
                <td>{avg/kefAvgAvg}</td>
                <td>
                {startKef.reduce((acc, val,criterionIndex) => {
                    return acc + val.reduce((sum, value, expertIndex) => {
                        const product = value * expertMarks[criterionIndex][expertIndex] /(kefAvg[criterionIndex])/experts.reduce((acc, val) => acc + val.weight / 10, 0);
                        return sum + product;
                        }, 0)
                    },0)/startKef.length
                    }
                </td>
            </tr>
            <tr>
                <td>Враховуючи вагомість експертів</td>
                {ColSum.map((val, index) => {
                    const result = (val / startKefSums[index]) * experts[index].weight / 10;
                    return <td key={index}>{result.toFixed(2)}</td>;
                })}
                <td>
                    {(ColSum.map((val, index) => {
                    return (val / startKefSums[index]) * experts[index].weight / 10;
                    }).reduce((acc, val) => acc + val, 0) / ColSum.length).toFixed(2)}
                </td>
                <td>
                    {ColSum.map((val, index) => {
                    return (val / startKefSums[index]) * experts[index].weight / 10;
                    }).reduce((acc, val) => acc + val, 0)/experts.reduce((acc, val) => acc + val.weight / 10, 0)}
                </td>
            </tr>

        {startKef.map((criterion, criterionIndex) => (
            <tr key={criterionIndex}>
              <td>{criteria[criterionIndex]}</td>
              {criterion.map((value, expertIndex) => (
                <td key={expertIndex}>
                  <a>{value*expertMarks[criterionIndex][expertIndex]}</a>
                </td>
              ))}
              <td>{kefAvg[criterionIndex] * marksAvg[criterionIndex]}</td>
              <td>{criterion.reduce((sum, value, expertIndex) => {
                const product = value * expertMarks[criterionIndex][expertIndex] /(kefAvg[criterionIndex])/experts.reduce((acc, val) => acc + val.weight / 10, 0);
                return sum + product;
                }, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
