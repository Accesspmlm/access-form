const getInitials = (text: string) => {
  const words = text.split(' ');

  const initials = words.filter((word) => word.length > 0).map((word) => word[0].toUpperCase());

  return initials.join('');
};

export { getInitials };
