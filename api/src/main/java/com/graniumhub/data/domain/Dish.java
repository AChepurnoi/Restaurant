package com.graniumhub.data.domain;

import lombok.*;

import javax.persistence.*;

/**
 * Created by Sasha on 3/27/17.
 */
@Entity
@Table(name = "Dish")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"category"})
@ToString(exclude = {"category"})
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @SequenceGenerator(name = "seq", sequenceName = "dish_id_seq")
    private int id;
    private String title;
    private String description;
    private String image;
    private int price;
    private boolean sale;
    private int discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
