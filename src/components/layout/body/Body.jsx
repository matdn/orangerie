import React from 'react';
import { Outlet } from 'react-router-dom';

// Config
import { useAppState } from '../../../state';

// Components
import Head from '../Head';

function Body() {
  const { gameConfig } = useAppState();

  return (
    <div className="bg-white relative">
      <Head
        title={gameConfig.gameTitle}
        description={gameConfig.gameDescription}
        favicon={gameConfig.favicon?.filename}
      />
      <Outlet />
    </div>
  );
}

export default Body;
