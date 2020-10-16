import { API_VERSION, SERVER_URL } from './../../assets/paths';

const url = new RegExp(`${SERVER_URL}/`);

export function buildAssetsUrl(asset: string | undefined ): string | undefined{
    console.log('llamando buildAsset con: ', asset);
    if (!asset) {return undefined; }
    switch (url.test(asset)){
      case false:
        return `${SERVER_URL}/${asset}`;
      default:
        return asset;
    }
  }