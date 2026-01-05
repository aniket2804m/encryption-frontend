import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  const encryptData = async () => {
    const res = await axios.post("http://localhost:5000/encrypt", {
      text,
    });
    setEncrypted(res.data.encryptedText);
    setDecrypted("");
  };

  const decryptData = async () => {
    const res = await axios.post("http://localhost:5000/decrypt", {
      encryptedText: encrypted,
    });
    setDecrypted(res.data.originalText);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          
          <div className="card shadow-lg rounded-4">
            <div className="card-header bg-primary text-white text-center">
              <h4>🔐 Encryption & Decryption</h4>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Enter Text</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type something..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between mb-3">
                <button
                  className="btn btn-success w-45"
                  onClick={encryptData}
                >
                  Encrypt
                </button>

                <button
                  className="btn btn-warning w-45"
                  onClick={decryptData}
                  disabled={!encrypted}
                >
                  Decrypt
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label">Encrypted Text</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={encrypted}
                  readOnly
                />
              </div>

              <div>
                <label className="form-label">Decrypted Text</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={decrypted}
                  readOnly
                />
              </div>
            </div>

            <div className="card-footer text-center text-muted">
              AES Encryption using React & Node.js
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
