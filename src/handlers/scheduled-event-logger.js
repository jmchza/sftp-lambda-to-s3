const AWS = require('aws-sdk');
const Client = require('ssh2-sftp-client');
const fs = require('fs');

const sftp = new Client();
const {
  sftpFolder, sftpConfig, sftpPollableFolder, bucketName,
} = require('./constants');

const s3 = new AWS.S3();

const params = {
  Bucket: bucketName,
};

const getBody = async (file) => {
  const stream = await fs.createWriteStream(`/tmp/${file.name}`);

  await sftp.get(`${sftpPollableFolder}/${file.name}`, stream);
  return fs.readFileSync(`/tmp/${file.name}`);
};

const sortFiles = (files) => {
  files.sort((a, b) => {
    if (a.modifyTime > b.modifyTime) return 1;
    if (a.modifyTime < b.modifyTime) return -1;
    return 0;
  });
};

exports.scheduledEventLoggerHandler = async (event, context) => {
  try {
    await sftp.connect(sftpConfig);
  } catch (err) {
    console.error('Error connecting to SFTP server, invalid credentials', err);
    return '404';
  }

  try {
    const data = await sftp.list(sftpFolder);
    console.log(`There are ${data.length} files in folder`, data);

    if (data.length === 0) {
      console.log('No file has been processed');
      return 200;
    }

    if (data.length > 1) {
      sortFiles(data);
    }

    console.log('Processing ', data[0].name);
    const body = await getBody(data[0]);

    s3.upload({ ...params, Key: data[0].name, Body: body }).promise();

    console.log('Deleting file: ', data[0].name);
    await sftp.delete(`/tmp/${data[0].name}`);
  } catch (err) {
    console.error('Error encountered while processing folder', err);
  } finally {
    await sftp.end();
  }

  return '200';
};
