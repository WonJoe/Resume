"use client";

import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSession, signIn, signOut } from "next-auth/react";


const header = () => {

  const { data: session } = useSession();

  console.log(session)  

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">WonDev</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">ABOUT</Nav.Link>
            <Nav.Link href="/project">PROJECT</Nav.Link>
            <Nav.Link href="/socket">SOCKET</Nav.Link>
            

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}

            

          </Nav>

          <Nav className="me-right">
            <Nav.Link href="https://github.com/WonJoe" target="_blank" rel="noopener noreferrer">
              <img
              src="githubicon.png"
              alt="GitHub"
              style={{ width: "24px", height: "24px" }}/>
            </Nav.Link>
            <Nav.Link href="https://pf.kakao.com/_UkeZn" target="_blank" rel="noopener noreferrer">
              <img
              src="kakaooicon.png"
              alt="Kakao"
              style={{ width: "24px", height: "24px" }}/>
            </Nav.Link>
            <div style={{ display: "flex", alignItems: "center" }}>
            {/* 세션 상태에 따른 버튼 표시 */}
            {session ? (
              <>
                <span className="mx-3">안녕하세요, {session.user.name}님!</span>
                <button
                  onClick={() => signOut()}
                  className="btn btn-outline-danger btn-sm"
                >
                  로그아웃
                </button>
              </>
              
            ) : (
              
              <button
                onClick={() => signIn()}
                className="btn btn-outline-primary btn-sm"
              >
                로그인
              </button>
            )}
            </div>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default header;
