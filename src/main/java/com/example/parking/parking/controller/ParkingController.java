package com.example.parking.parking.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.parking.parking.model.ParkingDTO;


@RequestMapping("/parking")
@Controller
public class ParkingController {
    ParkingDTO parkingDTO = new ParkingDTO();

    @PostMapping("/info")
    @ResponseBody
    public ParkingDTO info() {
        // System.out.println(parkingDTO);
        return parkingDTO;
    }

    @PostMapping("/update")
    @ResponseBody
    public Map<String, Object> update(@RequestBody Map<String, int[]> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        parkingDTO.setIsBlanks(map.get("parkingInfo"));
        // System.out.println(map);
        result.put("code", "200");
        return result;
    }
}
