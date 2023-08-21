import React from 'react';
import "./searchbar.css";
import search from "../../Images/search-normal.png";
import searchCalender from "../../Images/calendar-2.png";
import message from "../../Images/message-question.png";
import notification from "../../Images/notification.png";
import profile from "../../Images/profile-img.png";

const SearchBar = () => {
    return (
        <div className='app_searchbar'>
            <div className="app_searchbar_input">
                <img src={search} alt="Search icon" />
                <input type="text" placeholder='Search for anything...' />
            </div>

            <div className="app_searchbar_info">
                <div className="app_searchbar_icons">
                    <img src={searchCalender} alt="calender" />
                    <img src={message} alt="query message" />
                    <img src={notification} alt="notification" />
                </div>

                <div className="app_searchbar_profile">
                    <div className="profile_name-info">
                        <p className="profile_name">Anima Agarwal</p>
                        <p className="profile_location">U.P, India</p>
                    </div>

                    <img src={profile} alt="profile picture" />
                </div>

            </div>

        </div>
    )
}

export default SearchBar
