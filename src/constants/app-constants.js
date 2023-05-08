export const AppConstants = {
  LOGIN_PAGE: {
    USER: {
      NAME: 'Username',
      PASSWORD: 'Password',
      LOGIN_LABEL: 'LOGIN',
      FORGOT_PASSWORD_LABEL: 'Forgot Password? Click Here',
    },
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
    BUTTON_COLOR_PRIMARY: 'primary',
    BUTTON_COLOR_SECONDARY: 'secondary',
    BUTTON_SIZE_L: 'l',
    BUTTON_SIZE_XXL: 'xxl',
    BUTTON_SIZE_MD: 'md',
    BUTTON_SIZE_S: 's',
    BUTTON_SIZE_XS: 'xs',
    BUTTON_SHAPE_SOLID: 'solid',
    BUTTON_SHAPE_ROUND: 'round',
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
    REQUIRED: ' is Required',
    TYPES: {
      ADD: 'ADD USER',
      MODIFY: 'MODIFY USER',
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
      START_DT: 'Start Date & Time',
      END_DT: 'End Date & Time',
    },
  },
  EVENTS_PAGE: {
    EVENTS_TITLE: 'EVENTS',
    FORM_TITLE: 'ADD EVENT',
    BUTTON_SIZE: 'xxl',
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
  PASTEVENT_TITLE: {
    EVENT_TITLE: 'PAST EVENTS',
  },
  EVENTS_NOTE: {
    LABEL: 'Note',
    NOTE: [
      'Event created once cannot be edited.',
      'On click of "Add Event", the event will be created. Event Cash and Participants can be associated to the event from "Add Money" section.',
      'Event Cash will be available to use only once the admin clicks "START EVENT". On click of "STOP EVENT", the event cash will be get expired.',
    ],
  },

  DASH_BOARD_DEATILS: {
    GREETING_MESSAGE: 'Hello',
    WELCOME_MESSAGE: 'Welcome to Sirius Wallet Admin Portal',
    GREETING_WORK: 'Manage Users, Vendors, Items and Create Reports instantly.',
  },
  USERS_PAGE: {
    TITLE: 'USERS',
    BUTTON: {
      DOWNLOAD_XLS: 'DOWNLOAD(.XLS)',
      IMPORT_USER: 'IMPORT USERS',
      ADD_USER: 'ADD USER',
    },
  },
};
export const ASC = 'asc';
export const DESC = 'desc';
export const SORT = 'sort';
export const FIELD = 'field';
export const PAGE = 'page';
export const LIMIT = 'limit';
