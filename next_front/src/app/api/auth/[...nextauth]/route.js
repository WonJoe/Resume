import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // JWT 기반 세션 관리
    maxAge: 60 * 30, // Access Token 유효 시간: 30분
    updateAge: 60 * 10, // 마지막 활동 이후 10분마다 갱신
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // 초기 로그인: Access Token 및 Refresh Token 저장
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = Date.now() + (account.expires_in || 3600) * 1000; // 만료 시간 설정
        token.provider = account.provider; // 제공자 정보 저장 (Google, Naver 등)
      }

      // Access Token이 만료되지 않았으면 기존 토큰 반환
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access Token 만료: 갱신 시도
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // 세션에 Access Token 및 Refresh Token 포함
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.error = token.error; // 에러 정보 전달
      return session;
    },
  },
});

// Access Token 갱신 함수
async function refreshAccessToken(token) {
  try {
    let url;
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    };

    // 제공자에 따라 URL 및 파라미터 설정
    if (token.provider === "google") {
      url = "https://oauth2.googleapis.com/token";
    } else if (token.provider === "naver") {
      url = "https://nid.naver.com/oauth2.0/token";
      params.client_id = process.env.NAVER_CLIENT_ID;
      params.client_secret = process.env.NAVER_CLIENT_SECRET;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${refreshedTokens.error_description}`);
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // 새로운 만료 시간
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 새 리프레시 토큰이 없으면 기존 토큰 유지
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError", // 에러 상태 저장
    };
  }
}

export { handler as GET, handler as POST };
