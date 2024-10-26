import React, { createContext, useEffect, useState } from 'react';

// Створіть контекст
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Початкові дані
  const startCoef = [
    [8, 5, 9, 7],
    [5, 9, 6, 5],
    [10, 6, 9, 6],
    [6, 5, 10, 7],
    [5, 5, 10, 4],
    [9, 9, 7, 10],
    [9, 7, 6, 10],
    [6, 5, 10, 5],
    [8, 6, 9, 6],
    [7, 8, 6, 10],
  ];

  const ExpertMarks = [
    [10, 9, 10, 8.05],
    [9, 8, 8, 7.50],
    [9, 7, 9, 6.10],
    [6, 5, 8, 7.70],
    [7, 5, 8, 6.05],
    [9, 7, 8, 7.85],
    [10, 9, 10, 7.35],
    [6, 8, 7, 5.55],
    [9, 7, 6, 7.85],
    [6, 5, 9, 4.30],
  ];

  const UserMarks = [
    [6, 8, 9, 6, 9, 10, 7, 7, 6, 10, 10, 10, 9, 6, 7, 8, 6, 10, 8, 9],
    [6, 8, 6, 5, 8, 6, 9, 7, 7, 10, 10, 10, 9, 10, 6, 7, 5, 10, 6, 5],
    [6, 7, 6, 4, 4, 9, 8, 4, 6, 9, 5, 9, 8, 7, 4, 4, 4, 8, 4, 6],
    [6, 8, 7, 8, 8, 9, 10, 10, 6, 7, 7, 8, 9, 8, 6, 6, 6, 10, 6, 9],
    [4, 5, 6, 5, 5, 8, 8, 9, 4, 7, 4, 8, 8, 7, 7, 4, 4, 4, 6, 8],
    [6, 6, 10, 6, 7, 9, 8, 10, 6, 10, 10, 8, 6, 9, 6, 6, 8, 10, 6, 10],
    [6, 8, 9, 6, 7, 7, 6, 9, 6, 10, 5, 10, 5, 10, 8, 5, 7, 8, 5, 10],
    [6, 4, 6, 4, 5, 6, 8, 7, 5, 6, 5, 5, 4, 7, 4, 4, 6, 9, 6, 4],
    [8, 8, 10, 7, 6, 7, 10, 6, 6, 8, 10, 6, 9, 8, 9, 8, 6, 9, 6, 10],
    [3, 4, 6, 3, 3, 3, 6, 5, 5, 7, 5, 5, 3, 5, 3, 4, 4, 3, 5, 4],
  ];
  
  
  const Experts = [
    { type: "Експерт галузі", weight: 7 },
    { type: "Експерт юзабіліті", weight: 8 },
    { type: "Експерт з програмування", weight: 9 },
    { type: "Потенційні користувачі", weight: 5 },
  ];
  const [experts, setExperts] = useState(Experts);

  // Стан для різних даних
  const [userMarks, setUserMarks] = useState(UserMarks);
  
  const [startKef, setStartKef] = useState(startCoef);
  const [kefAvg, setKefAvg] = useState([]);

  const [expertMarks, setExpertMarks] = useState(ExpertMarks);
  const [marksAvg, setMarksAvg] = useState([]);

  // Функція для розрахунку середніх значень користувацьких оцінок
  const calculateUserMarksAverages = () => {
    const newAverages = userMarks.map((row) => {
      const sum = row.reduce((acc, val) => acc + val, 0);
      return sum / row.length;
    });

    // Оновлюємо останній стовпець expertMarks
    setExpertMarks((prevData) => {
      return prevData.map((row, index) => {
        return [...row.slice(0, -1), newAverages[index]];
      });
    });
  };

  // Функція для розрахунку середніх коефіцієнтів
  const calculateKefAverages = () => {
    const newAverages = startKef.map((row) => {
      const sum = row.reduce((acc, val) => acc + val, 0);
      return sum / row.length;
    });
    setKefAvg(newAverages);
  };

  // Функція для розрахунку середніх оцінок експертів
  const calculateMarksAverages = () => {
    const newAverages = expertMarks.map((row) => {
      const sum = row.reduce((acc, val) => acc + val, 0);
      return sum / row.length;
    });
    console.log(expertMarks)
    console.log(newAverages)
    setMarksAvg(newAverages);
  };

  // Викликаємо функції для розрахунків
  useEffect(() => {
    calculateUserMarksAverages();
  }, [userMarks]);

  useEffect(() => {
    calculateKefAverages();
  }, [startKef]);

  useEffect(() => {
    calculateMarksAverages();
  }, [expertMarks]);

  // Повертаємо контекст з даними та функціями
  return (
    <DataContext.Provider
      value={{
        userMarks,
        setUserMarks,
        expertMarks,
        setExpertMarks,
        experts,
        setExperts,
        startKef,
        kefAvg,
        marksAvg,
        setStartKef
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
