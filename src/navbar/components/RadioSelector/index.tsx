import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useCallback } from 'react';
import { RADIOS } from '@/radios';
import { useAppState } from '@/context/AppStateProvider';

export const RadioSelector = () => {
  const { selectedRadio, setSelectedRadio } = useAppState();

  const getRadioChange = useCallback(
    (radioId: number) => {
      const newRadio = RADIOS.find((elem) => elem.id === radioId);
      if (newRadio) {
        setSelectedRadio(newRadio);
      }
    },
    [setSelectedRadio],
  );

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={selectedRadio?.id}
        onChange={(event) => getRadioChange(event.target.value as number)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select radio' }}>
        {RADIOS.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
