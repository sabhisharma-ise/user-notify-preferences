## User Notification and Preferences API

This project provides APIs for managing user notification preferences and sending notifications. It is built with **NestJS**, uses **MongoDB** as the database, and is deployed on Heroku.

## Features

1. **Manage User Preferences**:
    - Add, update, retrieve, and delete user notification preferences.
2. **Send Notifications**:
    - Send notifications based on user preferences and log them.
3. **Rate Limiting**:
    - Protects APIs with request rate limiting.

## Prerequisites

- Node.js (v16 or above recommended)
- npm (v7 or above recommended)
- MongoDB (local or cloud, e.g., MongoDB Atlas)

## Base URL

Use the following base URL for all API calls:

```arduino
https://user-notify-preferences-2c36090bde64.herokuapp.com/
```

## Endpoints and Testing

### 1. Preferences API

**Create Preference**
- **Endpoint**: `POST /api/preferences`
- **Curl Command**:
  ```bash
  curl -X POST https://user-notify-preferences-2c36090bde64.herokuapp.com/api/preferences \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "email": "user123@example.com",
    "preferences": {
      "marketing": true,
      "newsletter": false,
      "updates": true,
      "frequency": "weekly",
      "channels": {
        "email": true,
        "sms": false,
        "push": true
      }
    },
    "timezone": "Asia/Kolkata"
  }'
  ```

**Get Preference by ID**
- **Endpoint**: `GET /api/preferences/:userId`
- **Curl Command**:
  ```bash
  curl -X GET https://user-notify-preferences-2c36090bde64.herokuapp.com/api/preferences/user123
  ```

**Update Preference**
- **Endpoint**: `PATCH /api/preferences/:userId`
- **Curl Command**:
  ```bash
  curl -X PATCH https://user-notify-preferences-2c36090bde64.herokuapp.com/api/preferences/user123 \
  -H "Content-Type: application/json" \
  -d '{
    "preferences": {
      "marketing": false,
      "newsletter": true,
      "frequency": "daily",
      "channels": {
        "email": true,
        "sms": true,
        "push": false
      }
    }
  }'
  ```

**Delete Preference**
- **Endpoint**: `DELETE /api/preferences/:userId`
- **Curl Command**:
  ```bash
  curl -X DELETE https://user-notify-preferences-2c36090bde64.herokuapp.com/api/preferences/user123
  ```

### 2. Notifications API

**Send Notification**
- **Endpoint**: `POST api/notifications/send`
- **Curl Command**:
  ```bash
  curl -X POST https://user-notify-preferences-2c36090bde64.herokuapp.com/api/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "type": "marketing",
    "channel": "email",
    "content": {
      "subject": "Welcome to our service!",
      "body": "Here is your first marketing email."
    }
  }'
  ```

**Fetch Notification by ID**
- **Endpoint**: `GET api/notifications/:userId/logs`
- **Curl Command**:
  ```bash
  curl -X GET http://user-notify-preferences-2c36090bde64.herokuapp.com/api/notifications/user123/logs
  ```

**Get Notification Stats**
- **Endpoint**: `GET api/notifications/stats`
- **Curl Command**:
  ```bash
  curl -X GET https://user-notify-preferences-2c36090bde64.herokuapp.com/api/notifications/stats
  ```

## Running Locally

To run the project locally, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/sabhisharma-ise/user-notify-preferences.git
cd user-notify-preferences
```

2. **Install dependencies**:

```bash
npm install
```

3. **Environment Variables**
Create a .env file in the root of the project and add the following:

```makefile
MONGO_URI=<your-mongodb-connection-string>
PORT=3000
```

4. **Build and Start the Application**

```bash
npm run build
npm run start
The server will start on http://localhost:3000.
```

## Tools Used
- **Framework**: NestJS
- **Database**: MongoDB
- **Deployed On**: Heroku
- **Rate Limiting**: Express-rate-limit

## Testing
- Use the provided curl commands to test the API endpoints.
- You can also use tools like Postman or Insomnia for testing.