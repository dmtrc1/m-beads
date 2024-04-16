import { useEffect } from 'react';

const usePreventArrowDownScroll = (enable: boolean = true): void => {
  useEffect(() => {
    if (!enable) return;

    const preventScroll = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
      }
    };

    // Add event listener to window when component mounts
    window.addEventListener('keydown', preventScroll);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', preventScroll);
    };
  }, [enable]);
};

export default usePreventArrowDownScroll;
