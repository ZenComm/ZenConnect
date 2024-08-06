package com.example.ZenConnect.group;

import com.example.ZenConnect.user.AuthService;
import com.example.ZenConnect.user.Role;
import com.example.ZenConnect.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {
    @Autowired
    private GroupService groupService;

    private static final Logger log = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private RestTemplate restTemplate; // for making HTTP requests

    private static final String USER_ROLE_API = "http://localhost:8080/api/auth/role"; // replace with your API endpoint

    @PostMapping("/create")
    public ResponseEntity<Group> createGroup(@RequestBody GroupRequest groupRequest, @RequestHeader("Authorization") String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> roleResponse = restTemplate.exchange(USER_ROLE_API, HttpMethod.GET, entity, String.class);
            String responseBody = roleResponse.getBody();
            Role userRole = Role.valueOf(responseBody.toUpperCase());

            if (!userRole.equals(Role.MANAGER)) {
                log.info("User role is not MANAGER: {}", userRole);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Group group = groupService.createGroup(groupRequest.getName());
            return ResponseEntity.ok(group);
        } catch (RestClientException e) {
            log.error("Error calling user role API: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }
}