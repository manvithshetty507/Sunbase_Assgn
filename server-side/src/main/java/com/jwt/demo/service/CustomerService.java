package com.jwt.demo.service;

import com.jwt.demo.DTO.CustomerDto;
import com.jwt.demo.entity.Customer;
import com.jwt.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    public List<Customer> getAll() {
        //pageable implementation

        int pageSize = 20;
        int pageNumber  = 1;
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.unsorted());
        Page<Customer> pageCustomers = customerRepository.findAll(pageable);
        List<Customer> customers = pageCustomers.getContent();
        return customerRepository.findAll();
    }

    public Customer addCustomer(CustomerDto customerDto) {
        //convert Dto to Customer instance

        Customer customer = Customer.builder()
                .first_name(customerDto.getFirst_name())
                .last_name(customerDto.getLast_name())
                .street(customerDto.getStreet())
                .address(customerDto.getAddress())
                .state(customerDto.getState())
                .city(customerDto.getCity())
                .email(customerDto.getEmail())
                .phone(customerDto.getPhone())
                .build();

        Customer save = customerRepository.save(customer);
        return customer;
    }

    public Optional<Customer> getByID(UUID uuid) {

        try {
            Optional<Customer> customer = customerRepository.findByUuid(uuid);
            return customer;
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public void deleteByID(UUID uuid) {
        customerRepository.deleteByUuid(uuid);
    }

    public Optional<List<Customer>> addAllCustomers(List<CustomerDto> customerDtos) {
        try {
            // Convert List<CustomerDto> to List<Customer>
            List<Customer> customersToSave = customerDtos.stream()
                    .map(customerDto -> Customer.builder()
                            .first_name(customerDto.getFirst_name())
                            .last_name(customerDto.getLast_name())
                            .street(customerDto.getStreet())
                            .address(customerDto.getAddress())
                            .state(customerDto.getState())
                            .city(customerDto.getCity())
                            .email(customerDto.getEmail())
                            .phone(customerDto.getPhone())
                            .build())
                    .collect(Collectors.toList());

            //don't want to repeat all customers saved before so deleteAll before saving

            customerRepository.deleteAll();
            // Save all customers and convert the result to a List

            List<Customer> savedCustomers = customerRepository.saveAll(customersToSave);

        return Optional.of(savedCustomers);
        } catch (Exception e) {
            // Handle exceptions and return an empty Optional
            return Optional.empty();
        }
    }

}
