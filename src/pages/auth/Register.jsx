import React, { useEffect, useState } from "react";
import { WithRouter } from "utils/Navigation";
import { Helmet } from "react-helmet";
import { Input, InputEmail, InputPassword } from "components/Input";
import { ButtonRegister } from "components/Button";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "utils/apiRequest";

import Swal from "sweetalert2";
import imgRegister from "assets/img-register.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fullname && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullname, email, password]);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (fullname.length == 0 || email.length == 0 || password.length == 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Data cannot be empty !",
        showConfirmButton: true,
      });
      return;
    }

    if (fullname.length < 3) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please enter full name !",
        showConfirmButton: true,
      });
      return;
    }

    const body = {
      fullname: fullname,
      email: email,
      password: password,
    };
    apiRequest("users", "post", body)
      .then((res) => {
        const { message, data } = res;
        if (data) {
          navigate("/login");
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successful ! Please Login !",
          showConfirmButton: true,
        });
      })
      .catch((err) => {
        const { message } = err.response.data;
        alert(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register | GunTour</title>
        <meta name="description" content="App Description" />
      </Helmet>

      <main className="mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
          <aside className="flex justify-center">
            <img
              src={imgRegister}
              alt="imgRegister"
              className="w-full h-full"
            />
          </aside>
          <article className="md:grid-col-span-2 bg-white px-20 py-60">
            <h1 className="font-semibold text-secondary text-[40px]">
              Register your account
            </h1>

            <section className="grid md:grid-rows-10 gap-4">
              <p className="font-light text-secondary text-lg">
                Explore Mount Pangrango simply by registering and <br />
                exploring.
              </p>

              <p className="font-medium text-secondary text-xl lg:text-xl">
                Register your account and enjoy
              </p>

              <p className="text-lg text-secondary">Full Name</p>

              <Input
                onChange={(e) => setFullName(e.target.value)}
                value={fullname}
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Full Name"
              />

              <p className="text-lg text-secondary">Your Email</p>

              <InputEmail
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
              />

              <p className="text-lg text-secondary">Password</p>

              <InputPassword
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />

              <ButtonRegister
                onClick={(e) => handleRegister(e)}
                id="register"
                className="bg-primary font-medium text-base text-center text-white"
              />

              <p className="text-light text-base text-center text-[#B4B4B4]">
                Already have an account?
                <Link
                  to="/login"
                  id="login"
                  className="text-light text-base text-primary text-center"
                >
                  &nbsp; Login Here
                </Link>
              </p>
            </section>
          </article>
        </section>
      </main>
    </>
  );
};

export default WithRouter(Register);
