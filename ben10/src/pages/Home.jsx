import { useState, useEffect } from 'react'

const Home = () => {
  const [aliens, setAliens] = useState([]);

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

  return (
    <div>
      <h1>Ben 10 DataBase</h1>
      {aliens.map((alien, i) => (
        <div key={i}>
          <div className="aliensChoose">
            <div className="containerAlien">
              <div className="boxAlien">
                <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751291361/swarmfire_oejw1o.png" alt="" />
              </div>
            </div>
          </div>
          <div className="ominitrix">
            <div className="containerOmnitrix">
              <div className="alienHologram">
                <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751291136/1_uktazh.png" alt="" />
              </div>
              <div className="boxOminitrix">
                <img src="https://res.cloudinary.com/dthgw4q5d/image/upload/v1751293359/omnitrix_h70yjq.png" alt="" />
              </div>
            </div>
          </div>
          <div className="informations">
            <div className="containerInformations">
              <div className="boxInformations">
                <h1>Nome: {alien.name}</h1>
                <h1>Planeta: {alien.planet}</h1>
                <h1>Raça: {alien.race}</h1>
                <h1>Poderes: {alien.powers}</h1>
                <h1>Primeira Aparição: {alien.firstAppearance}</h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
