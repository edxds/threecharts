import { useState, useCallback, useRef } from 'react';
import throttle from 'lodash/throttle';

export function useScrollDirection(timeout = 250, threshold = 50) {
  const [direction, setDirection] = useState<'DOWN' | 'UP' | null>(null);
  const [currentScroll, setCurrentScroll] = useState(0);

  const currentScrollRef = useRef(currentScroll);
  const previousScrollRef = useRef(currentScroll);

  // Store latest currentScroll so we can access its latest in the 'stale' directionCallback
  currentScrollRef.current = currentScroll;

  const directionCallback = useCallback(
    throttle(() => {
      if (Math.abs(currentScrollRef.current - previousScrollRef.current) < threshold) {
        return;
      }

      // Check the *currentScroll*, but <timeout>ms after the event was fired
      setDirection(currentScrollRef.current > previousScrollRef.current ? 'DOWN' : 'UP');

      // Set previousScroll after comparison is done
      previousScrollRef.current = currentScrollRef.current;
    }, timeout),
    [],
  );

  const scrollCallback = useCallback(
    (event: React.UIEvent) => {
      const { scrollHeight: targetHeight, scrollTop: currentScroll } = event.currentTarget;
      const { innerHeight: windowHeight } = window;

      const isOverScrolling = targetHeight - windowHeight - currentScroll < 0;
      const isUnderScrolling = currentScroll < 0;

      // Ignore iOS elastic scroll
      if (isOverScrolling || isUnderScrolling) {
        return;
      }

      setCurrentScroll(currentScroll);
      directionCallback();
    },
    [directionCallback],
  );

  return [scrollCallback, direction] as const;
}
