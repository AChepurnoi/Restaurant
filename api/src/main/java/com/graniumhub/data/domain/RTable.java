package com.graniumhub.data.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Sasha on 4/6/17.
 */
@Entity
@Table(name = "Tables")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RTable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @SequenceGenerator(name = "seq", sequenceName = "tables_id_seq")
    private int id;

    private double posx;
    private double posy;


    @OneToMany(mappedBy = "table", fetch = FetchType.LAZY,
            orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<Booking> bookings = new ArrayList<>();


}
