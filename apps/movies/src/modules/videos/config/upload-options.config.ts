import { VIDEO_FORMAT } from '@app/common';

export const UploadOptionsConfig: object = {
  allowed_formats: VIDEO_FORMAT,
  resource_type: 'video',
  return_delete_token: true,
  transformation: [
    {
      overlay: {
        url: 'https://res.cloudinary.com/dp2f96bxe/image/upload/v1701026590/5305154_fb_facebook_facebook_logo_icon_vwxaml.png',
      },
    },
    { width: 100, crop: 'scale' },
    { flags: 'layer_apply', gravity: 'south_east' },
    {
      overlay: {
        font_family: 'arial',
        font_size: 20,
        resource_type: 'subtitles',
        public_id: 'outdoors.vtt',
      },
    },
    { flags: 'layer_apply' },
  ],
};
