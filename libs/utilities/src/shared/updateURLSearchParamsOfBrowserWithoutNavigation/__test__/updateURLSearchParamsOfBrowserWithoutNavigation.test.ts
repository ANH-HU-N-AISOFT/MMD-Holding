import { updateURLSearchParamsOfBrowserWithoutNavigation } from '../src/updateURLSearchParamsOfBrowserWithoutNavigation';

describe('updateURLSearchParamsOfBrowserWithoutNavigation', () => {
  // Mocking window.location and window.history
  const mockWindow = {
    location: {
      pathname: '/test-path',
    },
    history: {
      replaceState: jest.fn(),
    },
  };

  beforeAll(() => {
    Object.defineProperty(global, 'window', { value: mockWindow });
  });

  it('updates URL search parameters without triggering navigation', () => {
    // Define initial search parameters
    const initialSearchParams = new URLSearchParams('param1=value1&param2=value2');

    // Update search parameters
    updateURLSearchParamsOfBrowserWithoutNavigation(initialSearchParams);

    // Expected new URL
    const expectedUrl = '/test-path?param1=value1&param2=value2';

    // Verify if history.replaceState is called with expected parameters
    expect(mockWindow.history.replaceState).toHaveBeenCalledWith(null, '', expectedUrl);
  });

  it('handles string representation of search parameters', () => {
    // Define search parameters as string
    const searchParamsString = 'param1=value1&param2=value2';

    // Update search parameters
    updateURLSearchParamsOfBrowserWithoutNavigation(searchParamsString);

    // Expected new URL
    const expectedUrl = '/test-path?param1=value1&param2=value2';

    // Verify if history.replaceState is called with expected parameters
    expect(mockWindow.history.replaceState).toHaveBeenCalledWith(null, '', expectedUrl);
  });

  it('handles empty search parameters', () => {
    // Update with empty search parameters
    updateURLSearchParamsOfBrowserWithoutNavigation('');

    // Expected new URL (without any query string)
    const expectedUrl = '/test-path';

    // Verify if history.replaceState is called with expected parameters
    expect(mockWindow.history.replaceState).toHaveBeenCalledWith(null, '', expectedUrl);
  });

  it('handles URLSearchParams object with no parameters', () => {
    // Update with empty URLSearchParams object
    updateURLSearchParamsOfBrowserWithoutNavigation(new URLSearchParams());

    // Expected new URL (without any query string)
    const expectedUrl = '/test-path';

    // Verify if history.replaceState is called with expected parameters
    expect(mockWindow.history.replaceState).toHaveBeenCalledWith(null, '', expectedUrl);
  });
});
