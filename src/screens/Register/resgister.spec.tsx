import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

import { Register } from '.';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe('Register Screen', () => {
  it('Should be open category modal when user click on button', async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');

    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
