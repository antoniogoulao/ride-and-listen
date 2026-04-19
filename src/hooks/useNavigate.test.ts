import { renderHook, act } from '@testing-library/react';
import { getDefaultStore } from 'jotai';
import { currentViewAtom } from '../atoms';
import { useNavigate } from './useNavigate';

const pushStateSpy = vi
  .spyOn(window.history, 'pushState')
  .mockImplementation(() => {});

beforeEach(() => {
  getDefaultStore().set(currentViewAtom, 'landing');
  pushStateSpy.mockClear();
});

describe('useNavigate', () => {
  test('navigateToVideo sets currentViewAtom to the videoId and pushes URL', () => {
    const { result } = renderHook(() => useNavigate());

    act(() => {
      result.current.navigateToVideo('abc123');
    });

    expect(getDefaultStore().get(currentViewAtom)).toBe('abc123');
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '?v=abc123');
  });

  test('navigateToLanding sets currentViewAtom to landing and pushes URL', () => {
    getDefaultStore().set(currentViewAtom, 'abc123');
    const { result } = renderHook(() => useNavigate());

    act(() => {
      result.current.navigateToLanding();
    });

    expect(getDefaultStore().get(currentViewAtom)).toBe('landing');
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/');
  });
});