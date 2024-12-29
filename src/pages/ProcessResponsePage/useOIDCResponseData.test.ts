import useOIDCResponseData, {ResponseMode, ResponseType } from './useOIDCResponseData';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('useOIDCResponseData', () => {
  const testCases = [
    {
      name: 'No query or fragment params',
      location: { search: '', hash: '' },
      expected: {
        mode: null,
        responseType: null,
        code: null,
        id_token: null,
        access_token: null,
        params: null,
      },
    },
    {
      name: 'Query mode with code',
      location: { search: '?code=test_code', hash: '' },
      expected: {
        mode: ResponseMode.Query,
        responseType: ResponseType.Code,
        code: 'test_code',
        id_token: null,
        access_token: null,
        params: new URLSearchParams({ code: 'test_code' }),
      },
    },
    {
      name: 'Query mode with id_token',
      location: { search: '?id_token=test_token', hash: '' },
      expected: {
        mode: ResponseMode.Query,
        responseType: ResponseType.Implicit,
        code: null,
        id_token: 'test_token',
        access_token: null,
        params: new URLSearchParams({ id_token: 'test_token' }),
      },
    },
    {
      name: 'Fragment mode with code',
      location: { search: '', hash: '#code=test_code' },
      expected: {
        mode: ResponseMode.Fragment,
        responseType: ResponseType.Code,
        code: 'test_code',
        id_token: null,
        access_token: null,
        params: new URLSearchParams({ code: 'test_code' }),
      },
    },
    {
      name: 'Fragment mode with id_token',
      location: { search: '', hash: '#id_token=test_token' },
      expected: {
        mode: ResponseMode.Fragment,
        responseType: ResponseType.Implicit,
        code: null,
        id_token: 'test_token',
        access_token: null,
        params: new URLSearchParams({ id_token: 'test_token' }),
      },
    },
    {
      name: 'All parameters in query mode',
      location: {
        search: '?code=test_code&id_token=test_token&access_token=test_access_token',
        hash: '',
      },
      expected: {
        mode: ResponseMode.Query,
        responseType: ResponseType.Hybrid, // Since both code and id_token are present
        code: 'test_code',
        id_token: 'test_token',
        access_token: 'test_access_token',
        params: new URLSearchParams({
          code: 'test_code',
          id_token: 'test_token',
          access_token: 'test_access_token',
        }),
      },
    },
    {
      name: 'All parameters in fragment mode',
      location: {
        search: '',
        hash: '#code=test_code&id_token=test_token&access_token=test_access_token',
      },
      expected: {
        mode: ResponseMode.Fragment,
        responseType: ResponseType.Hybrid, // Since both code and id_token are present
        code: 'test_code',
        id_token: 'test_token',
        access_token: 'test_access_token',
        params: new URLSearchParams({
          code: 'test_code',
          id_token: 'test_token',
          access_token: 'test_access_token',
        }),
      },
    },
  ];

  testCases.forEach((testCase) => {
    it(`should handle ${testCase.name}`, () => {
      (useLocation as jest.Mock).mockReturnValue(testCase.location);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const result = useOIDCResponseData();
      expect(result).toEqual(testCase.expected);
    });
  });
});