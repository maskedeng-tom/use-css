const isSameArray = (a?: unknown, b?: unknown): boolean => {

  if(!Array.isArray(a) || !Array.isArray(b)){
    return false;
  }

  if(a.length !== b.length){
    return false;
  }

  for(let i = 0; i < a.length; i++){
    if(!Object.is(a[i], b[i])){
      return false;
    }
  }

  return true;
};

export { isSameArray };
