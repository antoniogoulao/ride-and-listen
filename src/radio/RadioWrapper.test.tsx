import { render } from '@testing-library/react';
import { Provider, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { radioPlayAtom } from '../atoms';
import { RADIOS } from '../radios';
import { RadioWrapper } from './index';

const playSpy = vi
  .spyOn(HTMLMediaElement.prototype, 'play')
  .mockResolvedValue(undefined);
vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

const StartPlaying = () => {
  const setPlay = useSetAtom(radioPlayAtom);
  useEffect(() => setPlay(true), [setPlay]);
  return null;
};

describe('RadioWrapper', () => {
  test('renders an audio element with the selected radio stream and volume', () => {
    const { container } = render(
      <Provider>
        <RadioWrapper />
      </Provider>
    );
    const audio = container.querySelector('audio');
    expect(audio).toHaveAttribute('src', RADIOS[0].url);
    expect(audio?.volume).toBe(0.5);
  });

  test('plays when the radio play atom turns on', () => {
    render(
      <Provider>
        <RadioWrapper />
        <StartPlaying />
      </Provider>
    );
    expect(playSpy).toHaveBeenCalled();
  });
});
