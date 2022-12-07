import Folder from "./Folder";
import "./styles.css";
import directory from "./directory.json";
import useDirectory from "../useDirectory";
import { useState } from "react";

export default function App() {
  const [rootDirectory, setRootDirectory] = useState(directory);
  const [insertItem] = useDirectory();

  const addNewItem = (parentId, newItem) => {
    const root = insertItem(rootDirectory, parentId, newItem);
    setRootDirectory(root);
  };

  return <Folder directory={rootDirectory} insertItem={addNewItem} />;
}
