import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';


export default function ExpertsMarksTable() {
  const { expertMarks, setExpertMarks, marksAvg } = useContext(DataContext);

  const handleInputChange = (value, rowIndex, colIndex) => {
    const updatedMarks = [...expertMarks]; // Копіюємо масив expertMarks
    updatedMarks[rowIndex][colIndex] = value; // Оновлюємо значення
    setExpertMarks(updatedMarks); // Викликаємо функцію для оновлення значення в контексті
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Експерт галузі</th>
            <th>Експерт юзабіліті</th>
            <th>Експерт з програмування</th>
            <th>Потенційні користувачі</th>
            <th>Середнє значення</th>
          </tr>
        </thead>
        <tbody>
          {expertMarks.map((weights, rowIndex) => (
            <tr key={rowIndex}>
              {weights.map((weight, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => handleInputChange( Number(e.target.value), rowIndex, colIndex)}
                    className="form-control" // Клас для Bootstrap
                  />
                </td>
              ))}
              <td>{marksAvg[rowIndex]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
