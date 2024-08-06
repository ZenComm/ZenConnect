import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'; // Import custom CSS

const Profile = () => {
    const location = useLocation();
    const { userId, token } = location.state || {};
    const history = useHistory();

    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        physicalAddress: '',
        workExperience: [],
        technicalSkills: [],
        image: ''
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/profiles/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        if (userId && token) {
            fetchProfile();
        } else {
            console.error('User ID or token missing');
        }
    }, [userId, token]);

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
            await axios.put(`http://localhost:8080/api/profiles/${userId}`, profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            history.push(`/dashboard`);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="container my-5">
            <div className="card shadow-sm border-0 profile-card">
                <div className="card-body">
                    <div className="profile-header bg-primary text-white p-3 mb-4">
                        <div className="d-flex align-items-center">
                            <div className="profile-image-container me-4">
                                {profile.image ? (
                                    <img
                                        src={profile.image}
                                        alt="Profile"
                                        className="profile-image rounded-circle" />
                                ) : (
                                    <div className="profile-placeholder bg-light text-center rounded-circle">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="mb-2">{profile.fullName}</h1>
                                <button type="button" className={`btn ${editMode ? 'btn-success' : 'btn-primary'}`} onClick={toggleEditMode}>
                                    {editMode ? 'Save' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <div className={`form-control ${editMode ? '' : 'bg-light'} ${editMode ? '' : 'border-0'}`}>
                                {editMode ? (
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                        value={profile.fullName}
                                        onChange={handleChange} />
                                ) : (
                                    profile.fullName
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className={`form-control ${editMode ? '' : 'bg-light'} ${editMode ? '' : 'border-0'}`}>
                                {editMode ? (
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={profile.email}
                                        onChange={handleChange} />
                                ) : (
                                    profile.email
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <div className={`form-control ${editMode ? '' : 'bg-light'} ${editMode ? '' : 'border-0'}`}>
                                {editMode ? (
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={profile.phoneNumber}
                                        onChange={handleChange} />
                                ) : (
                                    profile.phoneNumber
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="physicalAddress" className="form-label">Physical Address</label>
                            <div className={`form-control ${editMode ? '' : 'bg-light'} ${editMode ? '' : 'border-0'}`}>
                                {editMode ? (
                                    <input
                                        type="text"
                                        id="physicalAddress"
                                        name="physicalAddress"
                                        className="form-control"
                                        value={profile.physicalAddress}
                                        onChange={handleChange} />
                                ) : (
                                    profile.physicalAddress
                                )}
                            </div>
                        </div>

                        {editMode && profile.workExperience.map((work, index) => (
                            <div key={index} className="mb-3 border p-3 rounded">
                                <label htmlFor={`company-${index}`} className="form-label">Company</label>
                                <input
                                    type="text"
                                    id={`company-${index}`}
                                    name="company"
                                    className="form-control"
                                    value={work.company}
                                    onChange={(e) => handleWorkExperienceChange(index, e)} />
                                <label htmlFor={`dateStarted-${index}`} className="form-label">Date Started</label>
                                <input
                                    type="date"
                                    id={`dateStarted-${index}`}
                                    name="dateStarted"
                                    className="form-control"
                                    value={work.dateStarted}
                                    onChange={(e) => handleWorkExperienceChange(index, e)} />
                                <label htmlFor={`dateEnded-${index}`} className="form-label">Date Ended</label>
                                <input
                                    type="date"
                                    id={`dateEnded-${index}`}
                                    name="dateEnded"
                                    className="form-control"
                                    value={work.dateEnded}
                                    onChange={(e) => handleWorkExperienceChange(index, e)} />
                                <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveWorkExperience(index)}>Remove</button>
                            </div>
                        ))}

                        {editMode && (
                            <button type="button" className="btn btn-secondary mt-2" onClick={handleAddWorkExperience}>Add Work Experience</button>
                        )}

                        {editMode && (
                            <div className="mb-3">
                                <label htmlFor="technicalSkills" className="form-label">Technical Skills</label>
                                <textarea
                                    id="technicalSkills"
                                    name="technicalSkills"
                                    className="form-control"
                                    value={profile.technicalSkills.join(', ')}
                                    onChange={(e) => setProfile({ ...profile, technicalSkills: e.target.value.split(', ') })}></textarea>
                            </div>
                        )}

                        {editMode && (
                            <>
                                <button type="button" className="btn btn-info">Attach CV</button>
                                <button type="submit" className="btn btn-success mt-3">Save Profile</button>
                            </>
                        )}

                        {!editMode && (
                            <>
                                <div className="mb-3">
                                    <h3 className="text-primary">Work Experience</h3>
                                    {profile.workExperience.map((work, index) => (
                                        <div key={index} className="border p-3 rounded mb-2">
                                            <p><strong>Company:</strong> {work.company}</p>
                                            <p><strong>Date Started:</strong> {work.dateStarted}</p>
                                            <p><strong>Date Ended:</strong> {work.dateEnded}</p>
                                        </div>
                                    ))}
                                </div>
                                <p><strong>Technical Skills:</strong> {profile.technicalSkills.join(', ')}</p>
                                <button type="button" className="btn btn-primary mt-3" onClick={toggleEditMode}>Edit Profile</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
