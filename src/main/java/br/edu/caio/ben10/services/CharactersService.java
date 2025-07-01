package br.edu.caio.ben10.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.caio.ben10.entities.Characters;
import br.edu.caio.ben10.repository.CharactersRepository;

@Service
public class CharactersService {

    @Autowired
    private CharactersRepository charactersRepository;

    public Characters insert(Characters characters){
        return charactersRepository.save(characters);
    }

    public List<Characters> findAll(){
        return charactersRepository.findAll();
    }

    public Optional<Characters> findById(String id){
        return charactersRepository.findById(id);
    }

    public Characters update(String id, Characters characters){
        Optional<Characters> existingCharacter = charactersRepository.findById(id);
        if(existingCharacter.isPresent()){
            Characters characterToUpdate = existingCharacter.get();
            characterToUpdate.setName(characters.getName());
            characterToUpdate.setImageHuge(characters.getImageHuge());
            characterToUpdate.setAge(characters.getAge());
            characterToUpdate.setPlanet(characters.getPlanet());
            characterToUpdate.setRace(characters.getRace());
            characterToUpdate.setPowers(characters.getPowers());
            characterToUpdate.setFirstAppearance(characters.getFirstAppearance());
            characterToUpdate.setImage1(characters.getImage1());
            characterToUpdate.setImage2(characters.getImage2());
            characterToUpdate.setImage3(characters.getImage3());

            return charactersRepository.save(characterToUpdate);
        }
        return null;
    }

    public boolean deleteById(String id){
        if(charactersRepository.existsById(id)){
            charactersRepository.deleteById(id);
            return true;
        }
        return false;
    }
}