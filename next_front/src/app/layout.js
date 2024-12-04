"use client";

import "./globals.css";
import Head from "next/head";
import Header from "./header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
      <SessionProvider>
      <Header/>
        {children}
        <div className="bg-light text-center py-3 fixed-bottom">
          <div className="container">
            <hr />
          </div>
          <div className="container" style={{ textAlign: "left" }}>
            <h4>최원재</h4>
            <h5>
              이메일 <b>choiwj1995@gmail.com</b>
            </h5>
          </div>
          <div className="container">
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p className="copyright-text">
                  Copyright © 2024 All Rights Reserved by &nbsp;
                  <a href="/">
                    <span className="logo" style={{ textDecoration: "Bold" }}>
                      WonJae.
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        </SessionProvider>
      </body>
    </html>
  );
}
