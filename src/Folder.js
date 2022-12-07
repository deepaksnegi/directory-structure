import { useState } from "react";

const Folder = ({ directory, insertItem }) => {
  const [expandDirectory, setExpandDirectory] = useState(true);
  const [newItem, setNewItem] = useState({
    isVisible: false,
    isFolder: false
  });

  const onNewItemClick = (event, isFolder = false) => {
    event.stopPropagation();
    setNewItem({ isVisible: true, isFolder });
    setExpandDirectory(true);
  };

  const onCreateNewItem = (event) => {
    const name = event.target.value;

    if (name && (event.key === "Enter" || event.keyCode === 13)) {
      const item = {
        name,
        isFolder: newItem.isFolder,
        child: newItem.isFolder ? [] : undefined
      };
      insertItem(directory.id, item);
      setNewItem({ ...newItem, isVisible: false });
      event.target.value = "";
    }
  };

  if (!directory.isFolder) {
    return (
      <div className="file-container">
        <span>🌐 {directory.name}</span>
      </div>
    );
  }

  return (
    <>
      <div
        className="folder-container"
        onClick={() => setExpandDirectory((prev) => !prev)}
      >
        <p>
          <span>📁 {directory.name}</span>
        </p>
        <button onClick={(event) => onNewItemClick(event, true)}>
          Folder +
        </button>
        <button onClick={(event) => onNewItemClick(event)}>File +</button>
      </div>

      {newItem.isVisible ? (
        <>
          <span role="img">{newItem.isFolder ? "📁" : "🌐"}</span>
          <input
            type="text"
            autoFocus
            onKeyDown={onCreateNewItem}
            onBlur={() => setNewItem({ ...newItem, isVisible: false })}
          />
        </>
      ) : null}

      <div
        style={{
          marginLeft: "15px",
          display: expandDirectory ? "block" : "none"
        }}
      >
        {directory.child.map((c) => (
          <Folder directory={c} key={c.id} insertItem={insertItem} />
        ))}
      </div>
    </>
  );
};

export default Folder;
