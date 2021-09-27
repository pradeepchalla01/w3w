import axios from 'axios';
import CardList from './index';
import { LABEL, ERROR, API_ERROR } from "../../config/constants";
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';

jest.mock('axios');
describe("CardList", () => {
  test('should load component with list of users', async () => {
    const users = [{ name: 'Bob', id: 1 }, { name: 'Tom', id: 2 }];
    const resp = { data: users };
    const handleChange = jest.fn();
    axios.get.mockImplementation(() => Promise.resolve(resp))

    await act(async () => render(<CardList
      label={LABEL}
      handleChange={handleChange}
      selectedUserId={0}
      error={ERROR}
    />));

    await render();
    await waitFor(() => {
      expect(screen.getByText(LABEL)).toBeInTheDocument();
      expect(screen.getByText(/Bob/i)).toBeInTheDocument();
      expect(screen.getByText(/Tom/i)).toBeInTheDocument();
      expect(screen.getByText(ERROR)).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Bob/i));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  test('should load component with api error', async () => {
    axios.get.mockImplementation(() => Promise.reject({}))

    await act(async () => render(<CardList
      label={LABEL}
      error={ERROR}
      selectedUserId={-1}
      validationFunction={jest.fn()}
      setErrorMessage={jest.fn()}
    />));

    await render();
    expect(screen.getByText(API_ERROR)).toBeInTheDocument();
  });
});
