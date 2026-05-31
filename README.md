A full-stack photo sharing application built with AWS Amplify Gen 2, featuring real-time updates, user authentication, and secure image sharing.

## Features

- **User Authentication** - Secure sign-up, sign-in, and multi-factor authentication
- **Photo Sharing** - Upload photos with captions and share with other users
- **Real-time Updates** - See new photos instantly as they're shared
- **Image Management** - Upload, display, and download photos securely
- **Responsive Design** - Works on desktop and mobile devices
- **Secure Access** - User-specific permissions and data isolation

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Backend:** AWS Amplify Gen 2
- **Database:** Amazon DynamoDB
- **API:** AWS AppSync (GraphQL)
- **Authentication:** Amazon Cognito
- **Storage:** Amazon S3
- **Hosting:** AWS Amplify Hosting

## Prerequisites

- Node.js v18+
- AWS Account
- Git

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/amplify-gen2-workshop.git
   cd amplify-gen2-workshop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Amplify:**
   ```bash
   npx ampx sandbox
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## Project Structure

```
├── amplify/
│   ├── auth/
│   │   └── resource.ts          # Authentication configuration
│   ├── data/
│   │   └── resource.ts          # GraphQL schema and database
│   ├── storage/
│   │   └── resource.ts          # File storage configuration
│   └── backend.ts               # Backend entry point
├── src/
│   ├── components/
│   │   ├── Posts.tsx            # Photo display and management
│   │   └── User.tsx             # User Details and Log Out button
│   ├── App.tsx                 # Main application component
├── └── main.tsx               # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx ampx sandbox` - Start Amplify sandbox environment
- `npx ampx sandbox delete` - Delete sandbox resources

## Deployment

### Development (Sandbox)
The sandbox environment is automatically created when you run `npx ampx sandbox`.

### Production
1. **Connect to Git repository:**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Configure build settings

2. **Deploy:**
   ```bash
   git push origin main
   ```

## Environment Variables

No environment variables needed - Amplify automatically generates `amplify_outputs.json` with all necessary configuration.

## Key Components

### Authentication
- User registration with email verification
- Secure login/logout functionality
- Multi-factor authentication support

### Photo Sharing
- Upload photos with captions
- Real-time updates across all users
- Edit and delete your own photos
- View photos shared by all users
- Download functionality for shared photos

### File Storage
- Secure photo uploads to Amazon S3
- Automatic image optimization
- User-specific file access controls
- Presigned URLs for secure downloads

## API Schema

```graphql
type Photo @model @auth(rules: [{allow: owner}]) {
  id: ID!
  caption: String!
  imagePath: String!
  owner: String
  createdAt: AWSDateTime
}
```

## Security

- **Authentication:** All API access requires valid user authentication
- **Authorization:** Users can only modify their own photos
- **File Access:** Photos are stored in user-specific S3 directories
- **Data Isolation:** Each user's data is automatically separated

## Cost Optimization

This application uses AWS Free Tier eligible services:
- Amplify Hosting: 1,000 build minutes/month
- Cognito: 50,000 MAUs
- AppSync: 250,000 queries/month
- DynamoDB: 25GB storage
- S3: 5GB storage

## Cleanup

To avoid ongoing AWS charges:

```bash
# Delete sandbox environment
npx ampx sandbox delete

# Delete production environment (if deployed)
# Go to AWS Amplify Console and delete the app
```

## Troubleshooting

### Common Issues

**Build fails:**
- Ensure Node.js v18+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Authentication not working:**
- Check that sandbox is running: `npx ampx sandbox`
- Verify amplify_outputs.json exists

**Photos not displaying:**
- Ensure storage resource is deployed
- Check browser console for errors
- Verify image upload completed successfully

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

