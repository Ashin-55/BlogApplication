import React from "react";
import Draggable from "react-draggable";
const Drag = () => {
    const nodeRef = React.useRef(null)
  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef}>Drag</div>
    </Draggable>
  );
};

export default Drag;
