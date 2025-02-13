import React, { useContext, useState, useEffect } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [username, setUsername] = useState("");


    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        console.log("Stored Username:", storedUsername);
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [])


    const {addToUserHistory} = useContext(AuthContext);
    
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>

            <div className="navBar">

                <div style={{ display: "flex", alignItems: "center" }}>

                    <h2>NexusMeet</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                     

                    <IconButton onClick={
                        () => {
                            navigate("/history")
                        }
                    }>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }} className="homeLogout">
                        Logout
                    </Button>

                    <AccountCircleIcon />
                    <p className="username">{username}</p>
                    
                </div>


            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Experience seamless communication and collaboration with <b className="nexusmeet">NexusMeet</b> vedio call.</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>

                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.webp' alt="" />
                </div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent);