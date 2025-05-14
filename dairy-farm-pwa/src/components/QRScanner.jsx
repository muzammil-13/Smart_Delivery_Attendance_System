import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ onScanSuccess }) => {
  const [error, setError] = useState(null);

  const handleScan = (result) => {
    if (result) {
      onScanSuccess(result);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={handleScan}
        style={{ width: '100%' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QRScanner;
