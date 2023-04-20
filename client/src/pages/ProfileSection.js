import React, { useState } from "react";
import "../styles/Profilesectionstyles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { Row } from "antd";

const ProfileSection = () => {
    const User = useSelector((state) => state.user.user);
    console.log(User);
    const avatarUrl = process.env.PUBLIC_URL + "/avatarimage.png";
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Check if the current password is correct
        try {
            const data = await axios.post("/api/v1/user/checkpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    password: currentPassword,
                    email: User.email,
                },
            });

            if (!data.data.success) {
                alert("Current password is incorrect");
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }

        // Update the password in the backend
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        try {
            const data = await axios.post("/api/v1/user/changepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    newpassword: newPassword,
                    email: User.email,
                },
            });

            if (data.data.success) {
                alert("Password changed successfully");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                alert("Unable to change password");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <h1 className="text-center">Profile</h1>
            <div className="profile-container">
                <div className="profile-section">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <img src={avatarUrl} alt="User Avatar" />
                            <div className="user-name-box">
                                <h1>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {User.name}
                                </h1>
                            </div>

                            <h6>&nbsp;&nbsp;&nbsp;&nbsp;{User.email}</h6>
                        </div>
                    </div>

                    <div className="change-password">
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group">
                                <h5>Change Password</h5>
                                <div>
                                    <label htmlFor="currentPassword">
                                        Current Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="newPassword">
                                        New Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div>
                                    <label htmlFor="confirmPassword">
                                        Confirm Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="change-password-btn">
                                <button type="submit" className="btn btn-primary">Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfileSection;
