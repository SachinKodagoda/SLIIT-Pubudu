import { useEffect } from 'react';

type THandler = (event: TouchEvent | MouseEvent) => void;
const useOnClickOutside = (ref: React.MutableRefObject<HTMLDivElement | null>, handler: THandler) => {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
export default useOnClickOutside;
