// This file contains all the possible responses for rest endpoints

module.exports = {
  AUTHENTICATION_FAILED: {
    code: 401,
    message: 'Invalid login credentials.',
    success: false
  },
  INVALID_TOKEN: {
    code: 401,
    message: 'Invalid token.',
    success: false
  },
  SUCCESSFUL_EMAIL_SENT: {
    code: 200,
    message: 'Email sent successfully.',
    success: true
  },
  SUCCESSFUL_LOGIN: {
    code: 200,
    message: 'Successfully logged in',
    success: true
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Something unexpected happened',
    success: false
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'You are not authorized to perform this action',
    success: false
  },
  INCORRECT_PASSWORD: {
    code: 401,
    message: 'Incorrect Password',
    success: false
  },
  SUCCESSFUL_RESET_PASSWORD: {
    code: 200,
    message: 'Reset password successful',
    success: true
  },
  RESET_PASSWORD_AND_LINKED_WITH_MICROSOFT: {
    code: 401,
    message: 'Incorrect Password. Your account is linked with Microsoft, please continue with Microsoft or reset your password',
    success: false
  },
  RESET_PASSWORD_AND_LINKED_WITH_GOOGLE: {
    code: 401,
    message: 'Incorrect Password. Your account is linked with Google, please continue with Google or reset your password',
    success: false
  },
  USER_ALREADY_EXIST: {
    code: 409,
    message: 'The user already exist with this email',
    success: false
  },
  SUCCESSFUL_DELETE: {
    code: 200,
    message: 'Successfully deleted',
    success: true
  },
  SUCCESSFUL_CREATE: {
    code: 201,
    message: 'Successfully created',
    success: true
  },
  SUCCESSFUL_UPDATE: {
    code: 200,
    message: 'Updated successfully',
    success: true
  },
  SUCCESSFUL_USER_REGISTERED: {
    code: 201,
    message: 'Registration Successful. We have sent you an email for account activation',
    success: true
  },
  SUCCESSFUL_TRANSACTION: {
    code: 200,
    message: 'Transaction successful',
    success: true
  },
  ERROR_UPDATE: {
    code: 400,
    message: 'Update failed',
    success: false
  },
  SUCCESSFUL: {
    code: 200,
    success: true,
    message: 'Successfully completed'
  },
  NOT_FOUND: {
    code: 404,
    success: true,
    message: 'Requested API not found'
  },
  USER_NOT_FOUND: {
    code: 403,
    success: false,
    message: 'User not found with this email'
  },
  ALREADY_EXIST: {
    code: 200,
    success: true,
    message: 'Already exists'
  },
  FORBIDDEN: {
    code: 403,
    message: 'You are not authorized to complete this action',
    success: false
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Bad request. Please try again with valid parameters',
    success: false
  },
  IN_COMPLETE_REQUEST: {
    code: 422,
    message: 'Required field missing',
    success: false
  },
  NOT_ACTIVE: {
    code: 403,
    message: 'Account not activated yet.',
    success: false
  },
  INVALID_PICTURE_TYPE: {
    code: 400,
    message: 'Only images of type .jpeg, .jpg or .png are allowed',
    success: false
  },
  LINKED_WITH_MICROSOFT: {
    code: 400,
    message: 'Email already exist on Microsoft',
    success: false
  },
  LINKED_WITH_GOOGLE: {
    code: 400,
    message: 'Email already exist on Google',
    success: false
  },
  UNSUCCESSFUL_DELETE: {
    code: 403,
    message: 'Unable to delete the requested data',
    success: false
  },
  UNSUCCESSFUL_TRANSACTION: {
    code: 403,
    message: 'Transaction unsuccessful',
    success: true
  },
  UNSUCCESSFUL_UPDATE: {
    code: 403,
    message: 'Unable to update the requested data',
    success: false
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    message: 'Unable to find requested resource',
    success: false
  },
  INVALID_FILE_TYPE: {
    code: 400,
    message: 'File type not allowed',
    success: false
  },
  ACTIVATION_FAILED: {
    code: 403,
    message: 'Unable to activate the account',
    success: false
  }
}
