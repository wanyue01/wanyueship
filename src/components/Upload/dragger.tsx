import React, { FC, useState, ReactNode, DragEvent } from 'react';
import classNames from 'classnames';

export interface DraggerProps {
  onFile: (file: FileList) => void;
  children?: ReactNode;
};

const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames('uploader-dragger', {
    'is-dragover': dragOver,
  });
  const handleDrag = (e: DragEvent, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;