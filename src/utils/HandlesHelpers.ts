import { type MutableRefObject, useEffect, useRef } from "react";

interface IHandleHelpersProps {
  onCancel: () => void;
}

export const useOuterClick = <T = any>(
  fn: () => void
): MutableRefObject<T | null> => {
  const ref = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: { target: any }) {
      if (
        event.target &&
        ref.current &&
        !(ref as MutableRefObject<any>).current.contains(event.target)
      ) {
        fn();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fn, ref]);
  return ref;
};

export function closeEsc({ onCancel }: IHandleHelpersProps) {
  const close = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      onCancel();
    }
  };

  window.addEventListener("keydown", close);
  return () => {
    window.removeEventListener("keydown", close);
  };
}
