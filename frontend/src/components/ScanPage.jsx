import React, { useState } from "react";
import "./ScanPage.css";



const ScanPage = () => {
    const [url, setUrl] = useState('')
    const [ip, setIP] = useState('')
    const [loding, setLoding] = useState(false);
    const [lodingIP, setLodingIP] = useState(false);
    const [disable, setDisable] = useState(false)
    const [disableIP, setDisableIP] = useState(false)
    const [urlData, setUrlData] = useState('')
    const [ipData, setIpData] = useState('')

    const API_KEY = "Shivam200@123";

    const handleSubmit = async () => {

        setLoding(true)
        setDisable(true);
        try {
            const res = await fetch('http://localhost:5000/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY
                },
                body: JSON.stringify({ url }),
            });
            const data = await res.json();
            console.log(data)
            if (res.ok) {
                setUrlData(data)
                setLoding(false)
                setDisable(false)
            }
            // setResult(res.data);
        } catch (err) {
            alert('Scan failed: ')
            setLoding(false)
            setDisable(false)
        }
    };

    const scanIp = async () => {
        setLodingIP(true)
        setDisableIP(true)
        setUrlData('')
        try {
            const res = await fetch('http://localhost:5000/scan_ip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': API_KEY,
                },
                body: JSON.stringify({ ip }),
            });

            const data = await res.json();
            console.log("IP DATA:", data)
            if (res.ok) {
                setIpData(data)
                setLodingIP(false)
                setDisableIP(false)
            }
        } catch (err) {
            alert('Error scanning IP: ' + err.message);
            setLodingIP(false)
            setDisableIP(false)
        }
    };
    return (
        <>
            <div className="video-con">
                <video autoPlay loop muted playsInline className="video-back">
                    <source src="/videoplayback.mp4" type="video/mp4" />
                    your browser not support
                </video>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1 className="logo">VULN-SCANNER BY SHIVAM</h1>
                </div>
                <div className="scan-page">
                    <h2>Start a New Scan</h2>

                    <div className="scan-form">
                        <div className="form-group">
                            <label htmlFor="url">Check via URL:</label>
                            <input type="text" id="url" name="url" placeholder="https://example.com" onChange={(e) => setUrl(e.target.value)} required />
                            <button className={`${disable ? 'disable' : 'submit-button'}`} onClick={handleSubmit} disabled={disable}>{loding ? 'Scaning Start...' : 'Scan URL'}</button>
                        </div>
                        <h3>OR</h3>
                        <div className="form-group">
                            <label htmlFor="ip">Check via IP:</label>
                            <input type="text" id="ip" name="ip" placeholder="192.168.1.1" onChange={(e) => setIP(e.target.value)} />
                            <button className={`${disableIP ? 'disable' : 'submit-button'}`}
                             onClick={scanIp }
                              disabled={disableIP}>{lodingIP ? 'Scaning Start...' : 'Scan IP'}</button>
                        </div>

                    </div>
                    <div className="result-box">
                        {urlData === '' ? 
                            <div className="result-ip">
                                <h3>Scan Result:</h3>
                                <pre style={{color:'white'}}>{JSON.stringify(ipData, null, 2)}</pre>
                            </div>
                        : 
                            <div className="result">
                                <h3>Scan Result:</h3>
                                <pre style={{color:'white'}}>{JSON.stringify(urlData, null, 2)}</pre>
                            </div>
                        
                        }</div>

                {/* {urlData && <ResultBox result={urlData} />} */}

            </div>
        </div >
        </>
    );
};

export default ScanPage;
// {urlData && (
// <div className="result-box">
//                     <h3>Scan Result:</h3>
//                     <pre>{JSON.stringify(urlData, null, 2)}</pre>
//                     </div>
//             )}
