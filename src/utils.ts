import type Hexo from 'hexo';

export const isServerMode = (hexo: Hexo): boolean => {
  return hexo.env.cmd.toLowerCase() === 'server' || hexo.env.cmd.toLowerCase() === 's';
};
