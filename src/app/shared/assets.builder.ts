import { API_VERSION, SERVER_URL } from './../../assets/paths';

const url = new RegExp(`${SERVER_URL}/`);

export function buildAssetsUrl(asset: string | undefined, options= { isProfileImage: true} ): string | undefined{
    // console.log('llamando buildAsset con: ', asset);
    if (!asset) {return undefined; }
    let profileImagePath = '';
    switch (options.isProfileImage) {
      case true:
        profileImagePath = 'profile-images/';
        break;
      default:
        break;
    }

    switch (url.test(asset)){
      case false:
        return `${SERVER_URL}/${profileImagePath}${asset}`;
      default:
        return asset;
    }
  }