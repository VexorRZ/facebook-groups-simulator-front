import React, { useState } from "react";

import TextFormatters from "../../Components/TextFormatters";

const MenuBar = ({ editor }: any) => {
  const [, setModal] = useState(false);

  if (!editor) {
    return null;
  }

  return (
    <div className="testing">
      <TextFormatters editor={editor} />
      <div className="flex">
        <div
          className="relative"
          onMouseLeave={() => {
            setModal(false);
          }}
        ></div>
      </div>
    </div>
  );
};

export default MenuBar;
