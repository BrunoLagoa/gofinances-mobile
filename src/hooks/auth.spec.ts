import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';

import { AuthProvider, useAuth } from './auth';

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png',
};

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => ({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    }),
  };
});

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(userTest.email);
  });

  it('user should not connect if cancel authentication with Google', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.id).toEqual('any_id');
  });

  it('should be error with incorrectly Google parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user.id).toThrowError;
    }
  });
});
