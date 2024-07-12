# Express API with Authentication and Appointment Management

This repository contains an Express.js application that provides the following APIs:

## The root URL is : `https://swasthya-gjwn.onrender.com` 

## API Endpoints

1. **Register User**
   - Endpoint: `POST /register`
   - Registers a new user in the database.

   **Request:**
   - Method: `POST`
   - URL: `/register`
   - Body:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
   - Headers: None
   
   **Response:**
   - Status: `201 Created`
   - Body:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

2. **Add Appointment**
   - Endpoint: `POST /appointments`
   - Adds a new appointment for an authenticated user.

   **Request:**
   - Method: `POST`
   - URL: `/appointments`
   - Body:
     ```json
     {
       "date": "2024-07-12T14:30:00Z",   // Date format should be ISO 8601
       "description": "Appointment description",
       "doctor": "Doctor's name"
     }
     ```
   - Headers:
     ```
     username: your_username
     password: your_password
     ```
   
   **Response:**
   - Status: `201 Created`
   - Body:
     ```json
     {
       "message": "Appointment added successfully"
     }
     ```

3. **Fetch Appointments**
   - Endpoint: `GET /appointments`
   - Retrieves all appointments for an authenticated user.

   **Request:**
   - Method: `GET`
   - URL: `/appointments`
   - Headers:
     ```
     username: your_username
     password: your_password
     ```
   
   **Response:**
   - Status: `200 OK`
   - Body:
     ```json
     [
       {
         "date": "2024-07-12T14:30:00Z",
         "description": "Appointment description",
         "doctor": "Doctor's name"
       },
       {
         "date": "2024-07-13T10:00:00Z",
         "description": "Another appointment description",
         "doctor": "Another Doctor"
       }
     ]
     ```

Replace `your_username` and `your_password` with actual credentials when making requests. Ensure the date format for appointments adheres to ISO 8601 (e.g., `"2024-07-12T14:30:00Z"`).
