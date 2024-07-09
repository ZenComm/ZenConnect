import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Dashboard = () => {
  const [notice, setNotice] = useState({
    message: "Sample notification message",
    date: new Date(),
  });

  const [session, setSession] = useState({
    firstname: "Lesego",
    lastname: "Molefe",
  });

  const [msg, setMsg] = useState("");
  const [employees, setEmployees] = useState([
    { id: 1, name: "Prince", surname: "Wits" },
    { id: 2, name: "Letago", surname: "Tut" },
  ]);

  const [userComp, setUserComp] = useState([
    {
      comp_id: 1,
      comp_about: "1 Prince Wits",
      comp_message: "Message 1",
      date: new Date(),
      seen: 1,
    },
    {
      comp_id: 2,
      comp_about: "2 Letago TuT",
      comp_message: "Message 2",
      date: new Date(),
      seen: 0,
    },
  ]);

  const [compAboutUser, setCompAboutUser] = useState([
    {
      comp_from: "Prince TuT",
      comp_message: "Message about you 1",
      date: new Date(),
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log("Selected file:", selectedFile);
  };

  const [activeTab, setActiveTab] = useState("complains");

  const [userProfile, setUserProfile] = useState({
    name: "Lesego Molefe",
    email: "lesego.molefe@example.com",
    phone: "+27123456789",
    bio: "I am a passionate software developer with expertise in React and Node.js.",
    skills: "php, java, html, js",
    profilePicture: "icon.jpg",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };
  const [sendAnonymously, setSendAnonymously] = useState(false);

  const toggleSendAnonymously = () => {
    setSendAnonymously(!sendAnonymously);
  };

  return (
    <div>
      <nav
        style={{ display: "space-between", position: "fixed", width: "100%" }}
        className="navbar navbar-expand-lg bg-dark"
      >
        <div style={{ color: "white" }} className="container-md">
          <h1>TeamConnect</h1>
          <div>
            <form onSubmit={handleFileUpload} encType="multipart/form-data">
              <label
                htmlFor="cv-upload"
                className="btn btn-outline-primary mx-2"
              >
                Upload CV
              </label>
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button type="submit" className="btn btn-outline-primary mx-2">
                Submit
              </button>
              <button type="button" className="btn btn-outline-primary">
                <a
                  style={{ textDecoration: "none", color: "blue" }}
                  href="/"
                >
                  Logout
                </a>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
      <div
        style={{ margin: "7px" }}
        className="alert alert-primary alert-dismissible fade show"
        role="alert"
      >
        <strong>NOTIFICATION</strong>
        <br />
        <br />
        {notice.message}
        <p
          style={{
            margin: "10px",
            textAlign: "right",
            fontSize: "12px",
            backgroundColor: "#0d6efd",
            borderRadius: "7px",
            padding: "7px",
            fontWeight: "700",
            color: "white",
          }}
        >
          {notice.date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <br />
      <div
        style={{ marginLeft: "4%", marginRight: "4%" }}
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>{session.firstname},</strong>
        {msg || "Hope you having a great day 😊😊."}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <br />
      <div style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <h1 style={{ textAlign: "right" }}>
          {session.firstname} {session.lastname}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
            onClick={handleProfileClick}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </h1>
        <div className="progress" style={{ height: "5px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Example 1px high"
            style={{ width: "100%" }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <h1>Write a new complain</h1>
        <br />
        <div
          style={{
            border: "1px solid blue",
            padding: "2%",
            borderRadius: "15px",
          }}
        >
          <form action="add_complain" method="post">
            <div className="container-sm">
              <select
                required
                name="comp_about"
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>
                  Please choose a member to complain about
                </option>
                {employees.map((emp) => (
                  <option
                    key={emp.id}
                    value={`${emp.id} ${emp.name} ${emp.surname}`}
                  >
                    {emp.name} {emp.surname}
                  </option>
                ))}
              </select>
              <br />

              <div className="form-floating mb-3">
                <input
                  required
                  name="date"
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="when did it happen?"
                />
                <label htmlFor="floatingInput">Incident date</label>
              </div>
              <div className="row g-2">
                <div className="col-sm-12">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      What happened?
                    </label>
                    <textarea
                      required
                      name="comp_message"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="container-sm">
                  {/* Other form fields */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="anonymousCheckbox"
                      checked={sendAnonymously}
                      onChange={toggleSendAnonymously}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="anonymousCheckbox"
                    >
                      Send Anonymously
                    </label>
                  </div>
                  {/* Submit button */}
                </div>
              </div>
              <div style={{ textAlign: "right" }} className="col-sm-12">
                <button type="submit" className="btn btn-outline-primary">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
        <br />
        <div className="row g-0 text-center">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className={`nav-link ${
                  activeTab === "complains" ? "active" : ""
                }`}
                id="nav-home-tab"
                onClick={() => handleTabChange("complains")}
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected={activeTab === "complains"}
              >
                Complains
              </button>
              <button
                className={`nav-link ${
                  activeTab === "about-you" ? "active" : ""
                }`}
                id="nav-profile-tab"
                onClick={() => handleTabChange("about-you")}
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected={activeTab === "about-you"}
              >
                About you
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            {activeTab === "complains" && (
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="container-fluid">
                  {userComp.length === 0 ? (
                    <h3>No complaints posted</h3>
                  ) : (
                    userComp.map((comp) => (
                      <div
                        key={comp.comp_id}
                        className={`alert ${
                          comp.seen === 1 ? "alert-success" : "alert-warning"
                        } alert-dismissible fade show`}
                        role="alert"
                      >
                        <strong>{comp.comp_about}</strong> {comp.comp_message}
                        <hr />
                        <p
                          style={{
                            textAlign: "right",
                            fontSize: "12px",
                            backgroundColor: "#0d6efd",
                            borderRadius: "7px",
                            padding: "7px",
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          {new Date(comp.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {activeTab === "about-you" && (
              <div
                className="tab-pane fade show active"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="container-fluid">
                  {compAboutUser.length === 0 ? (
                    <h3>No complaints about you</h3>
                  ) : (
                    compAboutUser.map((comp, index) => (
                      <div
                        key={index}
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>{comp.comp_from}</strong> {comp.comp_message}
                        <hr />
                        <p
                          style={{
                            textAlign: "right",
                            fontSize: "12px",
                            backgroundColor: "#0d6efd",
                            borderRadius: "7px",
                            padding: "7px",
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          {new Date(comp.date).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showProfileModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseProfileModal}
                ></button>
              </div>
              <div className="modal-body d-flex justify-content-center">
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    textAlign: "center",
                    margin: "auto",
                    border: "2px solid blue",
                  }}
                >
                  <img
                    src={userProfile.profilePicture}
                    className="card-img-top"
                    alt="Profile"
                  />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ marginBottom: "0", fontSize: "1.2rem" }}
                    >
                      {userProfile.name}
                    </h5>
                    <div className="card-text" style={{ textAlign: "left" }}>
                      <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                        <strong>Email:</strong> {userProfile.email}
                      </p>
                      <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                        <strong>Phone:</strong> {userProfile.phone}
                      </p>
                      <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                        <strong>Bio:</strong> {userProfile.bio}
                      </p>
                      <p style={{ margin: "5px 0", fontSize: "1rem" }}>
                        <strong>Skills:</strong> {userProfile.skills}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseProfileModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
