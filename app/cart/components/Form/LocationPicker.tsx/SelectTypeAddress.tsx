import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ISelectTypeAddressProps<T extends FieldValues> {
  control: Control<T>;
  handleChange: (event: SelectChangeEvent<unknown>) => void;
  name: Path<T>;
}

const SelectTypeAddress = <T extends FieldValues>({
  control,
  handleChange,
  name,
}: ISelectTypeAddressProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            label="Age"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={1}>За адресою</MenuItem>
            <MenuItem value={2}>У відділення або поштомат</MenuItem>
          </Select>
        </>
      )}
    />
  );
};

export default SelectTypeAddress;
