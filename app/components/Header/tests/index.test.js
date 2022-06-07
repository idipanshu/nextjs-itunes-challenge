import React from 'react';
import { renderProvider } from '@utils/testUtils';
import Header from '../index';

describe('<Header />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Header />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should have a page header', () => {
    const { getByTestId } = renderProvider(<Header />);
    expect(getByTestId('header-title').textContent).toEqual('Search What You Like');
  });
});
