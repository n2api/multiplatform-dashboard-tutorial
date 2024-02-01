import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  test('fetches campaign data and renders campaign names', async () => {
    // Mock the axios.get function to return a sample campaign data
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Campaign 1', status: 'Active' },
        { id: 2, name: 'Campaign 2', status: 'Paused' },
      ],
    });

    render(<Dashboard />);
    
    // Wait for the campaign data to be fetched and rendered
    await waitFor(() => {
      const campaign1Element = screen.getByText(/Campaign 1/i);
      const campaign2Element = screen.getByText(/Campaign 2/i);
      expect(campaign1Element).toBeInTheDocument();
      expect(campaign2Element).toBeInTheDocument();
    });
  });

  test('renders campaign status', async () => {
    // Mock the axios.get function to return a sample campaign data
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Campaign 1', status: 'Active' },
      ],
    });

    render(<Dashboard />);
    
    // Wait for the campaign data to be fetched and rendered
    await waitFor(() => {
      const campaignStatusElement = screen.getByText(/Active/i);
      expect(campaignStatusElement).toBeInTheDocument();
    });
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
