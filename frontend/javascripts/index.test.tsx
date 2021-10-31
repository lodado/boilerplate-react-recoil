import CharacterCounter from '@Component/main';
import '@testing-library/jest-dom/';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import 'jest-styled-components';
import * as React from 'react';
import sum from './index';

/**
 * @jest-environment node
 */

describe('test index.js file', () => {
  it('sums a and b', () => {
    let result = sum(1, 2);
    expect(result).toBe(3);
    result = sum(3, 4);
    expect(result).toBe(7);
  });
});

describe('<Button />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <RecoilRoot>
        <CharacterCounter />
      </RecoilRoot>,
    );

    container.querySelector('.test');
    expect(container.textContent).toEqual('Echo:');
  });
});
