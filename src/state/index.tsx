import React, { createContext, useContext, useEffect, useState } from 'react';

import { fetchGameConfigData } from '../helpers/gameConfig.helpers';

export interface StateContextType {
  mediaError: Error | null;
  setMediaError(error: Error | null): void;
  isFetching: boolean;
  setIsFetching(value: boolean): void;
  getGameConfig(): Promise<any>;
  gameConfig: any;
  setGameConfig(config: any): void;
  isFetchingGameConfig: boolean,
  setFetchingGameConfig(value: boolean): void;
  isOutdatedVersionPopupOpened: boolean;
  setIsOutdatedVersionPopupOpened: (value: boolean) => void;
}

export const StateContext = createContext<StateContextType | null>(null);

export default function AppStateProvider(props: React.PropsWithChildren<any>) {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingGameConfig, setFetchingGameConfig] = useState(false);
  const [gameConfig, setGameConfig] = useState({});
  const [isOutdatedVersionPopupOpened, setIsOutdatedVersionPopupOpened] = useState(false);

  let contextValue = {
    isFetching,
    setIsFetching,
    gameConfig,
    setGameConfig,
    isFetchingGameConfig,
    setFetchingGameConfig,
    isOutdatedVersionPopupOpened,
    setIsOutdatedVersionPopupOpened
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getGameConfig: async () => fetchGameConfigData(),
  };

  const getGameConfig: StateContextType['getGameConfig'] = () => {
    setFetchingGameConfig(true);
    return contextValue
      .getGameConfig()
      .then((res) => {
        const { data } = res;
        if (data) {
          setGameConfig(data.story.content);
        }
        setFetchingGameConfig(false);
        return res;
      })
      .catch((err) => {
        setFetchingGameConfig(false);
        return Promise.reject(err);
      });
  };

  useEffect(() => {
    getGameConfig().catch(() => null);
  }, []);

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
