import { IDetailedItem } from '../../types';
import { Button } from '@mui/material';

interface Props {
  item: IDetailedItem | null;
  user: string | null;
  deleteItem: (id: string) => void;
}

const DeletedBtn: React.FC<Props> = ({ item, user, deleteItem }) => {

  if (!item || !user) {
    return null;
  }

  if (!item.user || !item.user._id) {
    return null;
  }

  if (user === item.user._id) {
    return (
      <div>
        <Button
          onClick={() => deleteItem(item._id)}
          className="btn btn-danger"
        >
          Delete
        </Button>
      </div>
    );
  }

  return null;
};

export default DeletedBtn;
