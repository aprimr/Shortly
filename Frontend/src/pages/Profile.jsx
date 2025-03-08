import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfilePic from '../assets/ProfilePic.jpg';
import { IoIosArrowForward } from 'react-icons/io';
import { TbUserEdit } from "react-icons/tb";
import { FaLink, FaChartBar, FaRegThumbsUp } from 'react-icons/fa';

const Profile = () => {
  const user = useSelector((state) => state.auth.user) || {};

  const [fullname, setFullname] = useState(user.fullname || '');
  const [email, setEmail] = useState(user.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const joined = user.joined ? user.joined.split('T',1) : 'Not available';

  const toggleEdit = () => setIsEditing(!isEditing);
  const handleFullnameChange = (e) => setFullname(e.target.value);
  const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleSave = () => {
    if (newPassword && newPassword.length < 8) {
      return;
    }
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    // Show the modal to confirm the password for deleting
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Add your password validation logic here
    if (deletePassword === oldPassword) { // Assuming oldPassword is the current password
      // Perform the delete action
      console.log('Profile deleted');
      setIsModalOpen(false);
    } else {
      console.log('Incorrect password');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative min-w-full bg-gray-900 text-white flex justify-center items-center">
      <div className="max-w-full md:max-w-3xl w-full bg-gray-800 p-6 shadow-xl space-y-6 flex flex-col justify-center">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-3 relative">
          {/* Profile Picture */}
          <div className={`relative ${isEditing ? 'blur-sm' : ''}`}>
            <img
              src={ProfilePic}
              alt="profile-pic"
              className="h-32 w-32 rounded-full object-cover border-2 border-gray-900"
            />
          </div>
          {/* Edit Profile Pic Button */}
          {isEditing && (
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
              <button
                className="flex items-center justify-center bg-gray-900 text-white rounded-full p-3 shadow-md z-50"
              >
                <TbUserEdit className="text-2xl" />
              </button>
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold">{fullname}</h1>
          <p className="text-sm sm:text-lg text-gray-400">@{user.username}</p>
        </div>

        {/* Edit Details */}
        <div className="space-y-4">
          {/* Full Name Edit */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <label htmlFor="fullname" className="text-sm sm:text-lg text-gray-400">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={handleFullnameChange}
              disabled={!isEditing}
              className={`w-full mt-2 px-4 py-2 rounded-lg bg-gray-600 text-sm sm:text-lg text-white focus:outline-none ${
                isEditing ? "focus:ring-2 focus:ring-emerald-500" : "opacity-50 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Email */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <label htmlFor="email" className="text-sm sm:text-lg text-gray-400">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-600 text-sm sm:text-lg text-white opacity-50 cursor-not-allowed"
            />
            {isEditing && <p className='text-[10px] md:text-sm mt-1 text-rose-400'>Email cannot be edited currently.</p>}
          </div>

          {/* Change Password */}
          {isEditing && (
            <div className="bg-gray-700 p-4 rounded-lg space-y-4">
              <label className="text-sm sm:text-lg text-gray-400">Change Password:</label>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-600 text-sm sm:text-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-600 text-sm sm:text-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        {/* Date of Joining */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <label htmlFor="joinedDate" className="text-sm sm:text-lg text-gray-400">Joined Date:</label>
          <input
            type="text"
            id="joinedDate"
            value={joined}
            disabled
            className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-600 text-sm sm:text-lg text-white opacity-50 cursor-not-allowed"
          />
          {isEditing && <p className='text-[10px] md:text-sm mt-1 text-rose-400'>Joined date cannot be edited.</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between items-center">
          {/* Delete */}
          <button
            onClick={handleDeleteProfile}
            className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300 text-sm sm:text-base"
          >
            Delete Profie
          </button>
          {/* Save */}
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-emerald-500 text-gray-900 py-2 px-6 rounded-lg font-semibold hover:bg-emerald-600 transition duration-300 text-sm sm:text-base"
            >
              Save
            </button>
          )}
        </div>

        {/* Status */}
        <div className="bg-gray-700 p-6 rounded-lg ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2">
              <FaLink className="text-emerald-400 text-3xl" />
              <p className="text-sm sm:text-base text-gray-200">Total URLs Shortened</p>
              <p className="text-lg sm:text-2xl text-gray-400">5</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FaChartBar className="text-emerald-400 text-3xl" />
              <p className="text-sm sm:text-base text-gray-200">Top Performer Clicks</p>
              <p className="text-lg sm:text-2xl text-gray-400">555</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FaRegThumbsUp className="text-emerald-400 text-3xl" />
              <p className="text-sm sm:text-base text-gray-200">Total Clicks</p>
              <p className="text-lg sm:text-2xl text-gray-400">1024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="absolute top-4 right-8 flex flex-row gap-1 items-center">
        {/* Conditionally show text and arrow when not editing */}
        {!isEditing && (
          <span className="text-sm md:text-lg text-white flex items-center animate-pulse">Edit Profile<IoIosArrowForward /></span>
        )}
        <button
          onClick={toggleEdit}
          className="flex items-center gap-2 bg-gray-800 rounded-md text-xl sm:text-2xl text-white p-1"
        >
          <TbUserEdit />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl text-white mb-4">Are you sure you want to delete your account?</h2>
            <input
              type="password"
              placeholder="Enter Password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-600 text-sm sm:text-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
