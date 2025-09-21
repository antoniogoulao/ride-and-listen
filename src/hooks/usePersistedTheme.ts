import { useEffect, useState } from 'react';
import { PaletteMode } from '@mui/material';

export const usePersistedTheme = (): [PaletteMode, () => void] => {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as PaletteMode;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  return [mode, toggleColorMode];
};
