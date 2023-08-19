interface Configuration {
    mongoURI: string;
    port: string;
  }
  
  const config: Configuration = {
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://rajat1720017:ko8xfglpbQ3AWZ0h@moviecluster.vfaes3w.mongodb.net/',
    port: process.env.PORT || '3000'
  };
  
  export default config;