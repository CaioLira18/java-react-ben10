import { useState, useEffect } from 'react';
import AlienHologram from '../components/AlienHologram';

const Home = () => {
  const [aliens, setAliens] = useState([]);
  const [selectedAlien, setSelectedAlien] = useState(null); // Alien selecionado
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Alien selecionado

  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    fetch(`${API_URL}/aliens`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAliens(data);
        } else {
          console.error('Formato inesperado para Aliens:', data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar Aliens:', error);
      });
  }, []);

   useEffect(() => {
    fetch(`${API_URL}/characters`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCharacters(data);
        } else {
          console.error('Formato inesperado para Characters:', data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar Characters:', error);
      });
  }, []);

  return (
    <div className="homeContainer">
      <div className="backgroundOverlay"></div>

      <div className="cabecalho">
        <div className="icon">
            <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751299043/808df0e1d0d32768a4a5fdf6b5e8f5ec_jbrff1.png" alt="" />
        </div>
      </div>

   

      
      <div className="aliensChoose">
        {aliens.map((alien, i) => (
          <div key={i} className="containerAlien" onClick={() => {
              const audio = new Audio('/sound/Sound.mp3');
              audio.play();
              setSelectedAlien(alien);
            }}>
            <div className="boxAlien">
              <img src={alien.imageHuge} alt={alien.name} />
            </div>
          </div>
        ))}
      </div>

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
              <div className="alienImage">
                <img src={selectedAlien.imageHuge} alt="" />
              </div>
              <div className="boxInformations">
                <h1>Nome: {selectedAlien.name}</h1>
                <h1>Planeta: {selectedAlien.planet}</h1>
                <h1>Raça: {selectedAlien.race}</h1>
                <h1>Poderes: {selectedAlien.powers}</h1>
                <h1>Primeira Aparição: {selectedAlien.firstAppearance}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    
          <div className="alienImages">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
           
        </>
      )}
   

    
      <div className="characters">
            <h1>Characters</h1>
            <div className="charactersChoose">
              {characters.map((character, i) => (
                <div key={i} className="containerAlien" onClick={() => setSelectedCharacter(character)}>
                  <div className="boxAlien">
                    <img src={character.imageHuge} alt={character.name} />
                  </div>
                </div>
              ))}
            </div>
             {selectedCharacter && (
              <>
            <div className="containerCharacter">
                <div className="boxCharacters">
                  <div className="containerInformationsCharacters">
                    <div className="characterImage">
                        <img src={selectedCharacter.imageHuge} alt="" />
                    </div>
                    <div className="boxInformations">
                      <h1>Nome: {selectedCharacter.name} </h1>
                      <h1>Idade: {selectedCharacter.age} </h1>
                      <h1>Raça:  {selectedCharacter.race}</h1>
                      <h1>Poderes: {selectedCharacter.powers}</h1>
                      <h1>Primeira Aparição: {selectedCharacter.firstAppearance}</h1>
                    </div>
                  </div>
                </div>
              </div>
             </>
          )}
      </div>
      
    </div>
  );
};

export default Home;
