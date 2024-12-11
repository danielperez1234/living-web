import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface CounterProps {
  maxCount: number;
  count: number;
  setCount: (newCount: number) => void;
}

const AppCounter: React.FC<CounterProps> = ({ maxCount, count, setCount }) => {

   const handleIncrement = () => {
     if (count < maxCount) setCount(count + 1);
   };

   const handleDecrement = () => {
     if (count > 0) setCount(count - 1);
   };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= maxCount) {
      setCount(value);
    } else if (isNaN(value) || value <= 0) {
      setCount(0);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent={"center"}>
      <IconButton
        onClick={handleDecrement}
        disabled={count === 0}
        color="primary"
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        value={count}
        onChange={handleInputChange}
        variant="standard"
        color="primary"
        inputProps={{
          min: 0,
          max: maxCount,
          style: { textAlign: "center" }, // Centrar el texto en el campo
        }}
        sx={{
          width: 80,
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        }}
      />
      <IconButton
        onClick={handleIncrement}
        disabled={count === maxCount}
        color="primary"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AppCounter;
