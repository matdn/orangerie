import { getStoryblokApi } from "@storyblok/react/rsc";
import {updateSessionStorageConfig} from "../utils/app-config.session-storage.js";
import { CustomStoryblokConfig } from '../configs/custom-storyblok.config';
import { getLocalStoryblokConfigs } from './storyblok.helpers';

export async function fetchGameConfigData() {
  if (CustomStoryblokConfig.customStagingEnv || CustomStoryblokConfig.customProductionEnv) {
    const res = await getLocalStoryblokConfigs();
    updateSessionStorageConfig(res.data.story.content);
    return res;
  }

  return await getStoryblokApi().get(`cdn/stories/game-config`, { version: import.meta.env.VITE_STORYBLOK_VERSION }).then((res) => {
    updateSessionStorageConfig(res.data.story.content);
    return res;
  }).catch((err) => {
    console.log(err);
  });
}
