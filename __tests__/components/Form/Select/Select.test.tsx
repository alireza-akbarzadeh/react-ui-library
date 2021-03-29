import { fireEvent, render } from '@testing-library/react';
import { Select } from 'lib';
import * as React from 'react';

const options = [
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'violet', label: 'Violet' },
];

describe('<Select />', () => {
  it('should render a labeled select', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <Select
        label="Super fantastic label"
        onChange={onChange}
        options={options.map(item => ({ ...item, 'data-testid': 'select-option' }))}
        transitional
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const select = container.querySelector('select');
    select && fireEvent.change(select, { target: { value: 'yellow' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('yellow');
  });
});
