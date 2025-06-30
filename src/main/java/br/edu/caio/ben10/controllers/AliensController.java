package br.edu.caio.ben10.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.edu.caio.ben10.entities.Aliens;
import br.edu.caio.ben10.services.AliensService;

@RestController
@RequestMapping("/api/aliens")
@CrossOrigin(origins = "*")
public class AliensController {
    
    @Autowired
    private AliensService aliensService;

    @PostMapping
    public ResponseEntity<Aliens> createAlien(@RequestBody Aliens aliens) {
        Aliens savedAlien = aliensService.insert(aliens);
        return new ResponseEntity<>(savedAlien, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Aliens>> getAllAliens() {
        List<Aliens> aliens = aliensService.findAll();
        if (aliens.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(aliens, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aliens> getAlienById(@PathVariable("id") String id) {
        Optional<Aliens> alien = aliensService.findById(id);
        if (alien.isPresent()) {
            return new ResponseEntity<>(alien.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aliens> updateAlien(@PathVariable("id") String id, @RequestBody Aliens aliens) {
        Aliens updatedAlien = aliensService.update(id, aliens);
        if (updatedAlien != null) {
            return new ResponseEntity<>(updatedAlien, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAlien(@PathVariable("id") String id) {
        boolean deleted = aliensService.deleteById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}