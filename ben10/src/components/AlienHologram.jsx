import { useEffect, useRef } from 'react';

const AlienHologram = ({ selectedAlien }) => {
  const hologramRef = useRef(null);

  useEffect(() => {
    if (hologramRef.current) {
      hologramRef.current.style.setProperty(
        '--glitch-image',
        `url(${selectedAlien.imageOmitrix})`
      );
    }
  }, [selectedAlien]);

  return (
    <div className="alienHologram" ref={hologramRef}>
      <img src={selectedAlien.imageOmitrix} alt={selectedAlien.name} />
    </div>
  );
};

export default AlienHologram