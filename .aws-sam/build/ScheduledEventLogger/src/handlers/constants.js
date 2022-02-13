const config = {
  sftpConfig: {
    host: process.env.Host,
    port: process.env.Port || 22,
    username: process.env.Username,
    password: process.env.Password,
  },
  sftpFolder: process.env.AldiEdiSrc,
  sftpPollableFolder: process.env.PollableAldiDir,
  bucketName: process.env.AldiEdiBucket,
};

module.exports = {
  ...config,
};
