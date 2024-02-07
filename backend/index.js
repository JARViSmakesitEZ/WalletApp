const express = require("express");
const app = express();

//ENDPOINTS
// Authentication and Authorization
app.post("/login", (req, res)); // Student login
app.post("/register", (req, res)); // Student registration

// Admin-specific Endpoints
app.post("/admin/update-balance", (req, res)); // Add or deduct balance from student account
app.get("/admin/student/:id/account-details", (req, res)); // View student account details
app.post("/admin/student/add", (req, res)); // add new student to the database

// Student-specific Endpoints
app.get("/student/account-details", (req, res)); // View student account details

// Shared Endpoints
app.put("/user/:id/update", (req, res)); // Update user details (can be used by both admin and student)
