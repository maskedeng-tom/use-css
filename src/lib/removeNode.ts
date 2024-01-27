const removeNode = (node: Node | undefined): void => {
  node?.parentNode?.removeChild(node);
};

export { removeNode };