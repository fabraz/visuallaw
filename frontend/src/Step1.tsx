import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';


interface Step1Props {
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    // Do some validation on the text input here
    const summaryResponse = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const image_url = await summaryResponse.json();

    navigate('/step3', { state: { image: image_url , text: text} });
  };

  return (
    <div>
      <h2>Texto de Entrada</h2>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY!}
        value={text}
        onEditorChange={(content) => setText(content)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step1;