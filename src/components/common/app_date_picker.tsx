import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import AppSelect from './app_select';

const AppDatePicker = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const generateDays = () => {
    return Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    return Array.from({ length: 101 }, (_, i) => `${currentYear - i}`);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Grid container  spacing={0}>
      <Grid item xs={12} md={4}>
        
        <AppSelect label={'Día'} value={day} options={generateDays()} onChange={(e) => setDay(e??'')}/>
      </Grid>

      <Grid item xs={12} md={4} >
      <AppSelect label={'Mes'} value={month} options={months} onChange={(e) => setMonth(e??'')}/>
      </Grid>

      <Grid item xs={12} md={4}>
      <AppSelect label={'Año'} value={year} options={generateYears()} onChange={(e) => setYear(e??'')}/>
      </Grid>
    </Grid>
  );
};

export default AppDatePicker;