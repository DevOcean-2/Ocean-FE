const formatPickerItems = (items: Array<{ id: number; name: string }>) => {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

export default formatPickerItems;
