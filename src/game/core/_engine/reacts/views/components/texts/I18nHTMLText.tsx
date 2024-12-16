import { HTMLAttributes } from 'react';
import { TranslationKeyManager } from '../../../../../../managers/TranslationKeyManager.ts';
import { useTranslation } from 'react-i18next';


export interface I18nHTMLTextProps extends HTMLAttributes<Element> {
    textId: string;
    tagName?: keyof JSX.IntrinsicElements;
    defaultText?: string;
}

export default function I18nHTMLText({ textId, tagName = 'span', defaultText, ...props }: I18nHTMLTextProps) {
    const Wrapper = tagName;

    const { t } = useTranslation();

    return (
      <Wrapper
        { ...props }
        onMouseEnter={ () => TranslationKeyManager.ShowTranslationKey(textId) }
        onMouseLeave={ () => TranslationKeyManager.HideTranslationKey() }
        dangerouslySetInnerHTML={ { __html: t(textId, defaultText) } }
      ></Wrapper>
    );
}
