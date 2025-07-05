import React, { useImperativeHandle, useState } from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MyEditor = React.forwardRef(({ content }, ref) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // const setContent = () => {
  //   if (editorRef.current) {
  //     editor.current.setContent(content);
  //   }
  // };
  const [isReady, setIsReady] = useState(false);
  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current?.getContent(),
    setContent: (value) => editorRef.current?.setContent(value),
    isReady: () => isReady,
  }));

  return (
    <>
      <Editor
        apiKey="qg0ldwuewf48f2gxed724l4xwly6445a6o4pzixbjyrvv8hj"
        onInit={(_evt, editor) => {
          editorRef.current = editor;
          setIsReady(true);
        }}
        initialValue={content}
        init={{
          height: 600,
          menubar: false,
          skin: "oxide-dark",
          content_css: "dark",
          icons: "material",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
});

export default MyEditor;
