const mock = {
  customFetch: {
    url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-01-01&end=2015-01-05',
    content: {
      bpi: {
        '2015-01-01': 313.9247,
        '2015-01-02': 314.5916,
        '2015-01-03': 279.8507,
        '2015-01-04': 263.6343,
        '2015-01-05': 272.9486,
      },
      disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.',
      time: {
        updated: 'Jan 6, 2015 00:03:00 UTC',
        updatedISO: '2015-01-06T00:03:00+00:00',
      },
    },
  },
};

export default mock;
