import { useState, useEffect } from 'react';

// Config
import { useAppState } from '../../../../state';
import CustomRotationDialogUI from '../../../customUI/rotationDialog/CustomRotationDialogUI';

const PermanentElements = ({ data }) => {
  const { gameConfig , isOutdatedVersionPopupOpened } = useAppState();

  const dialogData = {
    rotationDialog: {
      isActive: false,
      content: gameConfig.rotationDialogContent,
      button: {
        text: 'Continue',
        action: () => setOpenRotationDialog(false),
      },
    },
  };

  const [openRotationDialog, setOpenRotationDialog] = useState(dialogData.rotationDialog.isActive);

  // Rotation listener
  useEffect(() => {
    const handleOrientationChange = (mql) => {
      const orientation = mql.matches ? 'landscape' : 'portrait';
      console.log(`Screen orientation is now ${orientation}`);
      if (orientation === 'portrait') {
        setOpenRotationDialog(true);
      } else {
        setOpenRotationDialog(false);
      }
    };

    const matcher = window.matchMedia('(orientation: landscape)');
    matcher.addEventListener('change', handleOrientationChange);
    // Calling the function once at the start to log the initial state
    handleOrientationChange(matcher);

    // Cleaning up listener on unmount
    return () => {
      matcher.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return (
    <>
      {!gameConfig.hideRotationDialog && (
        <CustomRotationDialogUI
          openCustomApp={openRotationDialog && !isOutdatedVersionPopupOpened}
          setOpenCustomApp={setOpenRotationDialog}
        />
      )}
    </>
  );
};

export default PermanentElements;
