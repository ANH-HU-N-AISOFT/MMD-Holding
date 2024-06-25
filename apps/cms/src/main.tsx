import 'dayjs/locale/vi';
import i18next from 'i18next';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'reactjs';
import '~/packages/common/I18n/i18n';
import { App } from './App';
import './styles/reset.css';
import './tailwind.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('Service worker registration successful:', registration);
      })
      .catch(error => {
        console.log('Service worker registration failed:', error);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider config={{ controlHeight: 42, borderRadius: 12, colorPrimary: '#C00027' }}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </ThemeProvider>,
);
