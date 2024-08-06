package com.example.ZenConnect.user;
import com.example.ZenConnect.profile.Profile;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Table(name = "users")
@Entity
public class User {

    @Id
    @GeneratedValue(generator = "prefixed-id")
    @GenericGenerator(name = "prefixed-id", strategy = "com.example.ZenConnect.user.PrefixedIdGenerator")
    private String id;

    @Column(name = "full_name", unique = false, nullable = false)
    private String full_name;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = true)
    private String groupName;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, optional = false)
    private Profile profile;

    public User() {} // no-arg constructor

    public User(String userId) {
        this.id = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}

