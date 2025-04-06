package edu.neu.csye6200.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponse {

    private String status;
    private String message;
    private Object data;
    private Date time;

    public CommonResponse(String message, Date time) {
        this.message = message;
        this.time = time;
    }
}
