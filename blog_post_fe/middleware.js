import jwt_decode from "jwt-decode";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (
    request.url.includes("/signin") ||
    request.url.includes("/register") ||
    request.url == process.env.NEXT_PUBLIC_API_BASE_URL
  ) {
    if (request.cookies.get("refresh_token")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (
    request.url.includes("/profile") ||
    request.url == process.env.NEXT_PUBLIC_API_BASE_URL
  ) {
    if (!request.cookies.get("refresh_token")) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } else if (
    request.url.includes("/admin") ||
    request.url == process.env.NEXT_PUBLIC_API_BASE_URL
  ) {
    if (!request.cookies.get("refresh_token")) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const refreshToken = request.cookies.get("refresh_token");
    try {
      const decodedToken = jwt_decode(refreshToken.value);
      const userRole = decodedToken.role;

      if (userRole !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
