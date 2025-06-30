package br.edu.caio.ben10.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.caio.ben10.entities.Aliens;

public interface  AliensRepository extends JpaRepository<Aliens, String> {

}
