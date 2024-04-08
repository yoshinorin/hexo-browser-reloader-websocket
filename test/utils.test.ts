import Hexo from 'hexo';
import { expect, test } from 'vitest';
import { isServerMode } from '../src/utils';

test('isServerMode should return true', () => {
  const h = new Hexo();

  h.env.cmd = 'server';
  expect(isServerMode(h)).toBeTruthy();

  h.env.cmd = 's';
  expect(isServerMode(h)).toBeTruthy();
});

test('isServerMode should return false', () => {
  const h = new Hexo();

  h.env.cmd = 'generate';
  expect(isServerMode(h)).toBeFalsy();

  h.env.cmd = 'g';
  expect(isServerMode(h)).toBeFalsy();
});
