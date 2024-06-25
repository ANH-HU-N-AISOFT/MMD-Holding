import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';
import { useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Button, Tag, Typography } from 'reactjs';
import { TableActions } from 'reactjs';
import { CourseRoadmapStatusMappingToColors } from '../../constants/CourseRoadmapStatusMappingToColors';
import { CourseRoadmap } from '../../models/CourseRoadmap';
import { ListingColumnType, TableListing, TableListingProps } from '~/components/Listing';
import { SickyAction } from '~/components/StickyAction';
import { getCourseStatusMappingToLabels } from '~/packages/specific/Course/constants/CourseStatusMappingToLabels';
import { currencyFormatter } from '~/utils/functions/currency/currencyFormatter';

export interface Props
  extends Pick<
    TableListingProps<CourseRoadmap>,
    'currentPage' | 'pageSize' | 'totalRecords' | 'dataSource' | 'onChange' | 'loading' | 'paginationMode'
  > {
  editable?: boolean;
  deletable?: boolean;
  onEdit?: (record: CourseRoadmap) => void;
  onDelete?: (recordKeys: string) => void;
  onDeleteMany?: (recordKeys: string[]) => void;
  onView?: (record: CourseRoadmap) => void;
  onViewCourse?: (record: CourseRoadmap) => void;
  hideColumnCourse?: boolean;
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
  onViewCourse,
  deletable,
  editable,
  hideColumnCourse = false,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'course_roadmap', 'course']);

  const CourseRoadmapStatusMappingToLabels = useMemo(() => {
    return getCourseStatusMappingToLabels(t as unknown as TFunction<['course']>);
  }, [t]);

  const [selectedRows, _setSelectedRows] = useState<string[]>([]);

  // const isCheckedAll = useMemo(() => {
  //   return dataSource.every(item => !!selectedRows.find(selectedRow => item.id === selectedRow));
  // }, [dataSource, selectedRows]);

  const columns: ListingColumnType<CourseRoadmap>[] = [
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
      title: t('course_roadmap:name'),
      render: (_, record) => {
        return <Typography.Link onClick={() => onView?.(record)}>{record.name}</Typography.Link>;
      },
    },
    {
      width: 200,
      title: t('course_roadmap:course'),
      hidden: hideColumnCourse,
      render: (_, record) => {
        if (onViewCourse) {
          return <Typography.Link onClick={() => onViewCourse?.(record)}>{record.course?.name}</Typography.Link>;
        }
        return record.course?.name;
      },
    },
    {
      width: 160,
      title: t('course_roadmap:number_session_with_measure'),
      render: (_, record) => record.numberSessions,
    },
    {
      width: 160,
      title: t('course_roadmap:fee_with_measure'),
      render: (_, record) => currencyFormatter(record.price),
    },
    {
      width: 110,
      title: t('course_roadmap:status'),
      render: (_, record) => {
        return (
          <Tag color={CourseRoadmapStatusMappingToColors[record.status]}>
            {CourseRoadmapStatusMappingToLabels[record.status]}
          </Tag>
        );
      },
    },
    {
      width: 80,
      align: 'center',
      fixed: 'right',
      title: t('course_roadmap:action'),
      render: (_, record) => {
        return (
          <TableActions
            items={[
              {
                key: '1',
                label: t('course_roadmap:edit'),
                icon: <EditOutlined />,
                onClick: () => onEdit?.(record),
                hidden: !editable,
              },
              {
                key: '2',
                label: t('course_roadmap:view'),
                icon: <EyeOutlined />,
                onClick: () => onView?.(record),
              },
              {
                key: '3',
                label: t('course_roadmap:delete'),
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
      <TableListing<CourseRoadmap>
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
            textToHighlight={t('course_roadmap:total_records_selected', {
              total: selectedRows.length,
            })}
            searchWords={[selectedRows.length.toString()]}
            highlightClassName="bg-transparent font-semibold"
          />
          <Button color="error" ghost onClick={() => onDeleteMany?.(selectedRows)}>
            {t('course_roadmap:delete')}
          </Button>
        </div>
      </SickyAction>
    </>
  );
};
