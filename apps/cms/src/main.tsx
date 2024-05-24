import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import i18next from 'i18next';
import { Provider } from 'jotai';
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import '~/packages/common/I18n/i18n';
import { App } from './App';
import './styles/reset.css';
import './tailwind.css';
import 'dayjs/locale/vi';

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

// Antd dayjs
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.locale('vi');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ConfigProvider locale={viVN}>
    <I18nextProvider i18n={i18next}>
      <Provider>
        <App />
      </Provider>
    </I18nextProvider>
  </ConfigProvider>,
);
