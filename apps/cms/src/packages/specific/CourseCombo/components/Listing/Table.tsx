import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { CourseComboStatusMappingToColors } from '../../constants/CourseComboStatusMappingToColors';
import { CourseCombo } from '../../models/CourseCombo';
import { Collapsed } from '~/components/Collapsed/Collapsed';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';

import { getCourseStatusMappingToLabels } from '~/packages/specific/Course/constants/CourseStatusMappingToLabels';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';

export interface Props
  extends Pick<
    TableListingProps<CourseCombo>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: CourseCombo) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: CourseCombo) => void;
  onViewRoadMap?: (record: Required<CourseCombo>['courseRoadmap'][number]) => void;
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
  onViewRoadMap,
  deletable,
  editable,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'course_combo', 'course', 'course_roadmap']);

  const CourseComboStatusMappingToLabels = useMemo(() => {
    return getCourseStatusMappingToLabels(t as unknown as TFunction<['course']>);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<CourseCombo>[] = [
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
      width: 350,
      title: t('course_combo:name'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.name}</Typography.Link>;
      },
    },
    {
      width: 300,
      title: t('course_combo:course_roadmap'),
      render: (_, record) => {
        return (
          <ul className="grid grid-cols-1 gap-1 pl-3">
            <Collapsed
              className="-ml-3 pt-2"
              disabled={!record.courseRoadmap || record.courseRoadmap?.length <= 3}
              LessState={record.courseRoadmap?.slice(0, 3)?.map(item => {
                return (
                  <li key={item.id}>
                    <Typography.Link onClick={() => onViewRoadMap?.(item)}>
                      {item.name} ({item.code})
                    </Typography.Link>
                  </li>
                );
              })}
              MoreState={record.courseRoadmap?.map(item => {
                return (
                  <li key={item.id}>
                    <Typography.Link onClick={() => onViewRoadMap?.(item)}>
                      {item.name} ({item.code})
                    </Typography.Link>
                  </li>
                );
              })}
            />
          </ul>
        );
      },
    },
    {
      width: 140,
      title: t('course_combo:number_session_with_measure'),
      render: (_, record) => record.totalNumberSessions,
    },
    {
      width: 180,
      title: t('course_combo:fee_with_measure'),
      render: (_, record) => currencyFormatter(record.totalPrice),
    },
    {
      width: 110,
      title: t('course_combo:status'),
      render: (_, record) => {
        return (
          <Tag color={CourseComboStatusMappingToColors[record.status]}>
            {CourseComboStatusMappingToLabels[record.status]}
          </Tag>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('course_combo:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('course_combo:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('course_combo:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('course_combo:delete'),
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
      <TableListing<CourseCombo>
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
            textToHighlight={t('course_combo:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('course_combo:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
