import {
    Input,
    Button
} from "@chakra-ui/react";
import { Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";

const CallOnline = () => {
    const videoRemote = useRef();
    const videoCurrentUser = useRef();
    const peerInstance = useRef();
    const [peerId, setPeerId] = useState(null);
    const [remotePeerValue, setRemotePeerValue] = useState();
    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (id)=> {
            setPeerId(id);
        });
        peer.on("call", (call)=> {
            var getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
            getUserMedia(
                { video: true, audio: true },
                (stream) =>{
                    videoCurrentUser.current.srcObject = stream;
                    videoCurrentUser.current.play();
                    call.answer(stream);
                    call.on('stream', (mediaStream)=> {
                        videoRemote.current.srcObject = mediaStream;
                        videoRemote.current.play();
                    })
                }
            );
        });
        peerInstance.current = peer;
    }, []);
    const call = (remotePeerId) => {
        var getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
        getUserMedia(
            { video: true, audio: true },
            (stream) =>{
                videoCurrentUser.current.srcObject = stream;
                videoCurrentUser.current.play();
                var call = peerInstance.current.call(remotePeerId, stream);
                call.on("stream", (remoteStream)=> {
                    videoRemote.current.srcObject = remoteStream;
                    videoRemote.current.play();
                });
            },
            function (err) {
                console.log("Failed to get local stream", err);
            }
        );
    };
    return (
        <>
            <h1>{peerId}</h1>
            <Input type={'text'} value={remotePeerValue} onChange={e => setRemotePeerValue(e.target.value)} />
            <Button onClick={call}>Call</Button>
            <video ref={videoCurrentUser} autoPlay></video>
            <video ref={videoRemote} autoPlay></video>
        </>
    );
};
export default CallOnline;
