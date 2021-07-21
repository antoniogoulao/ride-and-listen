import { atom } from "recoil";
import { RADIOS } from "./radios";
import { Radio, Speed, Video } from "./types";
import { VIDEOS } from "./videos";

export const showBottomBarState = atom<boolean>({
    key: 'showBottomBarState',
    default: true
})

export const selectedVideoState = atom<string>({
    key: 'selectedVideoState',
    default: 'rFshlSZQ7cU'
})

export const videosState = atom<Video[]>({
    key: 'videosState',
    default: VIDEOS
})

export const selectedRadioState = atom<string>({
    key: 'selectedRadioState',
    default: ''
})

export const radiosState = atom<Radio[]>({
    key: 'radiosState',
    default: RADIOS
})

export const radioVolumeState = atom<number>({
    key: 'radioVolumeState',
    default: 50
})

export const videoMuteState = atom<0 | 1>({
    key: 'videoMuteState',
    default: 1
})

export const videoSpeedState = atom<Speed>({
    key: 'videoSpeedState',
    default: 1
})