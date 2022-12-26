import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTagsAction } from '../../../store/actions';
import { getTags } from '../../../store/selectors';

import SelectElement from '../../common/SelectElement';

export default function SelectTags(props) {
  const tagOptions = useSelector(getTags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagsAction());
  }, [dispatch]);
  return (
    <SelectElement
      options={tagOptions}
      {...props}
    />
  );
}
