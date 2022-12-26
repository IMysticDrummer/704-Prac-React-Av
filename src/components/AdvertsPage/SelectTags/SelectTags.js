import React from 'react';
import { useSelector } from 'react-redux';
import { getTags } from '../../../store/selectors';

import SelectElement from '../../common/SelectElement';

export default function SelectTags(props) {
  //Preparar la recogida de las opciones y pasarla al SelectElement
  const tagOptions = useSelector(getTags);
  return (
    <SelectElement
      options={tagOptions}
      {...props}
    />
  );
}
