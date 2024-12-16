import { storyblokInit, apiPlugin } from "@storyblok/react";
import { CustomStoryblokConfig } from '../configs/custom-storyblok.config';
import { getAssetUrl } from './common.helpers';

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {

  },
  apiOptions: {
    region: ''
  }
});

export async function getLocalStoryblokConfigs() {
  if (CustomStoryblokConfig.customStagingEnv && import.meta.env.VITE_NODE_ENV === 'staging' || import.meta.env.VITE_NODE_ENV === 'local') {
    return (await fetch(getAssetUrl('/jsons/storyblok-configs/storyblok.staging.json'))).json();
  }

  if (CustomStoryblokConfig.customStagingEnv && import.meta.env.VITE_NODE_ENV === 'production') {
    return (await fetch(getAssetUrl('/jsons/storyblok-configs/storyblok.prod.json'))).json();
  }
}
