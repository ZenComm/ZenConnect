import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useHistory, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const { userId, full_name, token } = location.state || {};

  const [notice, setNotice] = useState({
    message: "",
    date: new Date(),
  });

  const [session, setSession] = useState({
    firstname: "",
    lastname: "",
  });

  const [msg, setMsg] = useState("");
  const [employees, setEmployees] = useState([
    { id: 1, name: "", surname: "" },
    { id: 2, name: "", surname: "" },
  ]);

  const [userComp, setUserComp] = useState([
    {
      comp_id: 1,
      comp_about: "",
      comp_message: "",
      date: new Date(),
      seen: 1,
    },
    {
      comp_id: 2,
      comp_about: "",
      comp_message: "",
      date: new Date(),
      seen: 0,
    },
  ]);

  const [messages, setMessages] = useState([]);


  const [compAboutUser, setCompAboutUser] = useState([
    {
      comp_from: "",
      comp_message: "",
      date: new Date(),
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
      e.preventDefault();
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
      console.log(userId);

      try {
        const response = await fetch("http://localhost:8080/api/resumes/upload/13", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const result = await response.text();
          console.log("File uploaded successfully:", result);
          setMsg("Resume uploaded successfully!");
        } else {
          console.error("Failed to upload file");
          setMsg("Failed to upload resume.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setMsg("Error uploading resume.");
      }
    };

  const [activeTab, setActiveTab] = useState("public");

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    profilePicture: "",
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

  const messageRef = useRef(null);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    // Check if the form element exists before accessing its value
    const messageContent = e.target.elements.comp_message ? e.target.elements.comp_message.value : '';

    const payload = {
      senderId: userId,
      recipientId: "ZEN_159534c6", // Manager's user id
      content: messageContent,
    };

    try {
      const response = await fetch("http://localhost:8080/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Message sent successfully:", result);
        setMsg("The message was sent successfully!");
        // Clear the textarea
        e.target.elements.comp_message.value = "";
      } else {
        console.error("Failed to send message");
        setMsg("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMsg("Error sending message");
    }
  };

  useEffect(() => {
      if (activeTab === "direct") {
        const fetchMessages = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/messages/getByRecipientId?recipientId=${userId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              // Update state with content, full_name and timestamp
              const formattedMessages = data.map(msg => ({
                  full_name: msg.sender.full_name,
                  content: msg.content,
                  timestamp: msg.timestamp,
              }));
              setMessages(formattedMessages);
            } else {
              console.error("Failed to fetch messages");
            }
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        };

        fetchMessages();
      }
    }, [activeTab, userId, token]);




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
              <button
                  type="submit"
                  className="btn btn-outline-primary"
                >
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
        <strong>{full_name}, </strong>
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

        <h1>Write a new message</h1>
        <br />
        <div
          style={{
            border: "1px solid blue",
            padding: "2%",
            borderRadius: "15px",
          }}
        >
          <form onSubmit={handleSubmitMessage}>
            <div className="container-sm">
              <br />
              <div className="row g-2">
                <div className="col-sm-12">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Message
                    </label>
                    <textarea
                      required
                      name="comp_message"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right" }} className="col-sm-12">
                <button type="submit" className="btn btn-outline-primary">
                  Send
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
                  activeTab === "public" ? "active" : ""
                }`}
                id="nav-home-tab"
                onClick={() => handleTabChange("public")}
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected={activeTab === "public"}
              >
                Public
              </button>
              <button
                className={`nav-link ${
                  activeTab === "direct" ? "active" : ""
                }`}
                id="nav-profile-tab"
                onClick={() => handleTabChange("direct")}
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected={activeTab === "direct"}
              >
                Direct
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            {activeTab === "public" && (
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
            {activeTab === "direct" && (
              <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div className="container-fluid">
                  {messages.length === 0 ? (
                    <h3>No messages found</h3>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className="alert alert-warning alert-dismissible fade show" role="alert">
                        <p><strong>{msg.full_name}</strong> <br />{msg.content}</p>
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
                          {new Date(msg.timestamp).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
