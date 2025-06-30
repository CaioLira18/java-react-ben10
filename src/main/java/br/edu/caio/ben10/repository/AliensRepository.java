package br.edu.caio.ben10.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.caio.ben10.entities.Aliens;

@Repository
public interface  AliensRepository extends JpaRepository<Aliens, String> {

}
