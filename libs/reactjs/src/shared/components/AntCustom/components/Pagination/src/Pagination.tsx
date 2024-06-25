import { Pagination as AntPagination, PaginationProps as AntPaginationProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import './styles.css';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<AntPaginationProps, 'className' | 'pageSize' | 'onChange' | 'showSizeChanger' | 'disabled'> {
  /** Custom page size options for the pagination. */
  pageSizeOptions?: number[];
  /** Custom text to display for page size. */
  pageSizeText?: string;
  /** The current page number. */
  currentPage: number;
  /** The number of items per page. */
  pageSize: number;
  /** The total number of items. */
  total: number;
}

/**
 * Pagination component that extends the functionality of the Ant Design Pagination component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Pagination component.
 * @param {string} [props.className] - Custom CSS class for styling the pagination component.
 * @param {number} props.currentPage - The current page number.
 * @param {boolean} [props.disabled] - Whether the pagination is disabled.
 * @param {Function} [props.onChange] - Callback function triggered when the page or page size changes.
 * @param {number} props.pageSize - The number of items per page.
 * @param {number[]} [props.pageSizeOptions=[]] - Custom page size options for the pagination.
 * @param {string} [props.pageSizeText='/ page'] - Custom text to display for page size.
 * @param {boolean} [props.showSizeChanger=false] - Whether to show the size changer in pagination.
 * @param {number} props.total - The total number of items.
 * @returns {ReactNode} The rendered Pagination component.
 */
export const Pagination: FC<Props> = ({
  className,
  currentPage,
  disabled,
  onChange,
  pageSize,
  pageSizeOptions = [],
  pageSizeText = '/ page',
  showSizeChanger = false,
  total,
}) => {
  useInitializeContext();
  return (
    <AntPagination
      className={classNames('Pagination__container', className)}
      current={currentPage}
      disabled={disabled}
      onChange={onChange}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      showLessItems
      showQuickJumper={false}
      showSizeChanger={showSizeChanger}
      total={total}
      locale={{ items_per_page: pageSizeText }}
    />
  );
};
