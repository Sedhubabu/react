import { useState } from "react";

function Folder({ handleInsertNode = () => {}, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  // Function to display the input box for adding a folder or file
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  // Function to add a folder or file upon hitting Enter
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      // Hide input field after adding
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        {/* Folder Header */}
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>
            {expand ? "📂" : "📁"} {explorer.name}
          </span>

          {/* Buttons for adding folder or file */}
          { explorer.id === "1" &&  <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>}
         
        </div>

        {/* Folder Contents */}
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })} // Hide input on blur
              />
            </div>
          )}

          {/* Render Child Folders and Files */}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        <span>📄 {explorer.name}</span>
      </div>
    );
  }
}

export default Folder;
