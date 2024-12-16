import { ViewId } from '../../../../constants/views/ViewId';
import OpacityAnimatedReactView from '../../../../core/_engine/reacts/views/OpacityAnimatedReactView';
import { TranslationKeyManager } from '../../../../managers/TranslationKeyManager';

export function TranslationKeyReactView() {
  return (
    <OpacityAnimatedReactView viewId={ ViewId.TRANSLATION_KEY } className="pointer-events-none">
      <div className="absolute top-1/2 left-1/2 font-semibold -translate-x-1/2 -translate-y-1/2 px-[2vw] py-[2vh] bg-white text-black rounded-xl max-w-full whitespace-pre-line break-all border-2">
        {TranslationKeyManager.CurrentKey}
      </div>
    </OpacityAnimatedReactView>
  );
}
