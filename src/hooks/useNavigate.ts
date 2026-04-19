import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { currentViewAtom } from '../atoms';

export const useNavigate = () => {
  const setCurrentView = useSetAtom(currentViewAtom);

  const navigateToVideo = useCallback(
    (videoId: string) => {
      setCurrentView(videoId);
      window.history.pushState(null, '', `?v=${videoId}`);
    },
    [setCurrentView]
  );

  const navigateToLanding = useCallback(() => {
    setCurrentView('landing');
    window.history.pushState(null, '', '/');
  }, [setCurrentView]);

  return { navigateToVideo, navigateToLanding };
};