export const TableRows = {
  ADD_USERS: [
    { property: 'employeeId', label: 'Emp Id', name: 'Emp Id' },
    { property: 'employeeName', label: 'Employee Name', name: 'Employee Name' },
    { property: 'businessUnitName', label: 'Buisness Unit', name: 'Buisness Unit' },
    { property: 'locationName', label: 'Location', name: 'Location' },
    { property: 'cdwCash', label: 'CDW Cash', name: 'CDW Cash' },
    { property: 'carryoverCash', label: 'CO Cash', name: 'CO Cash' },
    { property: 'eventCash', label: 'Event Cash', name: 'Event Cash' },
    { property: 'maternityCash', label: 'Maternity Cash', name: 'Maternity Cash' },
    { property: 'status', label: 'Status', name: 'Status' },
    { href: 'transactions', label: 'Transactions', name: null },
    { href: 'manage', label: 'Manage', name: null },
  ],
  PAST_EVENTS: [
    { property: '_id', label: 'Creation Date' },
    { property: 'name', label: 'Event Name' },
    { property: 'name', label: 'Event Start Date' },
    { property: 'name', label: 'Event End Date' },
    { href: 'transactions', label: 'Transactions' },
  ],
};
