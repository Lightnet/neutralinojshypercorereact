/*
  LICENSE: MIT
  Created by: Lightnet

*/

// https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/core-examples/treeExample.tsx

import { cloneDeep } from "lodash-es";
import React, {useState} from "react";
import { Classes, Icon, Intent, Tree } from "@blueprintjs/core";
import { 
  Classes as Popover2Classes
, ContextMenu2
, Tooltip2 
} from "@blueprintjs/popover2";

const contentSizing = { popoverProps: { popoverClassName: Popover2Classes.POPOVER2_CONTENT_SIZING } };


function forNodeAtPath(nodes, path, callback) {
  callback(Tree.nodeFromPath(path, nodes));
}

function forEachNode(nodes , callback) {
  if (nodes === undefined) {
      return;
  }

  for (const node of nodes) {
      callback(node);
      forEachNode(node.childNodes, callback);
  }
}

function treeExampleReducer(state, action) {
  switch (action.type) {
      case "DESELECT_ALL":
          const newState1 = cloneDeep(state);
          forEachNode(newState1, node => (node.isSelected = false));
          return newState1;
      case "SET_IS_EXPANDED":
          const newState2 = cloneDeep(state);
          forNodeAtPath(newState2, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
          return newState2;
      case "SET_IS_SELECTED":
          const newState3 = cloneDeep(state);
          forNodeAtPath(newState3, action.payload.path, node => (node.isSelected = action.payload.isSelected));
          return newState3;
      default:
          return state;
  }
}

export default function HyperDriveTreePage(){

  //const [nodes, setNodes] = useState(INITIAL_STATE)
  
  /*
  ([
    {
      id: 0,
      hasCaret: true,
      icon: "folder-close",
      label: "Super secret files",
  },
  {
    id: 1,
    hasCaret: true,
    icon: "folder-close",
    label: "Super secret files",
  }
  ]);
  */

    const [nodes, dispatch] = React.useReducer(treeExampleReducer, INITIAL_STATE);

    const handleNodeClick = React.useCallback(
      (node, nodePath, e) => {
          const originallySelected = node.isSelected;
          if (!e.shiftKey) {
              dispatch({ type: "DESELECT_ALL" });
          }
          dispatch({
              payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
              type: "SET_IS_SELECTED",
          });
      },
      [],
  );

  const handleNodeCollapse = React.useCallback((_node, nodePath) => {
      dispatch({
          payload: { path: nodePath, isExpanded: false },
          type: "SET_IS_EXPANDED",
      });
  }, []);

  const handleNodeExpand = React.useCallback((_node, nodePath) => {
      dispatch({
          payload: { path: nodePath, isExpanded: true },
          type: "SET_IS_EXPANDED",
      });
  }, []);



  return <div style={{
    width:"100%",
    height:"100%"
    }}>
    <label> Testing... </label>
    <Tree
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />  

  </div>
}
//<Tree></Tree>

const INITIAL_STATE = [
  {
      id: "asdad",
      hasCaret: true,
      icon: "folder-close",
      label: (
          <ContextMenu2 {...contentSizing} content={<div>Hello there!</div>}>
              Folder 0
          </ContextMenu2>
      ),
  },
  {
      id: 1,
      icon: "folder-close",
      isExpanded: true,
      label: (
          <ContextMenu2 {...contentSizing} content={<div>Hello there!</div>}>
              <Tooltip2 content="I'm a folder <3" placement="right">
                  Folder 1
              </Tooltip2>
          </ContextMenu2>
      ),
      childNodes: [
          {
              id: 2,
              icon: "document",
              label: "Item 0",
              secondaryLabel: (
                  <Tooltip2 content="An eye!">
                      <Icon icon="eye-open" />
                  </Tooltip2>
              ),
          },
          {
              id: 3,
              icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
              label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
          },
          {
              id: 4,
              hasCaret: true,
              icon: "folder-close",
              label: (
                  <ContextMenu2 {...contentSizing} content={<div>Hello there!</div>}>
                      <Tooltip2 content="foo" placement="right">
                          Folder 2
                      </Tooltip2>
                  </ContextMenu2>
              ),
              childNodes: [
                  { id: 5, label: "No-Icon Item" },
                  { id: 6, icon: "tag", label: "Item 1" },
                  {
                      id: 7,
                      hasCaret: true,
                      icon: "folder-close",
                      label: (
                          <ContextMenu2 {...contentSizing} content={<div>Hello there!</div>}>
                              Folder 3
                          </ContextMenu2>
                      ),
                      childNodes: [
                          { id: 8, icon: "document", label: "Item 0" },
                          { id: 9, icon: "tag", label: "Item 1" },
                      ],
                  },
              ],
          },
      ],
  },
  {
      id: 2,
      hasCaret: true,
      icon: "folder-close",
      label: "Super secret files",
      disabled: true,
  },
];