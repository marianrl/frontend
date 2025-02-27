import React from 'react';
import './style.css';
import Imag from '../../img/perfil.png';

interface UserProfileProps {
  name: string;
}
const UserProfile: React.FC<UserProfileProps> = ({ name }) => {
  return (
    <div className="body">
      <div className="container">
        <div className="main-content">
          <div className="write-post-container">
            <div className="user-profile">
              <img src={Imag} alt="User Profile" />
              <div>
                <p>{name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
