import "./styles.css";
//import Folder from "./components/Folder.js";
import Folder from "./components/Folder.js";
import { useState } from "react";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/use-traverse-tree.js"

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}
