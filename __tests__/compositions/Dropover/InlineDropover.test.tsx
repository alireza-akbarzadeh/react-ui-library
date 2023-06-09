import React from 'react';
import { InlineDropover, DropoverLabel, DropoverContent } from 'lib';
import { fireEvent, render } from '../../utils';

describe('<InlineDropover />', () => {
  it('should render an inline dropover', () => {
    const { getByText } = render(
      <InlineDropover label={<DropoverLabel>Super fantastic label</DropoverLabel>}>
        <DropoverContent>Hello world</DropoverContent>
      </InlineDropover>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onOpen = jest.fn();

    const { getByTestId, getByText } = render(
      <InlineDropover label={<DropoverLabel data-testid="button">Super fantastic label</DropoverLabel>} onOpen={onOpen}>
        <DropoverContent>Hello world</DropoverContent>
      </InlineDropover>,
    );

    const button = getByTestId('button');
    fireEvent.click(button);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
