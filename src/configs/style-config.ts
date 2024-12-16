// INIT - update this file with your app style config
import { getAssetUrl } from '../helpers/common.helpers';

export const ClassStyleConfig= {
  base: {
    bgColor: "bg-white",
    textColor: "text-[#344054]",
    fontFamily: "font-[Roboto]"
  },
  logo: {
    bgSize: "h-[15vh] w-auto"
  },
  onboarding: {
    bgColor: "bg-white",
    textColor: "text-[#344054]",
    titleFontFamily: "font-[Roboto]",
    titleFontSize: "text-[6vh] sm:text-[9vh]",
    titleUpper: "uppercase",
    titleColor: "text-[#344054]",
    titleFontWeight: "font-semibold",
    subtitleFontSize: "text-[4vh]",
    subtitleUpper: "uppercase",
    subtitleFontWeight: "font-medium",
    paragraphFontSize: "text-[1.1rem]",
    buttonBg: "bg-[#344054]",
    buttonTextColor: "text-[#FFFFFF]",
    buttonHoverBg: "hover:bg-[#475467]",
    buttonHoverTextColor: "hover:text-[#FFFFFF]",
  },
  selectEpisode: {
    chapterTitleMobileFontSize: "text-[2rem]",
    chapterTitleMobileFontWeight: "font-semibold",
    chapterTitleMobileUpper: "uppercase",
    chapterNameMobileFontSize: "text-[1.5rem]",
    chapterNameMobileFontWeight: "font-normal",
    chapterNameMobileLineHeight: "leading-[1.2]",
  },
  joinTeam: {
    headerBgColor: "bg-[#344054]",
    headerTextColor: "text-[#475467]",
  },
  button: {
    rounded: "rounded-full",
    spacing: "py-[1.5vh] px-[2vh] sm:px-[3vh]",
    fontFamily: "font-[Roboto]",
    textColor: "text-[#fff]",
    fontSize: "text-[11rem]",
    fontWeight: "font-medium",
    lineHeight: "leading-none",
  },
  start: {
    fontSize: 'text-[5rem]'
  },
  outdatedVersion: {
    fontFamily: "font-[Roboto]",
    fontSize: "text-[3vh] sm:text-[4vh]",
    fontWeight: "font-normal"
  },
  permanentElements: {
    iconBack: getAssetUrl('/permanent-elements/back-arrow.svg'),
    backPadding: "",
    backBgColor: "bg-transparent",
    backBgColorHover: "hover:bg[#344054]",
    backBgSize: "80%",
  },
  participantVideo: {
    round: 'rounded-t-lg',
    size: 'w-[134.4px] h-[92px]',
    border: 'border-[1.6px] border-[#344054]',
    btnCloseText: 'text-[#344054] text-[14px] font-medium'
  }
}
