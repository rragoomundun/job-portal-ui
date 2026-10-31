export const Tooltip = ({ id, content, children }) => {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-3 w-64 max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-xl border border-gray-700/50 bg-gray-800/95 px-4 py-3 text-left text-xs leading-relaxed text-gray-200 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:visible group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100"
      >
        <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-primary-500 to-purple-500"></span>
        {content}
        <span className="absolute left-1/2 top-full -mt-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gray-700/50 bg-gray-800"></span>
      </span>
    </span>
  );
};
