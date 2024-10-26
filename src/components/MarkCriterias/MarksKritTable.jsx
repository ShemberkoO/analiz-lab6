import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';


export default function MarksKritTable() {
  const { expertMarks, marksAvg, startKef, kefAvg } = useContext(DataContext);

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

  // Підрахунок сум по колонках для оцінок
  const columnSums = expertMarks.reduce((sums, expertMark) => {
    expertMark.forEach((mark, index) => {
      sums[index] = (sums[index] || 0) + mark; // Додаємо оцінки для кожного експерта
    });
    return sums;
  }, new Array(expertMarks[0].length).fill(0));

  // Підрахунок сум для початкових коефіцієнтів
  const startKefSums = startKef.reduce((sums, criterion) => {
    criterion.forEach((kef, index) => {
      sums[index] = (sums[index] || 0) + kef; // Додаємо початкові коефіцієнти
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
            <th>Ср. знач</th>
          </tr>
        </thead>
        <tbody>
        {startKef.map((criterion, criterionIndex) => (
            <tr key={criterionIndex}>
              <td>{criteria[criterionIndex]}</td>
              {criterion.map((value, expertIndex) => (
                <td key={expertIndex}>
                  <a>{value}/{expertMarks[criterionIndex][expertIndex]}</a>
                </td>
              ))}
              <td>{kefAvg[criterionIndex]}/{marksAvg[criterionIndex]}</td>
            </tr>
          ))}
          <tr>
            <td>Сума</td>
            {startKefSums.map((val,index) => (
              <td>{val/10}/{columnSums[index]/10}</td>
            ))}
            <td>{kefAvg.reduce((acc, val) => acc + val, 0)/10}/{marksAvg.reduce((acc, val) => acc + val, 0)/10}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
