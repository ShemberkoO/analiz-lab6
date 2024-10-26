import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

function CriterTable() {
  const { startKef, setStartKef, kefAvg } = useContext(DataContext);

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

  const handleInputChange = (criterionIndex, expertIndex, value) => {
    // Копіюємо масив startKef
    const updatedKef = startKef.map(row => [...row]); // Глибока копія масиву

    // Оновлюємо значення для конкретного критерію та експерта
    updatedKef[criterionIndex][expertIndex] = value;

    // Оновлюємо стан з новими значеннями
    setStartKef(updatedKef);
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Критерії / Вагові коефіцієнти</th>
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
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(criterionIndex, expertIndex, Number(e.target.value))}
                    className="form-control"
                  />
                </td>
              ))}
              <td>{kefAvg[criterionIndex]}</td> {/* Перевірте, чи правильно обчислено середнє значення */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CriterTable;
