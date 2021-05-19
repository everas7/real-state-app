import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { FaTrashAlt } from 'react-icons/fa';
import { IconButton } from '../IconButton/IconButton';

interface IProps {
  setFiles: (files: any[]) => void;
  files: any[];
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

export const PhotoDropzone: React.FC<IProps> = ({ setFiles, files }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        [
          ...files,
          ...acceptedFiles.map((file: {}) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ].slice(0, 10)
      );
    },
    [setFiles, files]
  );

  const handleDeleteByName = useCallback(
    (name) => {
      setFiles([...files.filter((file) => file.name !== name)]);
    },
    [setFiles, files]
  );

  const handleDeleteById = useCallback(
    (id) => {
      setFiles([...files.filter((file) => file.id !== id)]);
    },
    [setFiles, files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    accept: 'image/jpeg, image/png',
    maxSize: 20480000,
  });
  const thumbs = files.map((file: any) => (
    <div key={file.id || file.name}>
      <div style={thumb as any} key={file.name}>
        <IconButton
          variant="danger"
          icon={<FaTrashAlt />}
          className="dropzone__delete"
          onClick={() =>
            file.name
              ? handleDeleteByName(file.name)
              : handleDeleteById(file.id)
          }
        />
        <div style={thumbInner}>
          <img src={file.preview || file.url} style={img} />
        </div>
      </div>
    </div>
  ));
  return (
    <section>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <div>(10 files are the maximum number of files you can drop here)</div>
        <div>(Only *.jpeg and *.png images will be accepted)</div>
        <div>(Max Size: 20M)</div>
      </div>
      <aside style={thumbsContainer as any}>{thumbs}</aside>
    </section>
  );
};
