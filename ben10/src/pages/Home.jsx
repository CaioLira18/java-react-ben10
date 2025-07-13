import { useState, useEffect } from 'react';
import AlienHologram from '../components/AlienHologram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const clickSound = new Audio('/sound/Sound.mp3');

const Home = () => {
  const [aliens, setAliens] = useState([]);
  const [selectedAlien, setSelectedAlien] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [ominitrix, setOmnitrix] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedOmnitrix, setSelectedOmnitrix] = useState(null);
  const [ultimateSelected, setUltimateSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [animatingItems, setAnimatingItems] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    selectedAlien?.image1,
    selectedAlien?.image2,
    selectedAlien?.image3,
  ].filter(Boolean); 


  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  
  const showMoreAliens = () => {
    clickSound.play();
    const currentCount = visibleCount;
    const newCount = Math.min(currentCount + 8, aliens.length);
    
    // Marca os novos itens para animação
    const newItems = new Set();
    for (let i = currentCount; i < newCount; i++) {
      newItems.add(i);
    }
    setAnimatingItems(newItems);
    
    setVisibleCount(newCount);
    
    // Remove a animação após completar
    setTimeout(() => {
      setAnimatingItems(new Set());
    }, 600);
  };

  const visibleAliens = aliens.slice(0, visibleCount);
  const hasMoreAliens = visibleCount < aliens.length;

  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetch(`${API_URL}/aliens`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) setAliens(data);
        else console.error('Formato inesperado para Aliens:', data);
      })
      .catch(error => console.error('Erro ao buscar Aliens:', error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/characters`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) setCharacters(data);
        else console.error('Formato inesperado para Characters:', data);
      })
      .catch(error => console.error('Erro ao buscar Characters:', error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/omnitrix`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) setOmnitrix(data);
        else console.error('Formato inesperado para Characters:', data);
      })
      .catch(error => console.error('Erro ao buscar Characters:', error));
  }, []);

  return (
    <div>
      <div className="cabecalho">
        <div className="icon">
          <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751299043/808df0e1d0d32768a4a5fdf6b5e8f5ec_jbrff1.png" alt="" />
        </div>
      </div>

      <div className="alienArea">
        <div className="aliensChoose">
          {visibleAliens.map((alien, i) => (
            <div
              key={i}
              className={`containerAlien ${animatingItems.has(i) ? 'alien-fade-in' : ''}`}
              onClick={() => {
                clickSound.play();
                setSelectedAlien(alien);
                setUltimateSelected(null); // resetar ao selecionar outro alien
              }}
            >
              <div className="boxAlien">
                <img src={alien.imageHuge || ''} alt={alien.name || ''} />
              </div>
            </div>
          ))}
        </div>

        {hasMoreAliens && (
          <div className="divider" onClick={showMoreAliens}>
            <span className="divider-arrow">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </div>
        )}

        {selectedAlien && (
          <>
            <div className="aliensInformations">
              <div className="ominitrix">
                <div className="containerOmnitrix">
                  <AlienHologram selectedAlien={selectedAlien} />
                  <div className="boxOminitrix">
                    <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751293359/omnitrix_h70yjq.png" alt="Omnitrix" />
                  </div>
                </div>

                <div className="informations">
                  <div className="containerInformations">

                    {selectedAlien.role === "ULTIMATE" && (
                      <div className="normalUltimate">
                        <button onClick={() => setUltimateSelected("NORMAL")} className='buttonForm'>
                          <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751834081/alienLogo_nc36n8.png" alt="Normal" />
                        </button>
                        <button onClick={() => setUltimateSelected("ULTIMATE")} className='buttonForm'>
                          <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751833855/ultimate_itex3n.png" alt="Ultimate" />
                        </button>
                      </div>
                    )}


                    {(selectedAlien.role === "NORMAL" || ultimateSelected === "NORMAL") && (
                    <div className="alienImage">
                      <img src={selectedAlien.imageHuge || ''} alt={selectedAlien.name || ''} />
                    </div>
                    )}

                     {(selectedAlien.role === "ULIMATE" || ultimateSelected === "ULTIMATE") && (
                    <div className="alienImage">
                      <img src={selectedAlien.imageUltimateHuge || ''} alt={selectedAlien.name || ''} />
                    </div>
                    )}

                    {(selectedAlien.role === "NORMAL" || ultimateSelected === "NORMAL") && (
                      <div className="boxInformations">
                        <h1>Nome: {selectedAlien.name}</h1>
                        <h1>Planeta: {selectedAlien.planet}</h1>
                        <h1>Raça: {selectedAlien.race}</h1>
                        <h1>Poderes: {selectedAlien.powers}</h1>
                        <h1>Primeira Aparição: {selectedAlien.firstAppearance}</h1>
                      </div>
                    )}

                    {selectedAlien.role === "ULTIMATE" && ultimateSelected === "ULTIMATE" && (
                      <div className="boxInformations">
                        <h1>Nome: {selectedAlien.ultimateName}</h1>
                        <h1>Planeta: {selectedAlien.planet}</h1>
                        <h1>Raça: {selectedAlien.ultimateRace}</h1>
                        <h1>Poderes: {selectedAlien.ultimatePowers}</h1>
                        <h1>Primeira Aparição: {selectedAlien.ultimateFirstAppearance}</h1>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>

          </>
        )}
      </div>

      {selectedAlien && (
      <div className="alienImages">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}

      />
      <div className="navigation-buttons">
        <button onClick={handlePrev}><FontAwesomeIcon icon={faAngleLeft} /></button>
        <button onClick={handleNext}><FontAwesomeIcon icon={faAngleRight} /></button>
      </div>
    </div>
      )}

      <div className="characters">
        <h1>Characters</h1>
        <div className="charactersChoose">
          {characters.map((character, i) => (
            <div
              key={i}
              className="containerAlien"
              onClick={() => {
                setSelectedCharacter(character);
              }}
            >
              <div className="boxAlien">
                <img src={character.imageHuge || ''} alt={character.name || ''} />
              </div>
            </div>
          ))}
        </div>
        {selectedCharacter && (
          <div className="containerCharacter">
            <div className="boxCharacters">
              <div className="containerInformationsCharacters">
                <div className="characterImage">
                  <img src={selectedCharacter.imageHuge || ''} alt={selectedCharacter.name || ''} />
                </div>
                <div className="boxInformations">
                  <h1>Nome: {selectedCharacter.name}</h1>
                  <h1>Idade: {selectedCharacter.age}</h1>
                  <h1>Raça: {selectedCharacter.race}</h1>
                  <h1>Poderes: {selectedCharacter.powers}</h1>
                  <h1>Primeira Aparição: {selectedCharacter.firstAppearance}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="characters">
        <h1>Omnitrix</h1>
        <div className="charactersChoose">
          {ominitrix.map((omnitrix, i) => (
            <div
              key={i}
              className="containerAlien"
              onClick={() => {
                selectedOmnitrix(ominitrix);
              }}
            >
              <div className="boxAlien">
                <img src={omnitrix.imageHuge || ''} alt={omnitrix.name || ''} />
              </div>
            </div>
          ))}
        </div>
        {selectedOmnitrix && (
          <div className="containerCharacter">
            <div className="boxCharacters">
              <div className="containerInformationsCharacters">
                <div className="characterImage">
                  <img src={selectedCharacter.imageHuge || ''} alt={selectedCharacter.name || ''} />
                </div>
                <div className="boxInformations">
                  <h1>Nome: {selectedCharacter.name}</h1>
                  <h1>Primeira Aparição: {selectedCharacter.firstAppearance}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;