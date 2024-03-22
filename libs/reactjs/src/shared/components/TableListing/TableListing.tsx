import { Table, TableProps } from 'antd';
import classNames from 'classnames';
import { ReactNode } from 'react';
import Highlighter from 'react-highlight-words';
import { AnyRecord } from 'typescript-utilities';
import { pluralize } from 'utilities';
import './styles.css';

export interface TableListingProps<RecordType extends AnyRecord>
  extends Omit<TableProps<RecordType>, 'pagination' | 'currentPage' | 'pageSize' | 'totalRecords' | 'onChange'> {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  onChange?: (page: number, pageSize: number) => void;
  plural: (params: { from: number; to: number }) => string;
  singular: (params: { from: number; to: number }) => string;
  paginationMode?: 'sticky' | 'none';
}

export const TableListing = <RecordType extends AnyRecord>({
  currentPage,
  pageSize,
  totalRecords,
  bordered = true,
  onChange,
  plural = (): string => '',
  singular = (): string => '',
  paginationMode = 'sticky',
  ...props
}: TableListingProps<RecordType>): ReactNode => {
  const from = Math.max((currentPage - 1) * pageSize, 0) + 1;
  const to = Math.min(currentPage * pageSize, totalRecords);

  return (
    <Table
      {...props}
      className={classNames(
        'TableListing__container',
        paginationMode === 'sticky' ? 'TableListing--paginationSticky flex-1' : 'TableListing--paginationNone',
        props.className,
      )}
      bordered={bordered}
      pagination={{
        showLessItems: true,
        total: totalRecords,
        current: currentPage,
        pageSize,
        onChange,
        showTotal: total => {
          if (!total) {
            return null;
          }
          return (
            <Highlighter
              className="text-sm font-medium text-neutral-500"
              highlightClassName="text-neutral-700 bg-transparent"
              searchWords={[/\d+/g]}
              textToHighlight={pluralize({
                count: totalRecords,
                singular: singular({ from, to }),
                plural: plural({ from, to }),
              })}
            />
          );
        },
      }}
    />
  );
};
