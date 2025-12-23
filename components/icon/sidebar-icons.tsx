import React, { FC } from 'react';

interface Props {
  className?: string;
}

const ReportIcon = () => (
  <svg
    // fill={'#a8afb9'}
    width="16px"
    height="16px"
    viewBox="0 0 32 32"
    id="icon"
    className="icon shrink-0 fill-current !text-[#a8afb9] group-hover:!text-primary"
    xmlns="http://www.w3.org/2000/svg">
    <defs></defs>
    <rect x="13.9999" y="23" width="8" height="2" />
    <rect x="9.9999" y="23" width="2" height="2" />
    <rect x="13.9999" y="18" width="8" height="2" />
    <rect x="9.9999" y="18" width="2" height="2" />
    <rect x="13.9999" y="13" width="8" height="2" />
    <rect x="9.9999" y="13" width="2" height="2" />
    <path
      d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"
      transform="translate(0 0)"
    />
    <rect
      fill="none"
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      className="cls-1"
      width="32"
      height="32"
    />
  </svg>
);
const PieChartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    className="icon shrink-0 fill-current !text-[#a8afb9] group-hover:!text-primary"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M6.22209 4.60105C6.66665 4.304 7.13344 4.04636 7.6171 3.82976C8.98898 3.21539 9.67491 2.9082 10.5875 3.4994C11.5 4.09061 11.5 5.06041 11.5 7.00001V8.50001C11.5 10.3856 11.5 11.3284 12.0858 11.9142C12.6716 12.5 13.6144 12.5 15.5 12.5H17C18.9396 12.5 19.9094 12.5 20.5006 13.4125C21.0918 14.3251 20.7846 15.011 20.1702 16.3829C19.9536 16.8666 19.696 17.3334 19.399 17.7779C18.3551 19.3402 16.8714 20.5578 15.1355 21.2769C13.3996 21.9959 11.4895 22.184 9.64665 21.8175C7.80383 21.4509 6.11109 20.5461 4.78249 19.2175C3.45389 17.8889 2.5491 16.1962 2.18254 14.3534C1.81598 12.5105 2.00412 10.6004 2.72315 8.86451C3.44218 7.12861 4.65982 5.64492 6.22209 4.60105Z" />
    <path d="M21.446 7.06901C20.6342 5.00831 18.9917 3.36579 16.931 2.55398C15.3895 1.94669 14 3.34316 14 5.00002V9.00002C14 9.5523 14.4477 10 15 10H19C20.6569 10 22.0533 8.61055 21.446 7.06901Z" />
  </svg>
);
const IconMenuDashboard: FC<Props> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon shrink-0 fill-current !text-[#a8afb9] group-hover:!text-primary">
      <g clipPath="url(#clip0_1057_414)">
        <path d="M19 5V7H15V5H19ZM9 5V11H5V5H9ZM19 13V19H15V13H19ZM9 17V19H5V17H9ZM21 3H13V9H21V3ZM11 3H3V13H11V3ZM21 11H13V21H21V11ZM11 15H3V21H11V15Z" />
      </g>
      <defs>
        <clipPath id="clip0_1057_414">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const DiagnosticIcon = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon shrink-0 fill-current !text-[#a8afb9] group-hover:!text-primary">
      <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9.2C9.41667 2.4 9.77917 1.91667 10.2875 1.55C10.7958 1.18333 11.3667 1 12 1C12.6333 1 13.2042 1.18333 13.7125 1.55C14.2208 1.91667 14.5833 2.4 14.8 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19ZM7 17H14V15H7V17ZM7 13H17V11H7V13ZM7 9H17V7H7V9ZM12 4.25C12.2167 4.25 12.3958 4.17917 12.5375 4.0375C12.6792 3.89583 12.75 3.71667 12.75 3.5C12.75 3.28333 12.6792 3.10417 12.5375 2.9625C12.3958 2.82083 12.2167 2.75 12 2.75C11.7833 2.75 11.6042 2.82083 11.4625 2.9625C11.3208 3.10417 11.25 3.28333 11.25 3.5C11.25 3.71667 11.3208 3.89583 11.4625 4.0375C11.6042 4.17917 11.7833 4.25 12 4.25Z" />
    </svg>
  );
};

const PreparatoryIcon = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon shrink-0 fill-current !text-[#a8afb9] group-hover:!text-primary">
      <path d="M5 19H19V9.825L14.175 5H5V19ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H15L21 9V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM7 17H17V15H7V17ZM7 13H17V11H7V13ZM7 9H14V7H7V9Z" />
    </svg>
  );
};

const PerformanceIcon = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon shrink-0 fill-current !text-[#a8afb9] group-hover:!text-primary">
      <path d="M16 20V13H20V20H16ZM10 20V4H14V20H10ZM4 20V9H8V20H4Z" />
    </svg>
  );
};
export {
  DiagnosticIcon,
  PreparatoryIcon,
  PerformanceIcon,
  IconMenuDashboard,
  PieChartIcon,
  ReportIcon,
};
