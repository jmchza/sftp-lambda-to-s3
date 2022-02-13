// Import all functions from scheduled-event-logger.js
const scheduledEventLogger = require('../../../src/handlers/scheduled-event-logger.js');
const DATA = [
  {
    type: '-',
    name: 'file.txt_1',
    size: 17,
    modifyTime: 1643002679000,
    accessTime: 1643002679000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'file.txt',
    size: 17,
    modifyTime: 1643002752000,
    accessTime: 1643002752000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'AMDRM_Install.log',
    size: 1249,
    modifyTime: 1642998308000,
    accessTime: 1642998308000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'AMDRM_Install.log_1',
    size: 1249,
    modifyTime: 1642998246000,
    accessTime: 1642998246000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'AMDRM_Install.log_2',
    size: 1249,
    modifyTime: 1642998196000,
    accessTime: 1642998196000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'AMDRM_Install.log_3',
    size: 1249,
    modifyTime: 1642998088000,
    accessTime: 1642998088000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'ALDIS_AU_TSMG.ALDIS_AU00741.DERR_CREATE1.EDI',
    size: 2300,
    modifyTime: 1642989651000,
    accessTime: 1642989651000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  },
  {
    type: '-',
    name: 'ALDIS_AU_TSMG.ALDIS_AU00741.DERR_CREATE1.EDI_1',
    size: 2300,
    modifyTime: 1642988349000,
    accessTime: 1642988349000,
    rights: { user: 'rw', group: 'r', other: '' },
    owner: undefined,
    group: undefined
  }
];

describe('Test for sqs-payload-logger', function () {
  // This test invokes the scheduled-event-logger Lambda function and verifies that the received payload is logged
  it('Verifies the payload is logged', async () => {
    // Mock console.log statements so we can verify them. For more information, see
    // https://jestjs.io/docs/en/mock-functions.html
    console.info = jest.fn()

    // Create a sample payload with CloudWatch scheduled event message format
    var payload = {
      "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
      "detail-type": "Scheduled Event",
      "source": "aws.events",
      "account": "",
      "time": "1970-01-01T00:00:00Z",
      "region": "us-west-2",
      "resources": [
        "arn:aws:events:us-west-2:123456789012:rule/ExampleRule"
      ],
      "detail": {}
    }

    await scheduledEventLogger.scheduledEventLoggerHandler(payload, null)

    // Verify that console.info has been called with the expected payload
    expect(console.info).toHaveBeenCalledWith(JSON.stringify(payload))
  });

});
