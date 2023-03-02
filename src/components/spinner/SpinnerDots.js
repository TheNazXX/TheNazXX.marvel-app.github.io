import './spinner.scss'

const SpinnerDots = () => {
  return (
    <svg className="spinner-dots" width="60" height="30">
      <circle cx="15" cy="15" r="6">
        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="15" r="6">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="45" cy="15" r="6">
        <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default SpinnerDots;
