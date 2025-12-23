import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import IconX from '../icon/icon-x';
import { ImageProps } from './image-select';

export default function ImageSelectMulti({
  images,
  setImages,
  defaultImages,
}: {
  images: any;
  defaultImages?: ImageProps[];
  setImages: Function;
}) {
  // const [images, setImages] = useState<any>([]);
  const maxNumber = 69;
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    setImages(imageList as never[]);
  };

  return (
    <div className=" border p-2 rounded-lg">
      <div className="custom-file-container" data-upload-id="mySecondImage">
        <div className="label-container">
          <label>Select Multiple Images </label>
          <button
            type="button"
            className="custom-file-container__image-clear"
            title="Clear Image"
            onClick={() => {
              setImages([]);
            }}>
            ×
          </button>
        </div>
        {/* <label className="custom-file-container__custom-file"></label>
        <input
          type="file"
          className="custom-file-container__custom-file__custom-file-input"
          accept="image/*"
        /> */}
        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
        <ImageUploading
          multiple
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
                onClick={onImageUpload}>
                Choose File...
              </button>
              &nbsp;
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="custom-file-container__image-preview relative">
                    <button
                      type="button"
                      className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
                      title="Clear Image"
                      onClick={() => onImageRemove(index)}>
                      <IconX className="h-3 w-3" />
                    </button>
                    <img
                      src={image.dataURL}
                      alt="img"
                      className="!max-h-48 w-full rounded object-cover shadow"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
        {images.length === 0 ? (
          <div className="text-center py-4">No image selected</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
