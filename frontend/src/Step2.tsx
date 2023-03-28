import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Step2Props {
  onPrevious: () => void;
}

const Step2: React.FC<Step2Props> = ({ onPrevious }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    navigate('/step3');
  };

  return (
    <div>
      <h2>Step 2</h2>
      <div dangerouslySetInnerHTML={{ __html: location.state?.summary ?? '' }} />
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step2;
