import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  test('renders campaign data correctly', async () => {
    // Mock the axios.get function to return a sample campaign data
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: [
        { id: 1, name: 'Campaign 1', status: 'Active' },
        { id: 2, name: 'Campaign 2', status: 'Paused' },
      ],
    });

    render(<Dashboard />);

    // Assert that the campaign data is rendered correctly
    expect(await screen.findByText('Campaign 1')).toBeInTheDocument();
    expect(await screen.findByText('Active')).toBeInTheDocument();
    expect(await screen.findByText('Campaign 2')).toBeInTheDocument();
    expect(await screen.findByText('Paused')).toBeInTheDocument();
  });

  test('renders correctly when there is no campaign data', async () => {
    // Mock the axios.get function to return an empty campaign data
    jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

    render(<Dashboard />);

    // Assert that the component renders without campaign data
    expect(await screen.findByText('No campaigns found')).toBeInTheDocument();
  });

  test('handles errors during data fetching', async () => {
    // Mock the axios.get function to throw an error
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch data'));

    render(<Dashboard />);

    // Assert that the error message is rendered
    expect(await screen.findByText('Failed to fetch data')).toBeInTheDocument();
  });

  // Add additional test cases for edge cases or specific requirements

});
