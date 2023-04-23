import { useState } from "react";
import desktopBG from "../svg/desktop.jpg";
import mobileBG from "../svg/mobile.jpg";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Signup() {
  const width = window.screen.width;
  const history = useHistory();
  const edefault = {
    efname: undefined,
    elname: undefined,
    enumber: undefined,
    epass: undefined,
    ecpass: undefined,
  };

  const [err, seterr] = useState(edefault);
  const [verifyPass, setVerifyPass] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const body = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      mobile: event.target.mobile.value,
      password: event.target.password.value,
    };

    const url = new URLSearchParams(body);

    axios
      .post("https://logansbackyardapi.onrender.com/api/signup", url)
      .then(({ data }) => {
        setLoading(false);
        localStorage.setItem("token", data);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  const handleChange = [
    (event) => {
      let temp = err;
      const arr = event.target.value.match(/[^a-z]/i);
      arr
        ? (temp.efname = `Enter a Valid First Name : Can Not Use ${
            arr[0] === " " ? "Space" : arr[0]
          }`)
        : (temp.efname = undefined);
      seterr({ ...temp });
    },
    (event) => {
      let temp = err;
      const arr = event.target.value.match(/[^a-z]/i);
      arr
        ? (temp.elname = `Enter a Valid Last Name : Can Not Use ${
            arr[0] === " " ? "Space" : arr[0]
          }`)
        : (temp.elname = undefined);
      seterr({ ...temp });
    },
    (event) => {
      let temp = err;
      isNaN(event.target.value)
        ? (temp.enumber = "Enter a Valid Number")
        : (temp.enumber = undefined);
      seterr({ ...temp });
    },
    (event) => {
      let temp = err;
      const arr = event.target.value.match(
        /(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$*.]).{8}/i
      );
      if (arr) {
        temp.epass = undefined;
        setVerifyPass(event.target.value);
      } else {
        temp.epass =
          "Password have length at least 8 and contain an alphabet a number and a special charecter(!@#$*.)";
      }
      seterr({ ...temp });
    },
    (event) => {
      let temp = err;
      event.target.value !== verifyPass
        ? (temp.ecpass = "Password does not match")
        : (temp.ecpass = undefined);
      seterr({ ...temp });
    },
  ];

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <div
          className=" bg-cover fixed grid place-content-center h-full w-full  overflow-hidden"
          style={
            width > 768
              ? { backgroundImage: `url(${desktopBG})` }
              : { backgroundImage: `url(${mobileBG})` }
          }
        >
          <div className="w-full max-w-xs">
            <form
              className=" bg-opacity-50 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ju"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="text-gray-700 text-sm font-bold mb-2"
                  for="fname"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fname"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange[0]}
                  required
                  autoFocus
                />
                <p className="text-red-500 text-xs italic">{err.efname}</p>
                <label
                  className=" text-gray-700 text-sm font-bold mb-2"
                  for="lname"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lname"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange[1]}
                  required
                  autoFocus
                />
                <p className="text-red-500 text-xs italic">{err.elname}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="Mobile Number"
                >
                  Mobile Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Mobile"
                  type="tel"
                  maxLength="10"
                  minLength="10"
                  placeholder="Mobile Number"
                  name="mobile"
                  onChange={handleChange[2]}
                  required
                  autoFocus
                />
                <p className="text-red-500 text-xs italic">{err.enumber}</p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Create Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="******************"
                  onChange={handleChange[3]}
                  required
                />
                <p className="text-red-500 text-xs italic">{err.epass}</p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="cpassword"
                >
                  Verify Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="******************"
                  onChange={handleChange[4]}
                  required
                />
                <p className="text-red-500 text-xs italic">{err.ecpass}</p>
              </div>
              <p className="text-red-500 text-xs italic">{}</p>
              <div className="flex  flex-col items-center justify-between">
                <button
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
