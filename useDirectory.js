const useDirectory = () => {
  const insertItem = (root, parentId, item) => {
    if (root.id === parentId && root.isFolder) {
      root.child.push({ ...item, id: new Date().valueOf() });
      return root;
    }

    if (!root.isFolder || root.child?.length === 0) {
      return root;
    }

    let latestChild = [];
    latestChild = root.child.map((child) => {
      return insertItem(child, parentId, item);
    });

    return { ...root, child: latestChild };
  };

  return [insertItem];
};

export default useDirectory;
