import React from 'react';
import { fireEvent } from '@testing-library/react';
import AddCircle from '@material-ui/icons/AddCircle';
import { renderWithTheme } from '../../testUtils';
import PopupFormButton from './PopupFormButton';

const Form = () => <form />;

describe('PopupFormButton', () => {
  it('matches the snapshot', () => {
    const { container } = renderWithTheme(<PopupFormButton Form={Form} buttonText="Submit" />);
    expect(container).toMatchSnapshot();
  });

  it('should display a button with proper text conteact', () => {
    const { getByTestId } = renderWithTheme(<PopupFormButton Form={Form} buttonText="Submit" />);

    expect(getByTestId('popup-button')).toHaveTextContent('Submit');
  });

  it('renders an icon with an icon component passed in, and no button text', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <PopupFormButton Icon={AddCircle} Form={Form} />,
    );

    expect(getByTestId('icon-button')).toBeInTheDocument();
    expect(queryByTestId('popup-button')).toBeNull();
  });

  it('renders button text with button text passed in, and without an icon', () => {
    const { getByTestId } = renderWithTheme(
      <PopupFormButton buttonText="Test Title" Form={Form} />,
    );

    expect(getByTestId('popup-button')).toHaveTextContent('Test Title');
  });

  it('renders with no icon', () => {
    const { queryByTestId } = renderWithTheme(
      <PopupFormButton buttonText="Test Title" Form={Form} />,
    );

    expect(queryByTestId('icon-button')).toBeNull();
  });

  it('renders button text & an icon with both passed in', () => {
    const { getByTestId } = renderWithTheme(
      <PopupFormButton buttonText="Test Title" Form={Form} Icon={AddCircle} />,
    );

    expect(getByTestId('icon-in-button')).toBeInTheDocument();
    expect(getByTestId('popup-button')).toHaveTextContent('Test Title');
  });

  it('should display the popover when clicking the icon', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <PopupFormButton Icon={AddCircle} Form={Form} />,
    );

    const icon = getByTestId('icon-button');
    expect(queryByTestId('popover')).toBeNull();
    fireEvent.click(icon);
    expect(getByTestId('popover')).toBeInTheDocument();
  });

  it('should display the popover when clicking the button', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <PopupFormButton buttonText="Create" Form={Form} />,
    );

    const button = getByTestId('popup-button');
    expect(queryByTestId('popover')).toBeNull();
    fireEvent.click(button);
    expect(getByTestId('popover')).toBeInTheDocument();
  });
});
