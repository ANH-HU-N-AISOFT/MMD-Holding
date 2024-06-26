import { Empty, Table, TableProps } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { AnyRecord } from 'typescript-utilities';
import { pluralize } from 'utilities';
import './styles.css';

type AntColumnType<RecordType extends Record<string, any>> =
  | (ColumnGroupType<RecordType> & {
      dataIndex: undefined;
      render: () => ReactNode;
    })
  | ColumnType<RecordType>;
export type ListingColumnType<RecordType extends Record<string, any>> = Omit<AntColumnType<RecordType>, 'width'> & {
  width: number | 'auto';
};

export interface TableListingProps<RecordType extends AnyRecord>
  extends Omit<
    TableProps<RecordType>,
    'pagination' | 'currentPage' | 'pageSize' | 'totalRecords' | 'onChange' | 'columns'
  > {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  onChange?: (page: number, pageSize: number) => void;
  plural: (params: { from: number; to: number }) => string;
  singular: (params: { from: number; to: number }) => string;
  paginationMode?: 'sticky' | 'none';
  columns?: Array<ListingColumnType<RecordType> & { hidden?: boolean }>;
  nonePagination?: boolean;
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
  columns = [],
  scroll,
  nonePagination,
  ...props
}: TableListingProps<RecordType>): ReactNode => {
  const { t } = useTranslation(['components']);
  const from = Math.max((currentPage - 1) * pageSize, 0) + 1;
  const to = Math.min(currentPage * pageSize, totalRecords);

  const columns_ = useMemo(() => {
    return columns.filter(item => !item.hidden);
  }, [columns]);

  return (
    <Table
      {...props}
      tableLayout="auto"
      locale={{ emptyText: () => <Empty description={t('components:Listing.Table.empty')} /> }}
      columns={columns_}
      className={classNames(
        'TableListing__container',
        paginationMode === 'sticky' ? 'TableListing--paginationSticky flex-1' : 'TableListing--paginationNone',
        props.className,
      )}
      scroll={
        scroll
          ? scroll
          : {
              x: columns_.reduce<number>((result, item) => {
                if (typeof item.width === 'number') {
                  return result + item.width;
                }
                return result;
              }, 0),
            }
      }
      bordered={bordered}
      pagination={
        nonePagination
          ? false
          : {
              showLessItems: true,
              showSizeChanger: false,
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
            }
      }
    />
  );
};
