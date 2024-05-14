export const isValidEmail = (text: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(text);
};

export const isValidPhoneNumber = (text: string) => {
  const phoneNumberRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

  return phoneNumberRegex.test(text);
};

export const validateDateFormat = (dateString: string): boolean => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateRegex.exec(dateString);

  if (!match) {
    return false;
  }

  const [, day, month, year] = match;
  const numDay = parseInt(day, 10);
  const numMonth = parseInt(month, 10);
  const numYear = parseInt(year, 10);

  if (numDay < 1 || numDay > 31 || numMonth < 1 || numMonth > 12 || numYear < 1000) {
    return false;
  }

  const daysInMonth = new Date(numYear, numMonth, 0).getDate();
  if (numDay > daysInMonth) {
    return false;
  }

  return true;
};
