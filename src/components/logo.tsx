export function Logo() {
  return (
    <div className="flex items-center justify-center size-12 bg-primary rounded-lg shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-7"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path d="M15.5 8.5l-3 3-3-3" />
        <path d="M15.5 15.5l-3-3-3 3" />
        <path d="M8.5 11.5h7" />
      </svg>
    </div>
  );
}
