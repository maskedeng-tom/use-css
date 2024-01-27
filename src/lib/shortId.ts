let shortIdSource = 0;

const shortId = (prefix: string) => {
  return prefix + ('000000' + (shortIdSource++).toString(36)).slice(-6);
};

const resetShortId = () => {
  shortIdSource = 0;
};

export { shortId, resetShortId };