import { useEffect } from 'react';

const useKeyDown = (targetKey: string, callback: () => void): void => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        callback();
      }
    };

    // Add event listener when component mounts
    document.addEventListener('keydown', onKeyDown);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [targetKey, callback]);
};

export default useKeyDown;
