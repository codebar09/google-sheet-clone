import React from 'react';
import { Toolbar } from './components/Toolbar';
import { FormulaBar } from './components/FormulaBar';
import { Grid } from './components/Grid';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toolbar />
      <FormulaBar />
      <Grid />
    </div>
  );
}

export default App;