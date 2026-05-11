import { buildLegacyTheme } from 'sanity';

const props = {
  '--red-brand': '#C44536',
  '--bg-color': '#F5F1EB',
  '--bg-card': '#FDFAF6',
  '--text-dark': '#1A1A1A',
  '--text-mid': '#444444',
  '--white': '#FFFFFF',
  '--border': 'rgba(26, 26, 26, 0.15)',
};

export const redopsTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--text-dark'],
  '--white': props['--white'],

  '--gray': props['--text-mid'],
  '--gray-base': props['--text-mid'],

  '--component-bg': props['--bg-card'],
  '--component-text-color': props['--text-dark'],

  /* Brand */
  '--brand-primary': props['--red-brand'],

  /* Default button */
  '--default-button-color': props['--text-dark'],
  '--default-button-primary-color': props['--red-brand'],
  '--default-button-success-color': '#1F4ED8',
  '--default-button-warning-color': '#f4b400',
  '--default-button-danger-color': props['--red-brand'],

  /* State */
  '--state-info-color': '#1F4ED8',
  '--state-success-color': '#28c840',
  '--state-warning-color': '#ffbd2e',
  '--state-danger-color': props['--red-brand'],

  /* Navbar */
  '--main-navigation-color': props['--bg-color'],
  '--main-navigation-color--inverted': props['--text-dark'],

  '--focus-color': props['--red-brand'],
});
