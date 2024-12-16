import { CommonAssetsManager } from "@cooker/common";
import { memo, useEffect, useState } from "react";
import OpacityAnimatedReactView from "../../_engine/reacts/views/OpacityAnimatedReactView";
import SoundComponent from "./SoundComponent";
import { SoundsTester } from "./SoundsTester";

const SoundsTesterReactView = memo(() => {

    const [ids, setIds] = useState<string[]>([]);

    useEffect(() => {
        const onChangeSoundsTester = () => {
            setIds([...SoundsTester.SoundIdsList]);
        }
        onChangeSoundsTester();
        SoundsTester.OnChange.add(onChangeSoundsTester);
        return () => {
            SoundsTester.OnChange.remove(onChangeSoundsTester);
        }
    }, []);

    const tab = [];
    for (let id of ids) {
        const sound = CommonAssetsManager.GetSound(id)!;
        const sprites = sound.getSprites();
        for (const key in sprites) {
            tab.push(<SoundComponent soundId={id} sprite={key} key={`${id}-${key}`} />)
        }
    }

    // console.log('render');
    return (
        <OpacityAnimatedReactView className="soundTesterReactView" viewId={SoundsTester.VIEW_ID}>
            <div className="title">
                Sound Tester
            </div>
            <div className="soundsContainer">
                {tab}
            </div>
        </OpacityAnimatedReactView>
    )
});

export default SoundsTesterReactView;