import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, TableActions, Tag, Typography } from 'reactjs';
import { dayjs } from 'utilities';
import { DocumentTemplateStatusMappingToColors } from '../../constants/DocumentTemplateStatusMappingToColors';
import { getDocumentTemplateStatusMappingToLabels } from '../../constants/DocumentTemplateStatusMappingToLabels';
import { getDocumentTemplateTypeMappingToLabels } from '../../constants/DocumentTemplateTypeMappingToLabels';
import { DocumentTemplate } from '../../models/DocumentTemplate';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';

export interface Props
  extends Pick<
    TableListingProps<DocumentTemplate>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  onEdit?: (record: DocumentTemplate) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: DocumentTemplate) => void;
  editable?: boolean;
  deletable?: boolean;
}

export const Table = ({
  currentPage,
  pageSize,
  totalRecords,
  dataSource = [],
  onChange,
  onEdit,
  onDelete,
  onDeleteMany,
  onView,
  deletable,
  editable,
  ...props
}: Props) => {
  const { t } = useTranslation(['document_template', 'common']);

  const DocumentTemplateStatusMappingToLabels = useMemo(() => {
    return getDocumentTemplateStatusMappingToLabels(t);
  }, [t]);
  const DocumentTemplateTypeMappingToLabels = useMemo(() => {
    return getDocumentTemplateTypeMappingToLabels(t);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<DocumentTemplate>[] = [
    // {
    //   width: 70,
    //   title: (
    //     <div className="flex items-center gap-3">
    //       <Checkbox
    //         checked={isCheckedAll}
    //         onChange={event => {
    //           const checked = event.target.checked;
    //           setSelectedRows(() => {
    //             if (checked) {
    //               return dataSource.map(item => item.id);
    //             }
    //             return [];
    //           });
    //         }}
    //       />
    //       #
    //     </div>
    //   ),
    //   render: (_, _record, index) => {
    //     return (
    //       <div className="flex items-center gap-3">
    //         <Checkbox
    //           checked={selectedRows.includes(record.id)}
    //           onChange={event => {
    //             const checked = event.target.checked;
    //             setSelectedRows(state => {
    //               if (checked) {
    //                 return state.concat(record.id);
    //               }
    //               return state.filter(item => item !== record.id);
    //             });
    //           }}
    //         />
    //         {index + 1}
    //       </div>
    //     );
    //   },
    // },
    {
      width: 54,
      align: 'center',
      title: '#',
      render: (_, __, index) => pageSize * (currentPage - 1) + index + 1,
    },
    {
      width: 280,
      title: t('document_template:name'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.name}</Typography.Link>;
      },
    },
    {
      width: 320,
      title: t('document_template:description'),
      render: (_, record) => {
        return <div className="description-3-lines">{record.description}</div>;
      },
    },
    {
      width: 220,
      title: t('document_template:document_template_type'),
      render: (_, record) => {
        return DocumentTemplateTypeMappingToLabels[record.type];
      },
    },
    {
      width: 200,
      title: t('document_template:created_at'),
      render: (_, record) => {
        return record.createdAt ? dayjs(record.createdAt).format('DD/MM/YYYY') : null;
      },
    },
    {
      width: 160,
      title: t('document_template:status'),
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Tag color={DocumentTemplateStatusMappingToColors[record.status]}>
            {DocumentTemplateStatusMappingToLabels[record.status]}
          </Tag>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('document_template:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('document_template:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('document_template:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('document_template:delete'),
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => onDelete?.(record.id),
                hidden: !deletable,
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <TableListing<DocumentTemplate>
        {...props}
        dataSource={dataSource}
        columns={columns}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        rowKey={record => record.id}
        tableLayout="fixed"
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
        <div className="flex min-w-[400px] items-center justify-between">
          <Highlighter
            textToHighlight={t('document_template:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('document_template:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
