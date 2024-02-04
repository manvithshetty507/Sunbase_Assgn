package com.jwt.demo.mapper;


import com.jwt.demo.DTO.SignUpDto;
import com.jwt.demo.DTO.UserDto;
import com.jwt.demo.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
