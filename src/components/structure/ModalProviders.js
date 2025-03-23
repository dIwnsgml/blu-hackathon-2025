import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function ModalProvider({
  children,
  context,
  initialState,
  stateName,
  setStateName,
  resetOnPathChange = true,
}) {
  const [state, setState] = useState(initialState);
  const pathname = usePathname();

  useEffect(() => {
    if (resetOnPathChange) {
      setState(initialState);
    }
  }, [pathname, resetOnPathChange, initialState]);

  const value = { [stateName]: state, [setStateName]: setState };
  return <context.Provider value={value}>{children}</context.Provider>;
}

export function createModalProvider(
  initialState,
  stateName,
  defaultResetOnPathChange = true
) {
  const setStateName = `set${
    stateName.charAt(0).toUpperCase() + stateName.slice(1)
  }`;

  const Context = createContext({
    [stateName]: initialState,
    [setStateName]: () => {},
  });

  const Provider = ({
    children,
    resetOnPathChange = defaultResetOnPathChange,
  }) => (
    <ModalProvider
      context={Context}
      initialState={initialState}
      stateName={stateName}
      setStateName={setStateName}
      resetOnPathChange={resetOnPathChange}
    >
      {children}
    </ModalProvider>
  );

  return { Context, Provider };
}

export const { Context: AccountModalContext, Provider: AccountModalProvider } =
  createModalProvider(false, "isAccountModal");

export const { Context: GoalModalContext, Provider: GoalModalProvider } =
  createModalProvider(false, "isGoalModal");

export default function ModalProviders({ children }) {
  return (
    <AccountModalProvider>
      <GoalModalProvider>{children}</GoalModalProvider>
    </AccountModalProvider>
  );
}
