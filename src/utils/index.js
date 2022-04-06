export const formatter = (value) => {
  if (!value) {
    return {};
  }
  return {
    ...value,
    dateRegistration: value.dateRegistration ? new Date(value.dateRegistration) : '',
  };
};
