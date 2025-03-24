"use client";

import React, { useRef, useEffect } from "react";

export default function ReceiptScanner() {

  const inputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const base64String = await toBase64(file);
      const base64Data = base64String.split(",")[1];

      await fetch("http://localhost:4008/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: base64Data })
      }).then(response => response.json())
        .then(async data => {
          console.log(data.text);
          await fetch("http://localhost:4008/extract_cost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: data.text })
          }).then(response => response.json())
            .then(data => {
              console.log(data);
            })
        })
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    console.log("trigger", inputRef);
    if (!inputRef) return;
    console.log("set event listener");
    inputRef.current.addEventListener('change', handleFileChange);
  }, [inputRef])

  return (
    <div className={"page"}>
      <label>
        <input type="file" ref={inputRef} />
      </label>
    </div>
  );
}
