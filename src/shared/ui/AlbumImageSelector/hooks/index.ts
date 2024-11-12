import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Album, Asset } from 'expo-media-library';

export const useGetAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getAlbums = async () => {
    if (permissionResponse?.status !== 'granted') {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        console.warn('Permission to access media library was denied');
        return;
      }
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    // FIXME: 현재는 앨범에서 '최근 항목' 앨범만 가져오도록 구현
    setAlbums(fetchedAlbums.filter((albumInfo) => albumInfo.title === 'Recents'));
  };

  useEffect(() => {
    getAlbums()
      .then(() => console.log('Albums fetched successfully'))
      .catch((error) => console.error('Error fetching albums:', error));
  }, [permissionResponse]);

  return albums;
};

export const useGetAlbumAssets = (album: Album) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const getAlbumAssets = async () => {
    try {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      const assetsWithLocalUri = await Promise.all(
        albumAssets.assets.map(async (asset) => {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
          return { ...asset, uri: assetInfo.localUri || asset.uri };
        }),
      );
      setAssets(assetsWithLocalUri);
    } catch (error) {
      console.error('Error fetching album assets:', error);
    }
  };

  useEffect(() => {
    if (album) {
      getAlbumAssets()
        .then(() => console.log('Album assets fetched successfully'))
        .catch((error) => console.error('Error in useEffect:', error));
    }
  }, [album]);

  return assets;
};
