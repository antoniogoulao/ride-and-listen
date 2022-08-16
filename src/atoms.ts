import { atom, selector } from "recoil";
import { RADIOS } from "./radios";
import { Radio, Speed, Video } from "./types";
import { VIDEOS } from "./videos";

export const showBottomBarState = atom<boolean>({
    key: 'showBottomBarState',
    default: true
})

export const selectedVideoState = atom<string>({
    key: 'selectedVideoState',
    default: VIDEOS[Math.floor(Math.random() * VIDEOS.length)].videoId
})

export const videosState = atom<Video[]>({
    key: 'videosState',
    default: VIDEOS
})

export const selectedRadioState = atom<Radio>({
    key: 'selectedRadioState',
    default: RADIOS[0]
})

export const radiosState = atom<Radio[]>({
    key: 'radiosState',
    default: RADIOS
})

export const radioVolumeState = atom<number>({
    key: 'radioVolumeState',
    default: 50
})

export const radioPlayState = atom<boolean>({
    key: 'radioPlayState',
    default: false
})

export const videoMuteState = atom<boolean>({
    key: 'videoMuteState',
    default: true
})

export const videoSpeedState = atom<Speed>({
    key: 'videoSpeedState',
    default: 1
})

export const radioSelector = selector({
    key: 'radioSelector',
    get: ({get}) => get(selectedRadioState),
    set: ({ set }, id) => 
        set(selectedRadioState, (RADIOS.find(elem => elem.id === id) as Radio)),
    
});