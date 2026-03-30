import { useEffect, useRef, useState } from "react";

export const usePopup = (popupName, allPopups, setAllPopups) => {
  const triggerRef = useRef(null);
  const popupRef = useRef(null);
  const isOpen = allPopups.active === popupName;

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAllPopups(prev => ({
      active: prev.active === popupName ? null : popupName
    }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!triggerRef.current && !popupRef.current) return;

      const clickedInsideTrigger = triggerRef.current?.contains(e.target);
      const clickedInsidePopup = popupRef.current?.contains(e.target);

      // ✅ Close only if clicked outside BOTH
      if (!clickedInsideTrigger && !clickedInsidePopup) {
        setAllPopups({ active: null });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setAllPopups]);

  return { isOpen, toggle, triggerRef, popupRef };
};
