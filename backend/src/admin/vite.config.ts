import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
  server:{
    allowedHosts: [
      'cms.marekus.eu'
    ]
  },   
  resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
