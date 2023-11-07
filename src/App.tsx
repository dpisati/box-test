import Xarrow, { Xwrapper } from "react-xarrows";

import { useRef, useState } from "react";
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

// interface BoxNode {
//   id: string;
//   left: number;
//   top: number;
//   links: string[];
// }

const Box = (box: any) => {
  const Style = {
    position: "absolute",
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
    ...box,
  };

  return (
    <div key={box.id} id={box.id} style={Style}>
      {box.id}
    </div>
  );
};

function App() {
  const [boxes, setBoxes] = useState([
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
  ]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  function handleClickOInCanvas(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (!canvasRef.current) return;

    console.log(`boxes: `, boxes);

    const newBox = {
      id: `box${boxes.length + 1}`,
      left: e.pageX,
      top: e.pageY,
      links: [`box${boxes.length}`],
    };

    const updated = [...boxes, newBox].filter((item) => item);

    setBoxes((prev) => [...prev, newBox]);
  }

  return (
    <div id="canvas" ref={canvasRef} onClick={handleClickOInCanvas}>
      <Xwrapper>
        {boxes.map((b, index) => (
          <Box {...b} key={index} />
        ))}
        {boxes.map((b) =>
          b.links.length
            ? b.links.map((l, i) => (
                <Xarrow key={b.id + "-" + i} start={b.id} end={l} />
              ))
            : null
        )}
      </Xwrapper>
    </div>
  );
}

export default App;
