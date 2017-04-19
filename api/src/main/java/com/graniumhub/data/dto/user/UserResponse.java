package com.graniumhub.data.dto.user;

import com.graniumhub.data.dto.order.OrderResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;

/**
 * Created by Sasha on 3/28/17.
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private int id;
    private String login;
    private String email;
    private String phone;
    private boolean admin;
    private List<OrderResponse> orders = Collections.emptyList();
}
