import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';


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