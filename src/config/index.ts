const sessionNameDefault = "access_session";

export const getCookieTokenName = () => {
  return `${sessionNameDefault}_token_config`;
};

export const getCookieRefreshTokenName = () => {
  return `${sessionNameDefault}_refresh_token_config`;
};

export const convertMillisecondsToDate = (ms: number) => {
  return new Date(new Date().getTime() + Number(ms));
};
