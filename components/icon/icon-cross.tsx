import React from 'react';

const CrossIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#692020" />
      <path
        d="M8.03366 16.9577L7.04199 15.966L11.0087 11.9993L7.04199 8.03268L8.03366 7.04102L12.0003 11.0077L15.967 7.04102L16.9587 8.03268L12.992 11.9993L16.9587 15.966L15.967 16.9577L12.0003 12.991L8.03366 16.9577Z"
        fill={color || '#FEFEFE'}
      />
    </svg>
  );
};

export default CrossIcon;
