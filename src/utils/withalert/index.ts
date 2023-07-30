import React from 'react';

export const useMediaQuery = (width: number) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
    setMatches(mediaQuery.matches);
    const handleMediaQueryChange = (e: MediaQueryListEvent) =>
      setMatches(e.matches);
    mediaQuery.addListener(handleMediaQueryChange);

    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, [width]);

  return matches;
};
