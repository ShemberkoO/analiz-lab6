import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

export default function ExpertsWeightsTable() {
  
  const { experts, setExperts } = useContext(DataContext);

  const totalWeight = experts.reduce((sum, expert) => sum + expert.weight, 0);
  const relativeWeights = experts.map(expert => (expert.weight / 10).toFixed(2));

  const handleWeightChange = (index, value) => {
    const newExperts = [...experts];
    newExperts[index].weight = parseFloat(value) || 0; 
    setExperts(newExperts); 
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Типи експертів</th>
            <th>Коефіцієнти вагомості, qk (абсолютне)</th>
            <th>Коефіцієнти вагомості, qk (відносне)</th>
          </tr>
        </thead>
        <tbody>
          {experts.map((expert, index) => (
            <tr key={index}>
              <td>{expert.type}</td>
              <td>
                <input
                  type="number"
                  value={expert.weight}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  step="0.01"
                  min="0"
                  className="form-control"
                />
              </td>
              <td>{relativeWeights[index]}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Сума</strong></td>
            <td><strong>{totalWeight}</strong></td>
            <td><strong>{(totalWeight / 10).toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
