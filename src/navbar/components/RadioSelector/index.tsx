import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { radiosAtom, selectedRadioAtom } from '../../../atoms';

export const RadioSelector = () => {
  const radios = useAtomValue(radiosAtom);
  const [selectedRadio, setSelectedRadio] = useAtom(selectedRadioAtom);

  const handleRadioChange = (radioId: number) => {
    const newRadio = radios.find((elem) => elem.id === radioId);
    if (newRadio) setSelectedRadio(newRadio);
  };

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={selectedRadio?.id}
        onChange={(event) => handleRadioChange(event.target.value as number)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select radio' }}
      >
        {radios.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};