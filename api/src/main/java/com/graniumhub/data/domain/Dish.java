package com.graniumhub.data.domain;

import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

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
@Builder
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

    @ManyToOne(fetch = FetchType.EAGER)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "dish")
    private List<CartItem> cartItems;

    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "dish")
    private List<OrderItem> orderItems;
}
