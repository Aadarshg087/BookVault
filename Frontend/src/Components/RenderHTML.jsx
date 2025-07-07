import React from "react";

const RenderHTML = (HTMLcontent) => {
  return (
    <>
      <div
        className=" bg-bg-light mx-15 my-10 rounded-lg p-10 text-font text-left"
        dangerouslySetInnerHTML={{ __html: "" }}
      >
        {HTMLcontent}
      </div>
    </>
  );
};

export default RenderHTML;
