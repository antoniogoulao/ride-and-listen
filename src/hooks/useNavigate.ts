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

  const navigateToPrivacy = useCallback(() => {
    setCurrentView('privacy');
    window.history.pushState(null, '', '?page=privacy');
  }, [setCurrentView]);

  return { navigateToVideo, navigateToLanding, navigateToPrivacy };
};