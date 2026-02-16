Multi-Tenant SaaS Application (Full Stack)

A production-structured multi-tenant SaaS application built with the MERN stack.
This system supports organization-based isolation, role-based access control, project management, and task tracking.

🚀 Overview

This application demonstrates how to build a secure multi-tenant SaaS architecture where:

Multiple organizations can use the same backend

Data is fully isolated per organization

JWT-based authentication includes tenant context

Role-based access control is enforced

Projects and tasks are scoped securely

This is not a simple CRUD app. It enforces tenant validation across all relational operations.





🧠 Core Features
Authentication

User registration with automatic organization creation

JWT-based login

Secure token handling

Protected routes

Multi-Tenancy

Organization-based data isolation

No cross-tenant data access

Scoped queries using organizationId

Role-Based Access Control

Owner

Admin

Member

Middleware-level enforcement

Project Management

Create project

View projects (tenant-safe)

Delete project (role restricted)

Task Management

Create task under project

Validate project ownership

Validate assigned user belongs to same organization

Update task status

Filter tasks by project

Frontend Dashboard

Sidebar layout

Protected routes

Project CRUD UI

Task CRUD UI

Status badges

Live dashboard stats

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt

Role-based middleware

Frontend

React

Vite

Tailwind CSS

React Router

Axios with interceptors
