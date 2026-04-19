import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { RADIOS } from './radios';
import { Radio, Speed, Video } from './types';
import { VIDEOS } from './videos';

export const showBottomBarAtom = atom<boolean>(true);

// 'landing' = show landing page; any other string = videoId to play
export const currentViewAtom = atom<'landing' | string>('landing');

export const videosAtom = atom<Video[]>(VIDEOS);

export const selectedRadioAtom = atomWithStorage<Radio>(
  'RECENTLY_PLAYED',
  RADIOS[0]
);

export const radiosAtom = atom<Radio[]>(RADIOS);

export const radioVolumeAtom = atomWithStorage<number>('VOLUME', 50);

export const radioPlayAtom = atom<boolean>(false);

export const videoMuteAtom = atom<boolean>(true);

export const videoSpeedAtom = atom<Speed>(1);