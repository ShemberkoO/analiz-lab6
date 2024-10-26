import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import CriterTable from './components/Criterias/CriterTable';
import MarksPage from './components/Marks/MarksPage';
import MarksKritTable from './components/MarkCriterias/MarksKritTable';
import QualityPage from './components/Quality/QualityPage';
import BranchDiagramPage from './components/Diagrams/Branch/BranchDiagramPage';
import UsabilityDiagramPage from './components/Diagrams/Usability/UsabilityDiagramPage';
import ProgramingDiagramPage from './components/Diagrams/Programing/ProgramingDiagramPage';
import UsersDiagramPage from './components/Diagrams/Users/UsersDiagramPage';
import ExpertsAvgDiagramPage from './components/Diagrams/ExpertsAvg/ExpertsAvgDiagramPage';
import TotalChart from './components/Diagrams/Total/TotalChart';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
       
        <nav class="btn-group" role="group">
          <Link to="/" class="btn btn-primary">Критерії</Link> 
          <Link to="/marks" class="btn btn-primary">Оцінки</Link>
          <Link to="/markCriter" class="btn btn-primary">Критерії оцінювання</Link> 
          <Link to="/qual" class="btn btn-primary">Якість ПЗ</Link>
          <Link to="/d1" class="btn btn-primary">Д. експертів галузі</Link> 
          <Link to="/d2" class="btn btn-primary">Д. експертів зручності</Link>
          <Link to="/d3" class="btn btn-primary">Д. експертів програмування</Link> 
          <Link to="/d4" class="btn btn-primary">Д. користувачів</Link>
          <Link to="/d5" class="btn btn-primary">Д. усереднених</Link> 
          <Link to="/d6" class="btn btn-primary">Д. зведена</Link>
        </nav>
        
          <Routes>
            <Route path="/" element={<CriterTable />} />
            <Route path="/marks" element={<MarksPage />} />
            <Route path="/markCriter" element={<MarksKritTable />} />
            <Route path="/qual" element={<QualityPage></QualityPage>} />
            <Route path="/d1" element={<BranchDiagramPage></BranchDiagramPage>} />
            <Route path="/d2" element={<UsabilityDiagramPage></UsabilityDiagramPage>} />
            <Route path="/d3" element={<ProgramingDiagramPage></ProgramingDiagramPage>} />
            <Route path="/d4" element={<UsersDiagramPage></UsersDiagramPage>} />
            <Route path="/d5" element={<ExpertsAvgDiagramPage></ExpertsAvgDiagramPage>} />
            <Route path="/d6" element={<TotalChart></TotalChart>} />
          </Routes>
          
        </div>
      </Router>
     </DataProvider>
  );
}

export default App;
