import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App.ssr';

export function render(url) {
  const html = renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>
  );

  return html;
}
