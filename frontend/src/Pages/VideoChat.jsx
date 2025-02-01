import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const VideoChat = () => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [canJoin, setCanJoin] = useState(false);
  const [roomId, setRoomId] = useState("");
  const videoGridRef = useRef(null);
  const myVideoRef = useRef(null);
  const peersRef = useRef({});
  const socketRef = useRef(null);
  const myPeerConnection = useRef(null);

  const token = localStorage.getItem("token"); // or sessionStorage if you prefer

  const scheduleMeeting = async () => {
    try {
      const res = await axios.post(
        "/api/meetings",
        { title, startTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Meeting scheduled:", res.data);
      setMeetingId(res.data.id);
      setRoomId(res.data.id);
    } catch (err) {
      console.error("Error scheduling meeting:", err);
    }
  };

  const checkMeeting = async () => {
    try {
      const res = await axios.get(`/api/meetings/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Meeting status:", res.data);
      setCanJoin(res.data.canJoin);
      if (res.data.canJoin) {
        setRoomId(meetingId);
      }
    } catch (err) {
      console.error("Error checking meeting:", err);
    }
  };

  useEffect(() => {
    if (roomId) {
      socketRef.current = io("http://localhost:3000");

      socketRef.current.on("meeting-start", (data) => {
        console.log("Meeting started:", data);
        if (data.id === roomId) {
          setCanJoin(true);
        }
      });

      if (canJoin) {
        myPeerConnection.current = new RTCPeerConnection();

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
          myVideoRef.current.srcObject = stream;
          stream.getTracks().forEach((track) => {
            myPeerConnection.current.addTrack(track, stream);
          });

          socketRef.current.emit("join-room", roomId, socketRef.current.id);

          socketRef.current.on("user-connected", (userId) => {
            console.log("User connected:", userId);
            const call = myPeerConnection.current.createOffer();
            call.then((offer) => {
              myPeerConnection.current.setLocalDescription(offer);
              socketRef.current.emit("offer", offer, userId);
            });
          });

          socketRef.current.on("offer", (offer, userId) => {
            console.log("Received offer:", offer);
            myPeerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = myPeerConnection.current.createAnswer();
            answer.then((ans) => {
              myPeerConnection.current.setLocalDescription(ans);
              socketRef.current.emit("answer", ans, userId);
            });
          });

          socketRef.current.on("answer", (answer) => {
            console.log("Received answer:", answer);
            myPeerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
          });

          socketRef.current.on("user-disconnected", (userId) => {
            console.log("User disconnected:", userId);
            if (peersRef.current[userId]) {
              peersRef.current[userId].close();
            }
          });
        });
      }
    }
  }, [canJoin, roomId]);

  return (
    <div>
      <h1>Video Conferencing</h1>
      {/* Schedule a new meeting */}
      <div>
        <input 
          type="text" 
          placeholder="Meeting Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="datetime-local" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
        />
        <button onClick={scheduleMeeting}>Schedule Meeting</button>
      </div>
      {/* Check meeting status */}
      <div>
        <input 
          type="text" 
          placeholder="Meeting ID" 
          value={meetingId} 
          onChange={(e) => setMeetingId(e.target.value)} 
        />
        <button onClick={checkMeeting}>Check Meeting</button>
        {canJoin && <p>You can now join the meeting!</p>}
      </div>
      {/* Video Grid */}
      <div ref={videoGridRef}>
        <video ref={myVideoRef} autoPlay playsInline muted />
      </div>
    </div>
  );
};

export default VideoChat;