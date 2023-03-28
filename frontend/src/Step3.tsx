import React from 'react';
import { useLocation } from 'react-router-dom';

interface Step3Props {
  onPrevious: () => void;
}

const Step3: React.FC<Step3Props> = ({ onPrevious }) => {
  const location = useLocation();

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className="container">
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px', flex: '1' }}>
          <p style={{ fontSize: '1.2em' }} dangerouslySetInnerHTML={{ __html: location.state?.text ?? '' }} />
        </div>
        <div style={{ flex: '1' }}>
          <img style={{ maxWidth: '100%', height: 'auto' }} src={location.state?.image.image_url ?? ''} alt="Generated Image" />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ marginTop: '20px' }} onClick={handlePrevious}>Previous</button>
      </div>
    </div>
  );
};

export default Step3;
