package br.edu.caio.ben10.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.caio.ben10.entities.Characters;
import br.edu.caio.ben10.services.CharactersService;

@RestController
@RequestMapping("/api/characters")
@CrossOrigin(origins = "*")
public class CharactersController {
    
    @Autowired
    private CharactersService charactersService;

    @PostMapping
    public ResponseEntity<Characters> createCharacter(@RequestBody Characters characters) {
        Characters savedCharacter = charactersService.insert(characters);
        return new ResponseEntity<>(savedCharacter, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Characters>> getAllCharacters() {
        List<Characters> characters = charactersService.findAll();
        if (characters.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(characters, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Characters> getCharacterById(@PathVariable("id") String id) {
        Optional<Characters> characters = charactersService.findById(id);
        if (characters.isPresent()) {
            return new ResponseEntity<>(characters.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Characters> updateCharacter(@PathVariable("id") String id, @RequestBody Characters characters) {
        Characters updatedCharacters = charactersService.update(id, characters);
        if (updatedCharacters != null) {
            return new ResponseEntity<>(updatedCharacters, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCharacter(@PathVariable("id") String id) {
        boolean deleted = charactersService.deleteById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}