import { useMemo, useState, useCallback, useEffect } from "react";

type useModalProps = {
  isOpened: boolean;
};

// refactor this hook later
const useModal = (
  { isOpened: initialState }: useModalProps = { isOpened: false }
) => {
  const state = useMemo<any>(() => ({}), []);

  const [opened, setOpened] = useState<boolean>(initialState);

  const open = useCallback((data?: any) => {
    setOpened(true);
    state.data = data;
    return new Promise((resolve) => {
      state.resolve = resolve;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = useCallback((value: any) => {
    setOpened(false);
    state.resolve(value);
    state.resolve = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => state.resolve && state.resolve(), []);

  return { opened, data: state.data, submit, open };
};

export default useModal;
