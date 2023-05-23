export const AppConstants = {
  LOGIN_PAGE: {
    USER: {
      NAME: 'Username',
      PASSWORD: 'Password',
      LOGIN_LABEL: 'LOGIN',
      FORGOT_PASSWORD_LABEL: 'Forgot Password? Click Here',
    },
    AUTHORIZED_USER: 'User is Authorized',
  },
  STYLES: {
    FONT: {
      SIZE: {
        TWENTY_PX: '20px',
        SIXTY_PX: '60px',
        TWENTY_TWO_PX: '22px',
      },
    },
    BORDER: {
      ROUND: 'round',
    },
  },
  COLOR: {
    BLACK: 'black',
    GREEN: 'green',
    YELLOW: 'yellow',
  },
  DATE_CONSTANTS: {
    DEFAULT: 'default',
    LONG: 'long',
    CREATION_DATE: 'creationDate',
    EN_IN: 'en-IN',
    EN_US: 'en-US',
  },
  SORT_TYPE: {
    ASC: 'asc',
  },
  SORT_FIELD: {
    EVENT_ID: 'eventId',
  },
  LOGOUT_PAGE: {
    LOGOUT_LABEL: 'Logout',
  },
  LOGO: {
    LABEL: 'WALLET',
    ALT: 'CDW WALLET LOGO',
  },
  CONFIG: {
    FORM_LABEL: 'CASH',
    BUTTON_LABEL: 'SAVE CHANGES',
    CDW_CASH: 'cdw',
    MATERNITY_CASH: 'maternity',
    CDW_DESC: 'This cash will be added monthly to all the co-workers on 1st of every month',
    MATERNITY_DESC:
      'This cash will be added monthly to all eligble female co-workers on 1st of every month',
    CARRY_OVER_DAYS: 'Carry Over Days',
    INPUT_NAME: {
      CASH: 'Cash',
      CARRY_OVER_DAYS: 'Carry-over-days',
    },
    CONFIRMATION_BOX: {
      TITLE: 'Confirm to Save',
      DESC: 'Are you sure, want to save changes?',
    },
  },
  CONFIG_HEADINGS: {
    LABEL: 'CONFIGS',
    CONFIG_CONTENT: ['APP DETAILS', 'CASH'],
  },
  APP_DETAILS: {
    APP_VERSION: {
      LABEL: 'Version',
      VERSION: '1.0',
    },
    DEVELOPER_DETAILS: {
      LABEL: 'Developers',
      DEVELOPERS: [
        'Abdul Adhil',
        'Lokesh Reddy',
        'Hariboobaalan',
        'Sai Kishore',
        'Vishnuraj',
        'Joel Moses',
        'Rakhesh Bowtham',
        'Pavithra',
        'Charanraj',
        'Mohana Sowdesh',
        'Hariharan',
        'Ranjith',
        'Rubesh',
        'Srinivasan',
        'Shakthivel',
        'Shivani',
      ],
    },
  },
  CONFIGS_TABS: {
    FIRST_TAB: 'App Details',
    SECOND_TAB: 'Cash',
  },
  EVENT_INFO: {
    ONGOING_EVENT: 'started',
    UPCOMING_EVENT: 'upcoming',
    STARTEVENT: 'START EVENT',
    STOPEVENT: 'STOP EVENT',
    START: 'start',
    STOP: 'stop',
  },
  BUTTON: {
    COLOR: {
      PRIMARY: 'primary',
      SECONDARY: 'secondary',
      DISABLE: 'disable',
      TRANSPARENT: 'transparent',
    },
    SIZE: {
      L: 'l',
      XL: 'xl',
      XXL: 'xxl',
      XXXL: 'xxxl',
      MD: 'md',
      S: 's',
      XS: 'xs',
    },
    SHAPE: {
      SOLID: 'solid',
      ROUND: 'round',
    },
    BORDER: {
      NONE: 'none',
    },
  },
  USER_FORM: {
    STATUS: {
      SUCCESS: 200,
      NOT_SUCCESS: 300,
    },
    BUSINESS_AND_LOCATIONS: {
      BUSINESS_UNITS: 'businessUnits',
      BUSINESS_UNIT_NAME: 'businessUnitName',
      BUSINESS_UNIT_ID: 'businessUnitId',
      LOCATIONS: 'locations',
      LOCATION_NAME: 'locationName',
      LOCATION_ID: 'locationId',
    },
    PAYLOAD_STRUCTURE: {
      WORKER_NAME: 'employeeName',
      EMP_ID: 'employeeId',
      GENDER: 'gender',
      EMAIL: 'employeeEmail',
      CONTACT: 'contactNumber',
      BUSINESS_UNIT_NAME: 'businessUnitName',
      LOCATION_NAME: 'locationName',
      BUSINESS_UNIT_ID: 'businessUnitId',
      LOCATION_ID: 'locationId',
      STATUS: 'status',
      START_DATE: 'startDate',
      END_DATE: 'endDate',
      MATERNITY_CASH_STATUS: 'maternityCashStatus',
    },
    PAYLOAD_DATA: {
      employeeName: '',
      employeeId: '',
      gender: 'Select',
      employeeEmail: '',
      contactNumber: '',
      businessUnitId: '',
      businessUnitName: 'Select',
      locationId: '',
      locationName: 'Select',
      status: 'Active',
      startDate: '',
      endDate: '',
      maternityCashStatus: '',
    },
    TYPES: {
      ADD: 'ADD USER',
      MODIFY: 'MANAGE USER',
    },
    USER_DETAILS: {
      WORKER_NAME: 'Co-Worker Name *',
      EMP_ID: 'Employee ID *',
      GENDER: 'Gender *',
      GENDERS: ['Male', 'Female', 'Others'],
      SELECT_GENDER: 'Select',
      EMAIL: 'Email Address *',
      CONTACT: 'Contact Number *',
    },
    ERROR_MESSAGE: {
      WORKER_NAME: 'Co-Worker Name is Required',
      EMP_ID: 'Employee ID is Required',
      GENDER: 'Gender is Required',
      EMAIL: {
        REQUIRED: 'Email Address is Required',
        PATTERN: 'Invalid Email ID',
      },
      CONTACT: {
        REQUIRED: 'Contact Number is Required',
        PATTERN: 'Invalid Contact Number',
      },
      BUSINESS_UNIT: 'Business Unit is Required',
      LOCATION: 'Location is Required',
    },
    WORK_DETAILS: {
      BUSINESS_UNIT: 'Business Unit *',
      BUSINESS_UNITS: ['Digital Velocity', 'Security', 'Cloud Services'],
      LOCATION: 'Location *',
      LOCATIONS: ['Chennai', 'Hyderabad', 'Bangalore'],
      SELECT: 'Select',
      STATUS: 'Status *',
      STATUSES: [
        { label: 'ACTIVE', value: 'Active' },
        { label: 'INACTIVE', value: 'Inactive' },
        { label: 'EXIT', value: 'Exit' },
      ],
      INFO: 'Inactive Users will not be eligible for CDW Cash, Maternity Cash and Event Cash',
    },
    BUTTONS: {
      ADD: 'ADD USER',
      STOP_MATERNITY_CASH: 'STOP MATERNITY CASH',
      SAVE: 'SAVE CHANGES',
    },
    MATERNITY_CASH: {
      LABEL: 'Maternity Cash',
      NOT_APPLICABLE: 'Not Applicable',
      ADD_CASH: 'Add Maternity Cash through "Add Money"',
      STOP_CASH: 'Maternity Cash has been stopped',
      START_DT: 'Start Date & Time',
      END_DT: 'End Date & Time',
    },
  },
  ADD_MONEY_CONFIRMATION_BOX_MESSAGE: {
    CONFORMATION_BOX_MESSAGE: 'Are you sure, you want to add this money?',
    CONFORMATION_BOX_TITLE: 'ADD MONEY',
  },
  EVENTS_PAGE: {
    EVENTS_TITLE: 'EVENTS',
    FORM_TITLE: 'ADD EVENT',
    BUTTON_SIZE: 'xxl',
  },
  EVENTS_ERROR_MESSAGE: {
    INVALID_INPUT: 'End Date must be greater than start date',
    SUCCESS_INPUT: 'Event Added Successfully',
    ALREADY_EXISTS_INPUT: 'Event Already exists',
  },

  EVENTS_FORM: {
    EVENTS_NAME: 'Event Name *',
    START_DATE: 'Start Date & Time *',
    END_DATE: 'End Date & Time *',
  },
  EVENTS_FORM_KEYS: {
    EVENT_NAME_KEY: 'eventName',
    EVENTS_START_DATE_KEY: 'startDate',
    EVENTS_END_DATE_KEY: 'endDate',
  },
  EVENTCARD_TITLE: {
    EVENT_TITLE: 'UPCOMING & ON-GOING EVENTS',
  },
  NO_EVENTS_TITLE: {
    EVENTS_MESSAGE: 'No Events',
  },
  PASTEVENT_TITLE: {
    EVENT_TITLE: 'PAST EVENTS',
  },
  EVENTS_VALIDATION: {
    EVENTS_DATE_REQUIRED: 'Please Enter Date field',
    EVENTS_MESSAGE_REQUIRED: 'Please Enter Eventname',
  },
  EVENTS_NOTE: {
    LABEL: 'Note',
    NOTE: [
      'Event created once cannot be edited.',
      'On click of "Add Event", the event will be created. Event Cash and Participants can be associated to the event from "Add Money" section.',
      'Event Cash will be available to use only once the admin clicks "START EVENT". On click of "STOP EVENT", the event cash will be get expired.',
    ],
  },
  EVENTS_CONFIRM_BOX: {
    EVENTS_ADD_MESSAGE: 'Are you sure, you want to add this event?',
    EVENTS_START_MESSAGE: 'Are you sure, you want to start this event?',
    EVENTS_DELETE_MESSAGE: 'Are you sure, you want to delete this event?',
    EVENTS_STOP_MESSAGE: 'Are you sure, you want to stop this event?',
    ADD_EVENT_TITLE: 'ADD EVENT',
    STOP_EVENT_TITLE: 'STOP EVENT',
    DELETE_EVENT_TITLE: 'DELETE EVENT',
    START_EVENT_TITLE: 'START EVENT',
  },
  EVENTS_DELETE_EVENT: {
    MESSAGE: 'Delete Event',
  },
  EVENTS_PAGE_TOAST_MESSAGE: {
    EVENTS_ADDED_MESSAGE: 'Event Added Successfully',
  },
  EVENTS_CONFIRM_MESSAGE: {
    MESSAGE: 'Confirm',
  },
  DASH_BOARD_DEATILS: {
    GREETING_MESSAGE: 'Hello',
    WELCOME_MESSAGE: 'Welcome to Sirius Wallet Admin Portal',
    GREETING_WORK: 'Manage Users, Vendors, Items and Create Reports instantly.',
    LABEL: 'DASHBOARD',
  },
  USERS_PAGE: {
    TITLE: 'USERS',
    BUTTON: {
      DOWNLOAD_XLS: 'DOWNLOAD(.XLS)',
      IMPORT_USER: 'IMPORT USERS',
      ADD_USER: 'ADD USER',
    },
    TRANSACTION: {
      TITLE: 'TRANSACTIONS',
      MESSAGE: 'Showing Transactions for',
      TRANSACTION_STATUS: {
        COMPLETED: 'Completed',
      },
      TRANSACTION_TYPE: {
        CREDIT: 'credit',
      },
      TRANSACTION_STYLES: {
        RED: 'red-color-txt',
        GREEN: 'green-color-txt',
      },
      TRANSACTION_FIELDS: {
        DATE: 'date',
      },
    },
  },
  DASH_BOARD: {
    TODAY: 'today',
    THIS_WEEK: 'thisWeek',
    THIS_MONTH: 'thisMonth',
    CARRY_OVER: 'carryOver',
    STATS_TITLE: {
      today: 'TODAY',
      thisWeek: 'THIS WEEK',
      thisMonth: 'THIS MONTH',
      carryOver: 'CARRY OVER',
    },
    OVERALL_SALES: 'OVERALL SALES',
    TRANSFERED_AMMOUNT: 'TRANSFERRED AMOUNT',
    TOTAL_SALES: 'totalSales',
    LOCATION_WISE_SPENDING: 'locationWiseSpending',
    BU_WISE_SPENDING: 'businessUnitWiseSpending',
    ITEM_WISE_SPENDING: 'itemWiseSpending',
    COLORS: {
      ITEM_WISE_SPENDING: 'yellow',
      LOCATION_WISE_SPENDING: 'blue',
      BU_WISE_SPENDING: 'grey',
      OVERALL_SALES: 'green',
    },
  },
  REPORTS_PAGE: {
    LABEL: 'REPORTS',
    FONT_SIZE: {
      SIXTY_PX: '60px',
    },
    COLOR: '#d1d3d1',
    MESSAGE: 'Click on "Generate Report" to create, view and download reports',
    REPORTS_TYPE: { CUSTOM_REPORTS: 'CUSTOM REPORTS', STANDARD_REPORTS: 'STANDARD REPORTS' },
    BUTTON_LABEL: 'GENERATE REPORTS',
    REPORT_DURATION: {
      duration: ['Last Week', 'This Month', 'Last Month', 'Custom Date Range'],
    },
    REPORT_RECORD_BY: {
      records: ['Per Co-Worker', 'Per Transaction'],
    },
    STANDARD_REPORTS: {
      cashType: { LABEL: 'Select Report Type' },
      duration: { LABEL: 'Select Report Duration' },
      locations: { LABEL: 'Select Office Location(s)' },
    },
    CUSTOM_REPORTS: {
      duration: { LABEL: 'Select Report Duration' },
      cashType: { LABEL: 'Cash Type(s)' },
      transactionType: { LABEL: 'Transaction Type(s)' },
      locations: { LABEL: 'Select Office Location(s)' },
      records: { LABEL: 'Report Records By' },
    },
    PAYLOAD_STRUCTURE: {
      'select-report-duration': 'duration',
      'cash-type(s)': 'type',
      'select-report-type': 'type',
      'report-records-by': 'recordsBy',
      'select-office-location(s)': 'locations',
      'transaction-type(s)': 'transactionType',
      'Per Co-Worker': 'coWorker',
      'Per Transaction': 'transaction',
    },
    REPORT_BY: {
      'Per Co-Worker': 'Per Co-Worker',
      'Per Transaction': 'Per Transaction',
    },

    ALL_LOCATION: 'All Locations',
    CDW_CASH_REPORT: 'CDW CASH REPORT',
    REPORT_STATS_TILE: {
      TOTAL_AMOUNT: 'TOTAL AMOUNT',
      CO_WORKER: 'CO-WORKERS BENEFITTED',
      DOWNLOAD_BUTTON: 'DOWNLOAD REPORT (.XLS)',
    },
    REPORT_FILTER_MESSAGE: 'Showing Report for',
  },
  CONFIRMATION_BOX: {
    YES_BUTTON: 'Yes',
    NO_BUTTON: 'No',
  },
  ADD_MONEY_CONFIRM_DESCRIPTION: {
    CONFIRM_DESCRIPTION: 'Are you sure,you want to add money to this user?',
  },
};
export const ASC = 'asc';
export const DESC = 'desc';
export const SORT = 'sort';
export const FIELD = 'field';
export const PAGE = 'page';
export const LIMIT = 'limit';
export const CDW = 'cdw';
export const EVENT = 'event';
export const MATERNITY = 'maternity';
export const BUCKET_LIST = 'bucket-list';
export const SEARCH_EMPLOYEE = 'search-employee';
export const SEARCH_QUERY = 'search-query';
export const BUCKET_ID = 'bucket-id';
export const EMPLOYEE = 'employee';
export const EVENTS = 'events';
export const STRING = 'string';
export const CASH = 'Cash';
export const CDW_CASH = 'CDW Cash';
export const MATERNITY_CASH = 'Maternity Cash';
export const EVENT_CASH = 'Event Cash';
export const TRANSACTION_DETAILS = 'TRANSACTION DETAILS';
export const RECIPIENT_DETAILS = 'RECIPIENT DETAILS';
export const CDW_ID = 1;
export const ID = 'employeeId';
export const MATERNITY_ID = 2;
export const EVENT_ID = 3;
export const AMOUNT_ADDED = 'Amount To Be Added';
export const CDW_INFO = 'This amount will be defaulted based on co-workers base location.';
export const MATERNITY_INFO =
  'Maternity Cash will be credited on 1st of every month till the end date.';
export const START_DATE = 'Start Date & Time';
export const END_DATE = 'End Date & Time';
export const EMPLOYEE_ID = 'Employee ID';
export const SELECT_BUCKET = 'Select Bucket *';
export const SELECT_EVENT = 'Select Event *';
export const ADD_MONEY = 'ADD MONEY';
export const NUMBER = 'number';
export const PLUS_SIGN = '+';
export const MINUS_SIGN = '-';
export const TOKEN = 'token';
export const NUMERIC = 'numeric';
export const SHORT = 'short';
export const LOGOUT = 'logout';
export const MESSAGE = 'message';
export const BLACK = 'black';
export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'dd-MM-yyyy';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd hh:mm a';
export const CDW_LOGO = 'cdw logo';
export const CASH_ADDED = 'Cash Added';
export const EVENT_NAME = 'eventName';
export const CASH_NAME = 'cashName';
export const AMOUNT = 'amount';
export const SELECT_EVENTS = 'Select Event';
export const CARRY_OVER_DAYS = 'carryOverDays';
export const SUCCESS_CODE = 200;
export const TODAY = 'today';
export const DATE = 'date';
export const FOR = 'for';
export const TO = 'to';
export const NO_DATA_MSG = 'No data available';
export const ZERO = 0;
export const ALL = 'all';
export const OBJECT = 'object';
export const FILTER_COMPONENT = 'filterComponent';
export const RADIO = 'radio';
export const TEXT = 'text';
export const TEL = 'tel';
export const EMAIL = 'email';
export const THREE = 3;
export const STARTED = 'started';
export const PASSWORD = 'password';
export const START_DOTS = 'start-dots';
export const END_DOTS = 'end-dots';
export const USER_NAME = 'username';
export const TWO_DIGIT = '2-digit';
export const AM = 'AM';
export const PM = 'PM';
export const QUERY = 'query';
export const EXPONENTIATION = {
  E: 'E',
  e: 'e',
};
export const INPUT_TYPES = {
  NUMBER: 'number',
};
export const ADD_MONEY_ERROR_MESSAGE = {
  INVALID_SEARCH: 'Choose a value from dropdown',
  INVALID_CASH: 'Enter a valid cash amount',
  EMPTY_CASH: `Cash Amount needs to be added.`,
};
export const TOKEN_EXPIRY_DURATION = 1 / 24;
