//package com.example.ZenConnect.group;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/group")
//public class GroupController {
//
//    @Autowired
//    private GroupService groupService;
//
//    @PostMapping
//    @PreAuthorize("hasRole('MANAGER')")
//    public Group createGroup(@RequestBody GroupDTO groupDTO) {
//        return groupService.createGroup(groupDTO.getName());
//    }
//}
