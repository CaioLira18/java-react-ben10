package br.edu.caio.ben10.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.edu.caio.ben10.entities.Aliens;
import br.edu.caio.ben10.repository.AliensRepository;

@Service
public class AliensService {

    @Autowired
    private AliensRepository aliensRepository;

    public Aliens insert(Aliens aliens){
        return aliensRepository.save(aliens);
    }

    public List<Aliens> findAll(){
        return aliensRepository.findAll();
    }

    public Optional<Aliens> findById(String id){
        return aliensRepository.findById(id);
    }

    public Aliens update(String id, Aliens aliens){
        Optional<Aliens> existingAlien = aliensRepository.findById(id);
        if(existingAlien.isPresent()){
            Aliens alienToUpdate = existingAlien.get();
            alienToUpdate.setName(aliens.getName());
            alienToUpdate.setImageOmitrix(aliens.getImageOmitrix());
            alienToUpdate.setImageHuge(aliens.getImageHuge());
            alienToUpdate.setPlanet(aliens.getPlanet());
            alienToUpdate.setRace(aliens.getRace());
            alienToUpdate.setPowers(aliens.getPowers());
            alienToUpdate.setFirstAppearance(aliens.getFirstAppearance());
            return aliensRepository.save(alienToUpdate);
        }
        return null;
    }

    public boolean deleteById(String id){
        if(aliensRepository.existsById(id)){
            aliensRepository.deleteById(id);
            return true;
        }
        return false;
    }
}