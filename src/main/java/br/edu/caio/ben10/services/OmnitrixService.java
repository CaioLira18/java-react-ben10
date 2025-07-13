package br.edu.caio.ben10.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.edu.caio.ben10.entities.Omnitrix;
import br.edu.caio.ben10.repository.OmnitrixRepository;

@Service
public class OmnitrixService {
    private final OmnitrixRepository omnitrixRepository;

    @Autowired
    public OmnitrixService(OmnitrixRepository omnitrixRepository) {
        this.omnitrixRepository = omnitrixRepository;
    }

    public List<Omnitrix> findAll() {
        return omnitrixRepository.findAll();
    }

    public Omnitrix insert(Omnitrix omnitrix){
        return omnitrixRepository.save(omnitrix);
    }

    public Optional<Omnitrix> findById(String id){
        return omnitrixRepository.findById(id);
    }

    public Omnitrix update(String id, Omnitrix omnitrix){
        Optional<Omnitrix> existingOmnitrix = omnitrixRepository.findById(id);
        if(existingOmnitrix.isPresent()){
            Omnitrix omnitrixToUpdate = existingOmnitrix.get();
            omnitrixToUpdate.setName(omnitrix.getName());
            omnitrixToUpdate.setImageSmall(omnitrix.getImageSmall());
            omnitrixToUpdate.setImageHuge(omnitrix.getImageHuge());
            omnitrixToUpdate.setPortador(omnitrix.getPortador());
            omnitrixToUpdate.setFirstAppearance(omnitrix.getFirstAppearance());
            omnitrixToUpdate.setDescription(omnitrix.getDescription());
            omnitrixToUpdate.setPontosFortes(omnitrix.getPontosFortes());
            omnitrixToUpdate.setPontosFracos(omnitrix.getPontosFracos());
            return omnitrixRepository.save(omnitrixToUpdate);
        }
        return null;
    }

    public boolean deleteById(String id){
        if(omnitrixRepository.existsById(id)){
            omnitrixRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
