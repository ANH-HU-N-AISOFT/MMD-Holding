import { EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox } from 'antd';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { ListingColumnType, TableListing, TableListingProps } from 'reactjs';
import { CustomerManagement } from '../../models/CustomerManagement';
import { SickyAction } from '~/components/StickyAction';
import { TableActions } from '~/components/TableActions/TableActions';

export interface Props
  extends Pick<
    TableListingProps<CustomerManagement>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading'
  > {
  onEdit?: (record: CustomerManagement) => void;
  onChangePassword?: (record: CustomerManagement) => void;
  onDelete?: (recordKeys: string[]) => void;
}

export const Listing = ({
  currentPage,
  pageSize,
  totalRecords,
  dataSource = [],
  onChange,
  onChangePassword,
  onEdit,
  onDelete,
}: Props) => {
  const { t } = useTranslation(['common', 'customer_management']);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const isCheckedAll = useMemo(() => {
    return dataSource.every(item => !!selectedRows.find(selectedRow => item._id === selectedRow));
  }, [dataSource, selectedRows]);

  const columns: ListingColumnType<CustomerManagement>[] = [
    {
      width: 70,
      title: (
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isCheckedAll}
            onChange={event => {
              const checked = event.target.checked;
              setSelectedRows(() => {
                if (checked) {
                  return dataSource.map(item => item._id);
                }
                return [];
              });
            }}
          />
          #
        </div>
      ),
      render: (_, record, index) => {
        return (
          <div className="flex items-center gap-3">
            <Checkbox
              checked={selectedRows.includes(record._id)}
              onChange={event => {
                const checked = event.target.checked;
                setSelectedRows(state => {
                  if (checked) {
                    return state.concat(record._id);
                  }
                  return state.filter(item => item !== record._id);
                });
              }}
            />{' '}
            {index + 1}
          </div>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      title: t('customer_management:avatar'),
      render: () => {
        return <Avatar src="/assets/images/avatar.png" size="large" icon={<UserOutlined />} />;
      },
    },
    {
      width: 180,
      title: t('customer_management:account_name'),
      render: (_, record) => {
        return <div>{record.tenTaiKhoan}</div>;
      },
    },
    {
      width: 180,
      title: t('customer_management:full_name'),
      render: (_, record) => {
        return <div>{record.hoVaTen}</div>;
      },
    },
    {
      width: 200,
      title: t('customer_management:department'),
      render: (_, record) => {
        return <div>{record.donVi}</div>;
      },
    },
    {
      width: 220,
      title: t('customer_management:email'),
      render: (_, record) => {
        return <div>{record.email}</div>;
      },
    },
    {
      width: 160,
      title: t('customer_management:phone'),
      render: (_, record) => {
        return <div>{record.sdt}</div>;
      },
    },
    {
      width: 120,
      align: 'center',
      title: t('customer_management:status'),
      render: (_, record) => {
        return <div>{record.trangThai}</div>;
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('customer_management:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('customer_management:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
              },
              {
                key: '2',
                label: t('customer_management:change_password'),
                icon: <LockOutlined />,
                onClick: () => onChangePassword?.(record),
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <TableListing<CustomerManagement>
        dataSource={dataSource}
        columns={columns}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        rowKey={record => record._id}
        tableLayout="fixed"
        paginationMode="sticky"
        plural={({ from, to }) => {
          return t('common:showing_range_results', {
            from,
            to,
            total: totalRecords,
          });
        }}
        onChange={onChange}
        singular={({ from, to }) => {
          return t('common:showing_range_result', {
            from,
            to,
            total: totalRecords,
          });
        }}
      />
      <SickyAction isVisible={!!selectedRows.length}>
        <div className="min-w-[400px] flex items-center justify-between">
          <Highlighter
            textToHighlight={t('customer_management:total_records_selected', { total: selectedRows.length })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button danger onClick={() => onDelete?.(selectedRows)}>
            {t('customer_management:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
