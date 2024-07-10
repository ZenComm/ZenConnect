import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import './Profile.css';
import AuthService from './AuthService';

const Profile = () => {
    let { userId } = useParams();
    let history = useHistory();
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        physicalAddress: '',
        workExperience: [],
        technicalSkills: [],
        image: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await AuthService.getProfile(userId);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleWorkExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newWorkExperience = [...profile.workExperience];
        newWorkExperience[index] = { ...newWorkExperience[index], [name]: value };
        setProfile({ ...profile, workExperience: newWorkExperience });
    };

    const handleAddWorkExperience = () => {
        setProfile({
            ...profile,
            workExperience: [...profile.workExperience, { company: '', dateStarted: '', dateEnded: '' }]
        });
    };

    const handleRemoveWorkExperience = (index) => {
        const newWorkExperience = profile.workExperience.filter((_, i) => i !== index);
        setProfile({ ...profile, workExperience: newWorkExperience });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.updateProfile(userId, profile);
            history('/dashboard');
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={profile.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="physicalAddress">Physical Address</label>
                    <input type="text" id="physicalAddress" name="physicalAddress" value={profile.physicalAddress} onChange={handleChange} />
                </div>
                {profile.workExperience.map((work, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={`company-${index}`}>Company</label>
                        <input type="text" id={`company-${index}`} name="company" value={work.company} onChange={(e) => handleWorkExperienceChange(index, e)} />
                        <label htmlFor={`dateStarted-${index}`}>Date Started</label>
                        <input type="date" id={`dateStarted-${index}`} name="dateStarted" value={work.dateStarted} onChange={(e) => handleWorkExperienceChange(index, e)} />
                        <label htmlFor={`dateEnded-${index}`}>Date Ended</label>
                        <input type="date" id={`dateEnded-${index}`} name="dateEnded" value={work.dateEnded} onChange={(e) => handleWorkExperienceChange(index, e)} />
                        <button type="button" onClick={() => handleRemoveWorkExperience(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddWorkExperience}>Add Work Experience</button>
                <div className="form-group">
                    <label htmlFor="technicalSkills">Technical Skills</label>
                    <input type="text" id="technicalSkills" name="technicalSkills" value={profile.technicalSkills} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="text" id="image" name="image" value={profile.image} onChange={handleChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
