package com.graniumhub.data.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Created by Sasha on 4/6/17.
 */
@Entity
@Table(name = "Table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RTable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private double posx;
    private double posy;

    
    
}
