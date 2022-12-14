export const enterFilterConfObject = {
  labelText: 'Name filter',
  name: 'name',
  type: 'input',
};

export const selectFilterConfObject = {
  label: 'Tags filter',
  name: 'tags',
  multiple: true,
};

const radioEnterValues = [
  { id: 'all', value: '', label: 'All' },
  { id: 'sell', value: 'sell', label: 'Sell' },
  { id: 'buy', value: 'buy', label: 'Buy' },
];

export const radioFilterConfObject = {
  label: 'Sell/Buy Filter',
  name: 'sellFilter',
  values: radioEnterValues,
};

export const sliderFilterConfObject = {
  name: 'slider',
  allowCross: false,
  step: null,
};
