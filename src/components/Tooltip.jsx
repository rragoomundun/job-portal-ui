import { useEffect, useRef, useState } from "react";

const ALIGN_CLASSES = {
  center: {
    bubble: "left-1/2 -translate-x-1/2",
    arrow: "left-1/2 -translate-x-1/2",
  },
  start: {
    bubble: "left-0",
    arrow: "left-6",
  },
};

export const Tooltip = ({ id, content, children, align = "center" }) => {
  const alignClasses = ALIGN_CLASSES[align] ?? ALIGN_CLASSES.center;
  const wrapperRef = useRef(null);
  const pointerTypeRef = useRef(null);

  // Mouse hover only: touch browsers emulate hover on tap, which would fight the tap toggle.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Opened by a tap, for touch devices (iOS Safari doesn't focus buttons on tap).
  const [pinned, setPinned] = useState(false);
  // Hidden with Escape or a second tap until the next hover, focus or tap.
  const [dismissed, setDismissed] = useState(false);

  const open = (hovered || focused || pinned) && !dismissed;

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDismissed(true);
        setPinned(false);
      }
    };

    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setPinned(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  const handlePointerEnter = (event) => {
    if (event.pointerType === "mouse") {
      setHovered(true);
      setDismissed(false);
    }
  };

  const handlePointerLeave = (event) => {
    if (event.pointerType === "mouse") {
      setHovered(false);
    }
  };

  const handleClick = () => {
    const pointerType = pointerTypeRef.current;
    pointerTypeRef.current = null;
    // Mouse and keyboard already open it via hover and focus; taps toggle it.
    if (pointerType !== "touch" && pointerType !== "pen") return;

    if (pinned && !dismissed) {
      setPinned(false);
      setDismissed(true);
    } else {
      setPinned(true);
      setDismissed(false);
    }
  };

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={(event) => {
        pointerTypeRef.current = event.pointerType;
      }}
      onClick={handleClick}
      onFocus={() => {
        setFocused(true);
        setDismissed(false);
      }}
      onBlur={() => setFocused(false)}
    >
      {children}
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full ${alignClasses.bubble} z-30 mb-3 w-64 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-700/50 bg-gray-800/95 px-4 py-3 text-left text-xs leading-relaxed text-gray-200 shadow-2xl backdrop-blur-md transition-all duration-300 ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`}
      >
        <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-primary-500 to-purple-500"></span>
        {content}
        <span
          className={`absolute ${alignClasses.arrow} top-full -mt-1.5 h-3 w-3 rotate-45 border-b border-r border-gray-700/50 bg-gray-800`}
        ></span>
      </span>
    </span>
  );
};
