import Header from '../components/Header';
import './Profile.css';

function Profile() {
    return (
        <div>
            <Header />
            <div className='profileContainer'>
                <div className='profileSection'>
                    <div className='userInfos'>
                        <div className='avatarUsername'>
                            <img src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar' className='avatar'/>
                            <h2>Username</h2>
                        </div>
                        <div className='userDetails'>
                            <div className='userDetail'>
                                <h3>First Name</h3>
                                <p>John</p>
                            </div>
                            <div className='userDetail'>
                                <h3>Last Name</h3>
                                <p>Doe</p>
                            </div>
                            <div className='userDetail'>
                                <h3>Email</h3>
                            </div>
                        </div>
                    </div>
                    <div className='previousQuestions'>
                    </div>
                    <div className='followedQuestions'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;