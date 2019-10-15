import { useCallback, useState } from "react";

const useSetState = (initialValue = {}) => {
  const [state, set] = useState(initialValue);
  const setState = useCallback(
    patch => {
      const isPatchFunc = patch instanceof Function;
      set(prevState => ({
        ...prevState,
        ...(isPatchFunc ? patch(prevState) : patch)
      }));
    },
    [set]
  );
  return [state, setState];
};

export default useSetState;
