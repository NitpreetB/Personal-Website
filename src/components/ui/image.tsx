import { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Plain <img> wrapper. Keeps the same call sites as the old Wix media
 * component (src/alt/width/className) with lazy loading by default.
 */
export function Image({ loading = 'lazy', ...props }: ImageProps) {
  return <img loading={loading} {...props} />;
}

export default Image;
