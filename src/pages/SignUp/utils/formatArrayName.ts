const formatArrayName = (selectedIds: number[], items: Array<{ value: number; label: string }>) => {
  return selectedIds
    .map((id) => items.find((item) => item.value === id)?.label)
    .filter(Boolean)
    .join(', ');
};

export default formatArrayName;
