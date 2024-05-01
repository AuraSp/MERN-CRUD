import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ViewStudentV2 from './components/v2/ViewPeople/ViewStudentV2';


it('renders App component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('App', () => {
  it('navigates to students page when handleToggle is called', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole('button', { name: 'Go to v1' }));

    expect(navigate).toHaveBeenCalledWith('/v1/students');
  });
});


global.fetch = jest.fn();

test('should fetch users', async () => {
  const mockUsers = [{ name: 'Bob' }, { name: 'Alice' }];
  const response = { data: { students: mockUsers } };

  fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response)
  });


  render(
    <MemoryRouter>
      <ViewStudentV2 />
    </MemoryRouter>
  );


  await waitFor(() => {
    expect(screen.queryByText('Loading...')).toBeNull();

    mockUsers.forEach(async user => {
      await waitFor(() => {
        expect(screen.getByText(user.name)).toBeInTheDocument();
      });
    });
  });
});
