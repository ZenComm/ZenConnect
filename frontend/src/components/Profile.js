import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    physicalAddress: '',
    workExperience: [],
    technicalSkills: [],
    image: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get('/api/profile')
     .then(response => {
        setProfile(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    axios.put('/api/profile', profile)
     .then(response => {
        setEditing(false);
      })
     .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({...profile, [name]: value });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{profile.fullName}</h1>
        {editing? (
          <button className="button save-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="button" onClick={handleEdit}>Edit Profile</button>
        )}
      </div>
      <div className="profile-content">
        <div className="profile-section">
                  <h2>Image</h2>
                  <img src={profile.image} alt="Profile Image" />
                  {editing? (
                    <input type="file" name="image" onChange={handleChange} />
                  ) : null}
                </div>
        <div className="profile-section">
          <h2>Contact Information</h2>
          <ul>
            <li>
              <label>Full Name:</label>
              <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} disabled={!editing} />
            </li>
            <li>
              <label>Email:</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editing} />
            </li>
            <li>
              <label>Phone Number:</label>
              <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} disabled={!editing} />
            </li>
            <li>
              <label>Physical Address:</label>
              <textarea name="physicalAddress" value={profile.physicalAddress} onChange={handleChange} disabled={!editing} />
            </li>
          </ul>
        </div>
        <div className="profile-section">
          <h2>Work Experience</h2>
          <ul>
            {profile.workExperience && profile.workExperience.map((experience, index) => (
              <li key={index}>
                <label>Company:</label>
                <input type="text" name={`workExperience[${index}].company`} value={experience.company} onChange={handleChange} disabled={!editing} />
                <label>Job Title:</label>
                <input type="text" name={`workExperience[${index}].jobTitle`} value={experience.jobTitle} onChange={handleChange} disabled={!editing} />
                <label>Duration:</label>
                <input type="text" name={`workExperience[${index}].duration`} value={experience.duration} onChange={handleChange} disabled={!editing} />
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-section">
          <h2>Technical Skills</h2>
          <ul>
            {profile.technicalSkills && profile.technicalSkills.map((skill, index) => (
              <li key={index}>
                <label>Skill:</label>
                <input type="text" name={`technicalSkills[${index}].skill`} value={skill.skill} onChange={handleChange} disabled={!editing} />
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Profile;