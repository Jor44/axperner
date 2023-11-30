import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import axios from "./api/axios";
// import  registerUser  from "./userService";
// import ApiService from "./apiService";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://localhost:8080/api/users/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValdiMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValdiMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called")
        // If the button is enabled through a JS hack,
        // recheck the patterns before submitting.
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        console.log(v1,v2)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
    
        try {
            
            const userData = { username: user, password: pwd }; // Assuming these are the fields expected by your backend

            const response = await axios.post(REGISTER_URL, userData);
            console.log("Response from backend:", response.data);
            console.log(response.data); // Here you would probably do more with the response, like redirecting the user
            setSuccess(true); // If registration is successful, you can set a flag to display a success message or redirect
            // ... any additional logic for a successful registration
        } catch (err) {
            console.error("Error during registration:", err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus(); // Focus on the error message for accessibility reasons
        }
    }
    
    return (
        <>
            {
                success ? (
                    <section>
                        <h1>Success!</h1>
                        <p style={{ textAlign: "center" }}>
                            <a href="#">Sign In</a>
                        </p>
                    </section>
                ) : (

                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" :
                            "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>REGISTER</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon className="icon" icon={faCheck} />
                                </span>
                                <span className={validName || !user ? "hide" :
                                    "invalid"}>
                                    <FontAwesomeIcon className="icon" icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user &&
                                !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label htmlFor="password">
                                Password:
                                <span className={validPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon className="icon" icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? "hide" :
                                    "invalid"}>
                                    <FontAwesomeIcon className="icon" icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus &&
                                !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special
                                character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span>
                                <span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span>
                                <span aria-label="percent">%</span>
                            </p>

                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon className="icon" icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" :
                                    "invalid"}>
                                    <FontAwesomeIcon className="icon" icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus &&
                                !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon className="icon" icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign up</button>
                        </form>
                        <p className="already">
                            Already registered?<br />
                            <span className="line">
                                {/* react router */}
                                <a href="#">Sign in</a>
                            </span>
                        </p>
                    </section>
                )}
        </>
    )
}

export default Register