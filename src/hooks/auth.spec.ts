import 'jest-fetch-mock';

import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';

jest.mock('expo-auth-session');
fetchMock.enableMocks();

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    //Primeiro, nós precisamos do Token. Então, vamos mockar a função de startAsync.
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    });

    //Agora que temos o Token, vamos mockar a requisição http dos dados de profile do usuário.
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: 'any_id',
        email: 'bruno@gmail.com',
        name: 'Bruno',
        photo: 'any_photo.png',
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(async () => await result.current.signInWithGoogle());
    await waitForNextUpdate();

    // Você até pode usar esse console.log para visualizar os dados.
    // console.log('USER PROFILE =>', result.current.user.email);

    expect(result.current.user.email).toBe('bruno@gmail.com');
  });
});
