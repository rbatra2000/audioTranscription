"use client";

import React, { useState } from "react";
import { Player } from "./webvtt";
import "./style.css";
// TODO: eventually implement jszip

export default function Transcript() {
  const [audioFile, setAudio] = useState();
  const [transcript, setTranscript] = useState();

  const [audioSrc, setAudioSrc] = useState("");
  const [transcriptSrc, setTranscriptSrc] = useState();

  const [ready, setReady] = useState(false);

  const handleAudioFileChange = (e) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
    }
  };

  const handleTranscriptFileChange = (e) => {
    if (e.target.files) {
      setTranscript(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // TODO: need to add error handling (what if they don't upload right file type)
    if (audioFile && transcript) {
      var reader = new FileReader();

      reader.onload = function (evt) {
        var binary = "";
        var bytes = new Uint8Array(reader.result);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        const base64String = btoa(binary);
        const dataURI = String(`data:${audioFile.type};base64,${base64String}`);

        setAudioSrc(dataURI);
      };

      reader.readAsArrayBuffer(audioFile);

      var transcriptReader = new FileReader();

      transcriptReader.onload = function (evt) {
        var binary = "";
        var bytes = new Uint8Array(transcriptReader.result);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        const base64String = btoa(binary);
        const dataURI = String(`data:${transcript.type};base64,${base64String}`);
        console.log(dataURI)

        setTranscriptSrc(dataURI);
      };

      transcriptReader.readAsArrayBuffer(transcript);
    }
  };

  return (
    <div className="recordings">
      <header>Audio Recordings Viewer</header>
      <div>
        <label htmlFor="audioFile">Audio File (mp3/m4a):&nbsp;</label>
        <input id="audioFile" type="file" onChange={handleAudioFileChange} />
      </div>
      <div>
        <label htmlFor="transcript">Transcript (vtt):&nbsp;</label>
        <input
          id="transcript"
          type="file"
          onChange={handleTranscriptFileChange}
        />
      </div>

      {audioFile && (
        <section>
          Audio File details:
          <ul>
            <li>Name: {audioFile.name}</li>
            <li>Type: {audioFile.type}</li>
            <li>Size: {audioFile.size} bytes</li>
          </ul>
        </section>
      )}

      {audioFile && transcript && (
        <button onClick={handleUpload}>Upload files</button>
      )}

      {audioSrc && transcriptSrc && (
        <Player
          id="webvtt-player"
          audio={audioSrc}
          transcript={transcriptSrc}
        />
      )}
    </div>
  );
}
