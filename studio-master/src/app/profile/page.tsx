"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from '@/lib/api';

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    if (!email) {
      router.push("/login");
      return;
    }
    setUserEmail(email);
    setUserName(name || "");
    setEditName(name || "");
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }
    try {
      await auth.updateName(userEmail, editName);
      localStorage.setItem("userName", editName);
      setUserName(editName);
      setMessage("Profile updated!");
    } catch (err) {
      setMessage("Failed to update name.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");
    if (!currentPassword || !newPassword) {
      setPasswordMessage("Please fill in both fields.");
      return;
    }
    try {
      await auth.changePassword(userEmail, currentPassword, newPassword);
      setPasswordMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setPasswordMessage(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6 mb-8">
            <div>
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" value={userEmail} disabled className="mt-1" />
            </div>
            <div>
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            {message && <div className="text-green-600 text-sm">{message}</div>}
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            {passwordMessage && <div className={passwordMessage.includes('success') ? "text-green-600 text-sm" : "text-red-600 text-sm"}>{passwordMessage}</div>}
            <Button type="submit" className="w-full">Change Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 