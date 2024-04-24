import i18next from 'i18next';
import { Provider } from 'jotai';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { App } from './App';
import './styles/reset.css';
import './tailwind.css';
import '~/packages/common/I18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <I18nextProvider i18n={i18next}>
    <Provider>
      <App />
    </Provider>
  </I18nextProvider>,
);
