package com.example.ZenConnect.group;

import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    public Group createGroup(String name) {
        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("Group name cannot be null or empty");
        }
        Group group = new Group(name);
        return groupRepository.save(group);
    }

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }
}
