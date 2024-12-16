import {useAppState} from "../../../state";
import { clsx } from 'clsx';
import { getAssetUrl } from "../../../helpers/common.helpers";
import { Trans } from "react-i18next";

export default function EmeraudeFooter({classes = ''}) {
  const { gameConfig } = useAppState();

  return (
    <a className={clsx(
      classes,
      'cursor-pointer flex justify-center items-center gap-[6px] transition-all duration-300 hover:scale-110',
    )} href="https://emeraude-escape.com/" target="_blank">
      <span className={clsx(
        gameConfig.theme === 'dark' ? 'text-white' : 'text-[#667085]',
        "font-medium text-[11.5px] font-[Montserrat]")}>
        <Trans i18nKey="Global.CreatedBy">Created by</Trans>
      </span>
      {gameConfig.theme === 'dark'
        ? <img src={getAssetUrl('/permanent-elements/emeraude-white.svg')} alt="logo white"/>
        : <img src={getAssetUrl('/permanent-elements/emeraude-black.svg')} alt="logo black"/>
      }
    </a>
  )
}
