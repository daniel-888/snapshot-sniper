import React, { useState, useEffect } from 'react';

import defaultImage from '../assets/default-image.png'

const Image = ({ converted, origin, alt, style = {} }) => {

  const [src, setSrc] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setSrc(converted)
  }, [converted])

  return (
    <div style={style}>
      <img src={src} alt={alt} onError={() => setSrc(origin)} onLoad={() => setIsLoading(false)} style={!isLoading ? { width: '100%', height: '100%' } : { display: 'none' }} />
      <img src={defaultImage} alt="loading" style={isLoading ? { width: '100%', height: '100%' } : { display: 'none' }} />
    </div>
  );
}

export default Image