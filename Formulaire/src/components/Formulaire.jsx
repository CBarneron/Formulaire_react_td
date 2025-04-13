import React, { useState } from "react";
import { TextField, Switch, FormControlLabel, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";

const Formulaire = () => {
  const [isComing, setIsComing] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2025-12-20T00:00:00"));
  const [endDate, setEndDate] = useState(new Date("2026-01-10T00:00:00"));
  const [adults, setAdults] = useState(0);
  const [adultNames, setAdultNames] = useState([]);
  const [notes, setNotes] = useState("");

  const [pitchounComing, setPitchounComing] = useState(false);
  const [pitchounCount, setPitchounCount] = useState(0);
  const [pitchounNames, setPitchounNames] = useState([]);

  const minDate = new Date("2025-12-20T00:00:00");
  const maxDate = new Date("2026-01-10T00:00:00");

  const handleToggle = (event) => {
    const isChecked = event.target.checked;
    setIsComing(isChecked);

    if (!isChecked) {
      setStartDate(minDate);
      setEndDate(maxDate);
    }
  };

  const handleAdultsChange = (change) => {
    setAdults((prev) => {
      const newCount = Math.max(0, prev + change);
      setAdultNames((prevNames) => {
        if (newCount > prevNames.length) {
          return [...prevNames, ...Array(newCount - prevNames.length).fill("")];
        } else {
          return prevNames.slice(0, newCount);
        }
      });
      return newCount;
    });
  };

  const handleAdultNameChange = (index, value) => {
    setAdultNames((prev) => {
      const updatedNames = [...prev];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const handlePitchounCountChange = (change) => {
    setPitchounCount((prev) => {
      const newCount = Math.max(0, prev + change);
      setPitchounNames((prevNames) => {
        if (newCount > prevNames.length) {
          return [...prevNames, ...Array(newCount - prevNames.length).fill("")];
        } else {
          return prevNames.slice(0, newCount);
        }
      });
      return newCount;
    });
  };

  const handlePitchounNameChange = (index, value) => {
    setPitchounNames((prev) => {
      const updatedNames = [...prev];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log("Formulaire soumis avec les données suivantes :");
    console.log("Je viens pour Noël :", isComing);
    console.log("Date de début :", startDate);
    console.log("Date de fin :", endDate);
    console.log("Nombre d'adultes :", adults);
    console.log("Prénoms des adultes :", adultNames);
    console.log("J'ai des pitchouns :", pitchounComing);
    console.log("Nombre de pitchouns :", pitchounCount);
    console.log("Prénoms des pitchouns :", pitchounNames);
    console.log("Notes :", notes);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {/* Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={isComing}
              onChange={handleToggle}
              color="primary"
            />
          }
          label="Je viens pour Noël !"
        />

        {/* Formulaire conditionnel */}
        {isComing && (
          <>
            {/* Date Pickers */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span>Nombre d'adultes :</span>
              <IconButton
                onClick={() => handleAdultsChange(-1)}
                color="primary"
              >
                <Remove />
              </IconButton>
              <span>{adults}</span>
              <IconButton onClick={() => handleAdultsChange(1)} color="primary">
                <Add />
              </IconButton>
            </div>

            {/* Adult names */}
            {adultNames.map((name, index) => (
              <TextField
                key={index}
                label={`Prénom adulte ${index + 1}`}
                value={name}
                onChange={(e) => handleAdultNameChange(index, e.target.value)}
                fullWidth
              />
            ))}

            {/* Pitchoun Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={pitchounComing}
                  onChange={(e) => setPitchounComing(e.target.checked)}
                  color="primary"
                />
              }
              label="J'ai des pitchouns !"
            />

            {pitchounComing && (
              <>
                {/* Pitchoun Counter */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span>Nombre de pitchouns :</span>
                  <IconButton
                    onClick={() => handlePitchounCountChange(-1)}
                    color="primary"
                  >
                    <Remove />
                  </IconButton>
                  <span>{pitchounCount}</span>
                  <IconButton
                    onClick={() => handlePitchounCountChange(1)}
                    color="primary"
                  >
                    <Add />
                  </IconButton>
                </div>

                {/* Pitchoun Names */}
                {pitchounNames.map((name, index) => (
                  <TextField
                    key={index}
                    label={`Prénom pitchoun ${index + 1}`}
                    value={name}
                    onChange={(e) =>
                      handlePitchounNameChange(index, e.target.value)
                    }
                    fullWidth
                  />
                ))}
              </>
            )}

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

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Soumettre
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default Formulaire;
