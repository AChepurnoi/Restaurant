package com.graniumhub.data.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Created by Sasha on 3/27/17.
 */
@Entity
@Table(name = "Category")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"dishes"})
public class Category {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    @NotNull
    private String title;
    @NotNull
    private String image;


    @OneToMany(cascade = CascadeType.REMOVE,orphanRemoval = true, mappedBy = "category")
    private Set<Dish> dishes;

}
