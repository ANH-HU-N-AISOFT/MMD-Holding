// This file should be used to export ONLY server-code from the library.
import { LoaderFunction } from '@remix-run/node';
import { fetchResolver, fsResolver, imageLoader, LoaderConfig, Resolver } from 'remix-image/server';
// import { sharpTransformer } from 'remix-image-sharp';

const fetchImage: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith('/') && (url.length === 1 || url[1] !== '/')) {
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
  }
};

export const createLoader =
  ({ selfUrl }: Pick<Required<LoaderConfig>, 'selfUrl'>): LoaderFunction =>
  ({ request }) => {
    const resolvedConfig: LoaderConfig = {
      /** Domain cho api image */
      selfUrl,
      resolver: fetchImage,
      // FIXME: "Something went wrong installing the "sharp" module"
      // transformer: sharpTransformer,
    };
    return imageLoader(resolvedConfig, request);
  };
