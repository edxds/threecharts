import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// From https://tobbelindstrom.com/blog/resize-observer-hook/
export const useResizeObserver = <T extends Element = Element>() => {
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);
  const nodeRef = useRef<T | null>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const disconnect = useCallback(() => {
    const { current } = observer;
    current?.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setEntry(entry));
    nodeRef.current && observer.current.observe(nodeRef.current);
  }, []);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [nodeRef, entry] as const;
};
