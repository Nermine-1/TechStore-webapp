"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 animate-gradient font-sans">
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
          .font-sans {
            font-family: "Inter", sans-serif;
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 6s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
        <Card className="w-full max-w-sm shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-md transition-transform hover:scale-105 duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-lg text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-2 border-purple-200 focus:border-pink-400 transition"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className="text-lg text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-2 border-purple-200 focus:border-pink-400 transition"
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold text-lg shadow-lg hover:from-pink-400 hover:to-yellow-300 transition-all duration-300"
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
