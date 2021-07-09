import React from 'react';
import './BinaryTreeDisplay.scss';
import Element from '../Element/Element';


//react component for a single level in a binary tree
const BinaryTreeLevel = (props) => {
    return props.list.map((node, index) => {
        if (node === null)
            return <Element key={index} value={""} color={"none"} />;
        else
            return <Element key={index} value={node.value} />;
    });
}

//react component for lines between binary tree nodes
const BinaryTreeLineLevel = (props) => {
    var lines = [];
    for (let i = 0; i < props.list.length; i++) {
        if (props.list[i] === null)
            lines.push(<div key={lines.length} className="binary-tree-line-none"></div>);
        else if (i % 2 === 0)
            lines.push(<div key={lines.length} className="binary-tree-line-left"></div>);
        else
            lines.push(<div key={lines.length} className="binary-tree-line-right"></div>);
        
    }
    return lines;
}

//react component to display the tree
const BinaryTreeDisplay = (props) => {
    var levelComponents = [];
    var nextQueue = [];
    if (props.tree !== null)
        nextQueue.push(props.tree.root);
    var currQueue = [];
    while (true) {
        //continue breadth-first traversal creating BinaryTreeLevel component every iteration
        currQueue = nextQueue;
        nextQueue = [];
        for (let i = 0; i < currQueue.length; i++) {
            //use null as placeholder empty nodes in a level
            if (currQueue[i] === null) {
                nextQueue.push(null);
                nextQueue.push(null);
            } else {
                nextQueue.push(currQueue[i].left);
                nextQueue.push(currQueue[i].right);
            }
        }
        //add a level of nodes
        levelComponents.push(
            <div key={levelComponents.length} className="binary-tree-level">
                <BinaryTreeLevel list={currQueue} />
            </div>
        );
        //break loop if entire level is null
        var allNull = true;
        for (let i = 0; i < nextQueue.length; i++) {
            if (nextQueue[i] !== null) {
                allNull = false;
            }
        }
        if (allNull) {
            break;
        }
        //add a level of lines to the next level
        levelComponents.push(
            <div key={levelComponents.length} className="binary-tree-line-level">
                <BinaryTreeLineLevel list={nextQueue} />
            </div>
        );
    }
    return levelComponents;
}

export default BinaryTreeDisplay;