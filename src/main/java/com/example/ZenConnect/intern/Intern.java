package com.example.ZenConnect.intern;
import jakarta.persistence.*;

@Entity
@Table
public class Intern {
    @Id
    @SequenceGenerator(
            name = "intern_sequence",
            sequenceName = "intern_sequence",
            allocationSize = 1
    )

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )

    private long id;
    private String firstName;
    private String LastName;
    private String email;

    public Intern() {
    }

    public Intern(long id) {
        this.id = id;
    }

    public Intern(long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        LastName = lastName;
        this.email = email;
    }

    public Intern(String firstName, String lastName, String email) {
        this.firstName = firstName;
        LastName = lastName;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

