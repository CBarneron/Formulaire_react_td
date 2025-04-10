import React, { useState } from 'react';
import { TextField, Switch, FormControlLabel, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';

const Formulaire = () => {
  const [isComing, setIsComing] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2025-12-20T00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2026-01-10T00:00:00'));
  const [adults, setAdults] = useState(0);
  const [notes, setNotes] = useState('');

  const minDate = new Date('2025-12-20T00:00:00');
  const maxDate = new Date('2026-01-10T00:00:00');

  const handleToggle = (event) => {
    const isChecked = event.target.checked;
    setIsComing(isChecked);
    console.log('isComing:', isChecked); // Débogage

    if (!isChecked) {
      setStartDate(minDate);
      setEndDate(maxDate);
    }
  };

  const handleAdultsChange = (change) => {
    setAdults((prev) => Math.max(0, prev + change));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
        {/* Switch */}
        <FormControlLabel
          control={<Switch checked={isComing} onChange={handleToggle} color="primary" />}
          label="Je viens pour Noël !"
        />

        {/* Formulaire conditionnel */}
        {isComing && (
          <>
            {/* Date Pickers */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <DatePicker
                label="De :"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                minDate={minDate}
                maxDate={maxDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="à"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={minDate}
                maxDate={maxDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>

            {/* Adults Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Nombre d'adultes :</span>
              <IconButton onClick={() => handleAdultsChange(-1)} color="primary">
                <Remove />
              </IconButton>
              <span>{adults}</span>
              <IconButton onClick={() => handleAdultsChange(1)} color="primary">
                <Add />
              </IconButton>
            </div>

            {/* Notes */}
            <div>
              <span>Tu vois quelque chose à ajouter ?</span>
              <TextField
                placeholder="Écris ici 😊"
                multiline
                rows={4}
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default Formulaire;