import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export interface ImageProps {
  id?: string;
  dataURL: string;
  file?: File;
}

export default function ImageSelect({
  images,
  setImages,
  defaultImage,
  onRemove,
  label,
}: {
  images: ImageProps[];
  setImages: Function;
  defaultImage?: ImageProps[];
  onRemove?: Function;
  label?: string;
}) {
  const maxNumber = 69;
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    setImages(imageList as never[]);
  };


  return (
    <div className="mb-0 rounded-lg border p-2">
      <div className="custom-file-container" data-upload-id="myFirstImage">
        <div className="label-container">
          <label className="text-black">{label ?? 'Image'}</label>
          <button
            type="button"
            className="custom-file-container__image-clear"
            title="Clear Image"
            onClick={() => {
              if (onRemove) {
                onRemove();
              }
            }}>
            ×
          </button>
        </div>
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}>
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper mt-10">
              <button
                type="button"
                className="custom-file-container__custom-file__custom-file-control"
                style={{
                  zIndex: 0,
                }}
                onClick={onImageUpload}>
                Choose File...
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="custom-file-container__image-preview relative">
                  <img src={image.dataURL} alt="img" className="m-auto" />
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        {images.length === 0 ? (
          <div className="py-4 text-center">No image selected</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
