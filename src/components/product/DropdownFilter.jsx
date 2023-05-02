import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, productType, theme) {
  return {
    fontWeight:
      productType.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function DropdownFilter({ handleFilter }) {
  const theme = useTheme();
  const [productType, setProductType] = useState([]);

  const filterOptions = [
    { id: 1, name: "Ready Product", value: "readyProduct" },
    { id: 2, name: "Made-To-Order", value: "madeToOrder" },
    { id: 3, name: "White-Labelling", value: "whiteLabeling" },
    { id: 4, name: "Eco-Friendly", value: "ecoFriendly" },
    { id: 5, name: "Prodo-Exclusive", value: "prodoExclusive" },
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const filteredOptions = filterOptions
      .filter((option) => productType.includes(option.name))
      .map((ele) => ele.value);
      
    handleFilter(filteredOptions);

  }, [productType]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Filter</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={productType}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filterOptions.map((element) => (
            <MenuItem
              key={element.name}
              value={element.name}
              style={getStyles(element.name, productType, theme)}
            >
              {element.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default DropdownFilter;
