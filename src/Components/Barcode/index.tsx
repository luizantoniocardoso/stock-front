import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { TETooltip } from 'tw-elements-react';

interface BarcodeProps {
  value: string;
}

export const Barcode: React.FC<BarcodeProps> = ({ value }) => {
  const barcodeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 20,
        displayValue: false,
      });
    }
  }, [value]);

  return(
    <TETooltip  title={value}>
        <img ref={barcodeRef} />
    </TETooltip>

  )
     
}
