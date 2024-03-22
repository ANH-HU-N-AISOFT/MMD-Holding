import { Course } from '../../models/Course';

interface Props {
  pageSize?: number;
  currentPage?: number;
  totalRecords: number;
  data: Course[];
  isLoading: boolean;
  onView: (record: Course) => void;
  onEdit: (record: Course) => void;
  onDelete: (record: Course) => void;
  onChange: (page: number, pageSize: number) => void;
}

export const Listing = ({ data }: Props) => {
  return (
    <div>
      <div>Listing course</div>
      <ul>
        {data.map(item => (
          <li key={item._id}>- Course: {item._id.toString()}</li>
        ))}
      </ul>
    </div>
  );
};
