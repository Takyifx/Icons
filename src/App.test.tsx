import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main navigation and service cards', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /mobile crane services/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /reliable crane services for every lift/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Heavy Load Lifting' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Equipment Installation' })).toBeInTheDocument();
  });

  it('toggles the mobile menu', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('validates the quick enquiry form', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /send enquiry via whatsapp/i }));

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a contact number/i)).toBeInTheDocument();
    expect(screen.getByText(/please tell us about your lifting requirement/i)).toBeInTheDocument();
  });

  it('opens the gallery image modal and closes it', async () => {
    const user = userEvent.setup();
    render(<App />);

    const galleryButton = screen.getByRole('button', { name: /construction lifting/i });
    await user.click(galleryButton);

    expect(screen.getAllByText('Construction Lifting').length).toBeGreaterThan(0);

    const closeButton = screen.getByRole('button', { name: /close image gallery/i });
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close image gallery/i })).not.toBeInTheDocument();
    });
  });

  it('uses the correct WhatsApp number and service-specific inquiry format', () => {
    render(<App />);

    expect(screen.getByText('+233 24 853 2224')).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: /request this service|request a crane/i });
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/233248532224'));
    });
  });

  it('supports keyboard navigation for gallery modal controls', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /construction lifting/i }));
    expect(screen.getByRole('button', { name: /next image/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close image gallery/i })).not.toBeInTheDocument();
    });
  });

  it('shows a no-js-safe fallback when images fail to load', () => {
    render(<App />);
    const serviceImage = screen.getByAltText('Heavy Load Lifting');
    fireEvent.error(serviceImage);
    expect(serviceImage.getAttribute('src')).toContain('crane-1');
  });
});
