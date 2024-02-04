package com.jwt.demo.controller;

import com.jwt.demo.DTO.CustomerDto;
import com.jwt.demo.entity.Customer;
import com.jwt.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> list;
        try {
            list = customerService.getAll();
            return new ResponseEntity<>(list, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCustomer(@RequestBody CustomerDto customerDto) {
        Customer customer;
        try{
            customer = customerService.addCustomer(customerDto);
            return new ResponseEntity<>("Added",HttpStatus.ACCEPTED);
        }catch(Exception e) {
            return new ResponseEntity<>("failed",HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/addAll")
    public ResponseEntity<String> addAllCustomers(@RequestBody List<CustomerDto> customerDtos) {
        try {
            Optional<List<Customer>> customers = customerService.addAllCustomers(customerDtos);
            return new ResponseEntity<>("Added",HttpStatus.ACCEPTED);
        }catch(Exception e) {
            return new ResponseEntity<>("failed",HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Customer> getById(@PathVariable("id") UUID uuid) {
        Optional<Customer> customer;
        try{
            customer = customerService.getByID(uuid);
            //if there is customer in db only then return customer

            if(customer.isPresent()) {
                return new ResponseEntity<>(customer.get(),HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteByID(UUID uuid) {
        try {
            customerService.deleteByID(uuid);
            return new ResponseEntity<>("Success",HttpStatus.ACCEPTED);
        }catch(Exception e) {
            return new ResponseEntity<>("failed",HttpStatus.BAD_REQUEST);
        }
    }
}
