import clsx from "clsx";
import { ClassStyleConfig } from '../../../configs/style-config';

const displayParagraph = (paragraph) => {
  return Array.isArray(paragraph)
    ? <span dangerouslySetInnerHTML={{__html: paragraph.join('<br>')}} />
    : paragraph
}

export function OnboardingHeader({
  isCompanyGame,
  logoUrl,
  title,
  subtitle,
  paragraph,
  paragraphMobile,
  companyClientLogo,
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {logoUrl && (
        <div
          className={clsx(
            "bg-center bg-no-repeat",
            ClassStyleConfig.logo.bgSize
          )}
          style={{ backgroundImage: `url('` + logoUrl + `')` }}
        />
      )}
      {title && (
        <h1 
          className={clsx(
            "mt-8",
            ClassStyleConfig.onboarding.titleColor,
            ClassStyleConfig.onboarding.titleFontFamily,
            ClassStyleConfig.onboarding.titleFontSize,
            ClassStyleConfig.onboarding.titleUpper,
            ClassStyleConfig.onboarding.titleFontWeight
          )}
        >
          {title}
        </h1>
      )}
      {isCompanyGame && companyClientLogo && (
        <div
          className="w-[200px] h-[100px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url('` + companyClientLogo + `')` }}
        />
      )}
      {subtitle && (
        <h2 
          className={clsx(
            "font mt-4",
            ClassStyleConfig.base.textColor,
            ClassStyleConfig.onboarding.subtitleFontSize,
            ClassStyleConfig.onboarding.subtitleUpper,
            ClassStyleConfig.onboarding.subtitleFontWeight
          )}
        >
          {subtitle}
        </h2>
      )}

      {paragraph && !paragraphMobile && (
        <p className={clsx("font mt-2", ClassStyleConfig.base.textColor, ClassStyleConfig.onboarding.paragraphFontSize)}>
          {displayParagraph(paragraph)}
        </p>
      )}

      {paragraph && paragraphMobile && (
        <p className={clsx("font mt-2", ClassStyleConfig.base.textColor, ClassStyleConfig.onboarding.paragraphFontSize)}>
          <span className="hidden xl:inline">
            {displayParagraph(paragraph)}
          </span>

          <span className="inline xl:hidden">
            {displayParagraph(paragraph)}
          </span>
        </p>
      )}

      {!paragraph && paragraphMobile && (
        <p className={clsx("font inline xl:hidden", ClassStyleConfig.base.textColor, ClassStyleConfig.onboarding.paragraphFontSize)}>
          {displayParagraph(paragraph)}
        </p>
      )}

    </div>
  )
}

export default OnboardingHeader;
