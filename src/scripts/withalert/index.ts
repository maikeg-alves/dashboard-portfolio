import React from 'react';

export const useMediaQuery = (width: number) => {
  /*   const [targetReached, setTargetReached] = React.useState(false);

  const updateTarget = React.useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);


  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, [updateTarget, width]);

  return targetReached; */

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
