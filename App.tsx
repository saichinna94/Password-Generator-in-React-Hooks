import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // UseRef
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumberAllowed) {
      str += "0123456789";
    }
    if (isCharAllowed) {
      str += " ! @ # $ % ^ & * ( ) - _ = +  | [  ] { } ; : / ? . >";
    }

    for (let i = 1; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed]);

  const copyPasswordtoOurClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 6);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);
  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-xl
      my-8 text-orange-400 bg-gray-600 px-4 py-3"
      >
        <h1 className="text-3xl text-center text-white my-3">
          Password Generator
        </h1>
        <div className="flex rounded-xl shadow-md overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            style={{ backgroundColor: "white" }}
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoOurClipboard}
            className="outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={10}
              max={80}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id="numInput"
              defaultChecked={isNumberAllowed}
              // onChange={() => {
              //   setIsNumberAllowed(true);
              // }}
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name=""
              id="charInput"
              defaultChecked={isCharAllowed}
              // onChange={() => {
              //   setIsNumberAllowed(true);
              // }}
              onChange={() => {
                setIsCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Charatcers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
