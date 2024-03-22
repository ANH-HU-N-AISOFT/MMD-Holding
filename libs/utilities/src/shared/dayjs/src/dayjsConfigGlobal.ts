import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import { isBrowser } from '../../isBrowser';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);

/**
 * Extends the functionality of the Day.js library and provides an overridden method for client-side usage.
 *
 * @param {dayjs.ConfigType} input - The date, string, or timestamp to be parsed or manipulated.
 * @param {dayjs.OptionType} format - The format of the input, if applicable.
 * @param {string} locale - The locale to be used for formatting.
 * @param {boolean} strict - Whether to perform strict parsing.
 * @returns {dayjs.Dayjs} - A Day.js object representing the parsed or manipulated date.
 * @throws {Error} Throws an error if used on the server side, providing a warning about potential issues related to timezone offsets.
 *
 * @example
 * const result = dayjsOverride('2024-03-07', 'YYYY-MM-DD');
 * console.log(result.format('MMMM DD, YYYY')); // Outputs: "March 07, 2024"
 */
const dayjsOverride = (
  input?: dayjs.ConfigType,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
): dayjs.Dayjs => {
  if (!isBrowser()) {
    throw new Error(`⚠️ Warning: Using Day.js on the server side may lead to issues related to timezone offsets. Servers typically deal with timestamps and forward them to other services. Mutating or altering date objects with Day.js in a server environment can result in unexpected behavior.

    For server-side operations, consider using libraries that are specifically designed for server environments and timestamp handling. Day.js is best suited for client-side tasks where timezone-related issues are typically less problematic.

    Always ensure that you handle date and time operations in a way that aligns with your server's requirements and avoids unnecessary mutations or alterations of date objects.

    If you are working in a server environment, it's recommended to use server-friendly libraries for date and time handling to prevent unintended complications.
    `);
  }

  return dayjs.apply(this, [input, format, locale, strict]);
};

export type { ConfigType } from 'dayjs';
export { Dayjs, dayjsOverride as dayjs };
