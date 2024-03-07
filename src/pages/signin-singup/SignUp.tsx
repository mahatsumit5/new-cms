import React from "react";
import { SingUpForm } from "../../components/admin-signup/SingUpForm";
import { Container } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="signup" style={{ position: "relative" }}>
      <p
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        {" "}
        <IoIosArrowBack onClick={() => navigate("/")} /> Go Back
      </p>

      <Container
        className="d-flex justify-content-start "
        style={{ width: "600px", marginLeft: "15vw" }}
      >
        <SingUpForm />
      </Container>
    </div>
  );
};
