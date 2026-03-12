# Product List with AWS Lambda & DynamoDB

A modern **serverless product management application** built with **React, Vite, Tailwind CSS, AWS Lambda, and Amazon DynamoDB**.

The frontend communicates directly with an AWS Lambda function through a **Lambda Function URL**, allowing users to create, view, and delete products without running a traditional backend server.

---

# Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* AWS Lambda
* Amazon DynamoDB

### Infrastructure

* AWS Lambda Function URL
* Environment variables (.env)

---

# Features

* Add new products
* View product list
* Delete products
* Responsive UI with Tailwind CSS
* Serverless backend architecture
* Instant UI updates without page reload

---

# Project Structure

```
ProductList/
│
├── frontend/
│   ├── .env
│   ├── package.json
│   ├── vite.config.mjs
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── index.css
│       ├── App.jsx
│       └── components/
│           ├── ProductForm.jsx
│           └── ProductList.jsx
│
└── backend/
    ├── lambda.js
    ├── package.json
    └── node_modules/
```

---

# Frontend Setup

### 1. Clone Repository

```
git clone <your-github-repo-url>
cd ProductList/frontend
```

### 2. Create Environment File

Create a `.env` file inside the frontend directory:

```
VITE_LAMBDA_URL=https://your-lambda-url.on.aws/
```

Replace the value with your **AWS Lambda Function URL**.

### 3. Install Dependencies

```
npm install
```

### 4. Run Development Server

```
npm run dev
```

Open the app in your browser:

```
http://localhost:5173
```

---

# Backend Setup (AWS)

## 1. Create DynamoDB Table

Create a table in **Amazon DynamoDB** with the following configuration:

| Field         | Value              |
| ------------- | ------------------ |
| Table Name    | BongoProducts      |
| Partition Key | productId (String) |
| Capacity Mode | On-Demand          |

---

## 2. Create AWS Lambda Function

Create a Lambda function with:

Runtime:

```
Node.js 24.x
```

Handler:

```
lambda.handler
```

---

## 3. Upload Backend Code

Inside the backend folder create a deployment zip:

```
zip -r lambda.zip lambda.js package.json node_modules
```

Upload the zip file to your Lambda function and click **Deploy**.

---

## 4. Configure IAM Role

Create a role with permissions:

* AmazonDynamoDBFullAccess
* CloudWatchLogsFullAccess

Example role name:

```
ProductListLambdaRole
```

Attach this role to your Lambda function.

---

## 5. Create Lambda Function URL

Go to:

```
Lambda → Function → Function URL → Create Function URL
```

Settings:

```
Auth Type: NONE
```

Copy the URL and place it inside the `.env` file.

Example:

```
VITE_LAMBDA_URL=https://abc123.lambda-url.us-east-1.on.aws/
```

---

# API Methods

| Method | Description        |
| ------ | ------------------ |
| GET    | Fetch all products |
| POST   | Create a product   |
| DELETE | Delete a product   |

---

# Running on EC2 (Optional)

### Install Node.js

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
. "$HOME/.nvm/nvm.sh"

nvm install 24
node -v
npm -v
```

### Clone Project

```
ssh -i your-key.pem ec2-user@EC2_PUBLIC_IP
git clone <your-repo-url>
cd ProductList/frontend
npm install
```

### Run Server

```
npm run dev -- --host 0.0.0.0
```

Allow port **5173** in EC2 Security Group.

Access:

```
http://EC2_PUBLIC_IP:5173
```

---

# License

MIT

---

# Author

Md Mehedi Hasan
Frontend Developer
