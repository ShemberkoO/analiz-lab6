import React, {useContext} from 'react';
import { DataContext } from '../../contexts/DataContext';

export default function UsersMarksTable() {
  const { userMarks, setUserMarks } = useContext(DataContext);

  const handleInputChange = (value, rowIndex, colIndex) => {
    const updatedMarks = [...userMarks]; // Копіюємо масив userMarks
    updatedMarks[rowIndex][colIndex] = value; // Оновлюємо значення
    setUserMarks(updatedMarks); // Викликаємо функцію для оновлення значення в контексті
  };

  const userLabels = Array.from({ length: userMarks[0].length }, (_, i) => `User ${i + 1}`);

  return (
    <div className="container-fluid mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            {userLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userMarks.map((marks, rowIndex) => (
            <tr key={rowIndex}>
              {marks.map((mark, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={mark}
                    onChange={(e) => handleInputChange(Number(e.target.value), rowIndex, colIndex)}
                    className="form-control" 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
