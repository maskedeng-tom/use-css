const camel2Kebabu = (p: string): string => {
  const pp = p.charAt(0).toLowerCase() + p.substring(1);
  return pp.replace(/([A-Z])/g,
    (s) => {
      return '-' + s.charAt(0).toLowerCase();
    }
  );
};

const kebabu2Camel = (p: string): string => {
  return p.toLowerCase().replace(/-./g,
    (s) => {
      return s.charAt(1).toUpperCase();
    }
  );
};

export { camel2Kebabu, kebabu2Camel };