export const StandardReports = {
  cashType: { label: 'Select Report Type', data: [], type: 'radio' },
  duration: {
    label: 'Select Report Duration',
    data: ['Last Week', 'This Month', 'Last Month', 'Custom Date Range'],
    type: 'radio',
  },
  locations: { label: 'Select Office Location(s)', data: [], type: 'checkbox' },
};

export const CustomReports = {
  duration: {
    label: 'Select Report Duration',
    data: ['Last Week', 'This Month', 'Last Month', 'Custom Date Range'],
    type: 'radio',
  },
  cashType: { label: 'Cash Type(s)', data: [], type: 'checkbox' },
  transactionType: { label: 'Transaction Type(s)', data: [], type: 'checkbox' },
  locations: {
    label: 'Select Office Location(s)',
    data: [],
    type: 'checkbox',
  },
  records: {
    label: 'Report Records By',
    data: ['Per Co-Worker', 'Per Transaction'],
    type: 'radio',
  },
};
