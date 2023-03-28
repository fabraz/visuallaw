import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step3 from './Step3';

const Wizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/Step1', { replace: true });
    }
  }, [location, navigate]);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
    navigate(`/step${step + 1}`);
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      navigate(`/step${step - 1}`);
    } else {
      navigate(`/step${step}`);
    }
  };

  return (
    <div>
      <h1>Visual Law</h1>
      <Routes>
        <Route path="/step1" element={<Step1 onNext={handleNext} />} />
        <Route path="/step3" element={<Step3 onPrevious={handlePrevious} />} />
      </Routes>
    </div>
  );
};

export default Wizard;