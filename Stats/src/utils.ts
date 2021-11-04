export const dateStringToDate = (dateString: string) => {
  // ex. '11/2/2021' → [11, 2, 2021]
  const dateParts = dateString
    .split('/')
    .map((value: string): number => parseInt(value));

  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
