'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { VIDEOS } from '@/videos';
import { RADIOS } from '@/radios';
import { Radio } from '@/types';

interface AppState {
  // Video states
  selectedVideoId: string;
  videoMute: boolean;
  videoSpeed: number;

  // Radio states
  selectedRadio: Radio;
  radioPlay: boolean;
  radioVolume: number;

  // UI states
  showBottomBar: boolean;
}

interface AppStateContextType extends AppState {
  // Video actions
  setSelectedVideoId: (id: string) => void;
  setVideoMute: (mute: boolean) => void;
  setVideoSpeed: (speed: number) => void;

  // Radio actions
  setSelectedRadio: (radio: Radio) => void;
  setRadioPlay: (play: boolean) => void;
  setRadioVolume: (volume: number) => void;

  // UI actions
  setShowBottomBar: (show: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  // Video states
  const [selectedVideoId, setSelectedVideoId] = useState(
    VIDEOS[Math.floor(Math.random() * VIDEOS.length)]?.videoId || '',
  );
  const [videoMute, setVideoMute] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState(1);

  // Radio states
  const [selectedRadio, setSelectedRadio] = useState<Radio>(RADIOS[0] || { name: '', url: '' });
  const [radioPlay, setRadioPlay] = useState(false);
  const [radioVolume, setRadioVolume] = useState(50);

  // UI states
  const [showBottomBar, setShowBottomBar] = useState(true);

  const value: AppStateContextType = {
    // States
    selectedVideoId,
    videoMute,
    videoSpeed,
    selectedRadio,
    radioPlay,
    radioVolume,
    showBottomBar,

    // Actions
    setSelectedVideoId,
    setVideoMute,
    setVideoSpeed,
    setSelectedRadio,
    setRadioPlay,
    setRadioVolume,
    setShowBottomBar,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
