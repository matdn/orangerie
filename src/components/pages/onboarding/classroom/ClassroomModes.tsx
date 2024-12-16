import { clsx } from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isPreparation: boolean;
  setIsPreparation: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ClassroomModes({isPreparation, setIsPreparation}: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-[5vh] w-full">
      <button
        className={ clsx("button classroom", isPreparation === false && "active") }
        onClick={ () => setIsPreparation(false) }
      >
        { t("Global.Classroom.LiveClassroom", "Live classroom") }
      </button>

      <button
        className={ clsx("button classroom", isPreparation === true && "active") }
        onClick={ () => setIsPreparation(true) }
      >
        { t("Global.Classroom.Preparation", "Preparation") }
      </button>

      <div />
    </div>
  )
}
