package com.graniumhub.data.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.WhereJoinTable;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by Sasha on 4/20/17.
 */

@Entity
@Table(name = "Orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @SequenceGenerator(sequenceName = "orders_id_seq", name = "seq")
    private int id;

    @Column(name = "order_total")
    private int total;


    private LocalDateTime created;

    @Enumerated(value = EnumType.STRING)
    private OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    private List<OrderItem> items;



}
