import Xarrow, { Xwrapper } from "react-xarrows";

import React, { useCallback, useState } from "react";
import "./App.css";

/*
    React App with Typescript in CodeSandbox
    The Static Data app below shows two boxes and uses react-xarrows to draw an Arrow between box1 and box2

    Tasks: 
    
    Modify the app so that when a user clicks on the dark canvas
      1) a new box gets added to the screen in the position that the user clicked
      2) an arrow gets drawn from the previous box to the new box

    
    Important Tips:
      - You are allowed to use Google
      - Try to explain what you are doing as you work
      - You don't need to write perfect code 
      - you can always refactor later, or explain what you would do given more time
    
    Out of Scope
      Styling
      Tests

  */

const initialBoxes: BoxNode[] = [
  {
    id: "box1",
    left: 100,
    top: 100,
    links: ["box2"],
  },
  {
    id: "box2",
    left: 300,
    top: 200,
    links: [],
  },
];

interface BoxNode {
  id: string;
  left: number;
  top: number;
  links: string[];
}

interface BoxProps {
  box: BoxNode;
}

const Box = ({ box }: BoxProps) => {
  const Style: React.CSSProperties = {
    position: "absolute",
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
    left: box.left,
    top: box.top,
  };

  return (
    <div key={box.id} id={box.id} style={Style}>
      {box.id}
    </div>
  );
};

function App() {
  const [boxes, setBoxes] = useState<BoxNode[]>(initialBoxes);

  const handleClickOInCanvas = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const newBox = {
        id: `box${boxes.length + 1}`,
        left: e.pageX,
        top: e.pageY,
        links: [],
      };

      const allBoxes = [...boxes, newBox];

      const updatedBoxes = allBoxes.map((box, index) => {
        const nextBox = allBoxes[index + 1];

        return {
          ...box,
          links: nextBox ? [nextBox.id] : [],
        };
      });

      setBoxes(updatedBoxes);
    },
    [boxes]
  );

  return (
    <div id="canvas" onClick={handleClickOInCanvas}>
      <Xwrapper>
        {boxes.map((box) => (
          <React.Fragment key={box.id}>
            <Box box={box} />
            {box.links.map((link) => (
              <Xarrow key={box.id} start={box.id} end={link} />
            ))}
          </React.Fragment>
        ))}
      </Xwrapper>
    </div>
  );
}

export default App;
