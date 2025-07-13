package br.edu.caio.ben10.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "tb_omnitrix")
public class Omnitrix {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String imageSmall;
    private String imageHuge;
    private String portador;
    private String description;
    private String firstAppearance;
    private String pontosFracos;
    private String pontosFortes;
}
