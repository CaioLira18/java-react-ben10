package br.edu.caio.ben10.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="tb_aliens")
public class Aliens {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private AlienRole role;

    private String name;
    private String imageOmitrix;
    private String imageHuge;
    private String planet;
    private String race;
    private String powers;
    private String firstAppearance;
    private String image1;
    private String image2;
    private String image3;
}
