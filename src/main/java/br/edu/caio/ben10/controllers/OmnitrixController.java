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

import br.edu.caio.ben10.entities.Omnitrix;
import br.edu.caio.ben10.services.OmnitrixService;


@RestController
@RequestMapping("/api/omnitrix")
@CrossOrigin(origins = "*")
public class OmnitrixController {
    @Autowired
    private OmnitrixService omnitrixService;

    @PostMapping
    public ResponseEntity<Omnitrix> createOmnitrix(@RequestBody Omnitrix omnitrix) {
        Omnitrix savedCharacter = omnitrixService.insert(omnitrix);
        return new ResponseEntity<>(savedCharacter, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Omnitrix>> getAllOmnitrix() {
        List<Omnitrix> omnitrix = omnitrixService.findAll();
        if (omnitrix.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(omnitrix, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Omnitrix> getOmnitrixById(@PathVariable("id") String id) {
        Optional<Omnitrix> ominitrix = omnitrixService.findById(id);
        if (ominitrix.isPresent()) {
            return new ResponseEntity<>(ominitrix.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Omnitrix> updateOmnitrix(@PathVariable("id") String id, @RequestBody Omnitrix omnitrix) {
        Omnitrix updatedOmnitrix = omnitrixService.update(id, omnitrix);
        if (updatedOmnitrix != null) {
            return new ResponseEntity<>(updatedOmnitrix, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOmnitrix(@PathVariable("id") String id) {
        boolean deleted = omnitrixService.deleteById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
