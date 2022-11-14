const MESSAGES = require('../helpers/messages.service')
const PASSPORT = require('passport')
const LOGGER = require('../helpers/logger.service')
const multer = require('multer')
const fs = require('fs')

// check if valid jwt
module.exports.validateJWT = function (_req, _res, _next) {
  PASSPORT.authenticate('jwt', { session: false }, (_error, _user, _info) => {
    if (_error) {
      // passport error
      _res.status(MESSAGES.INTERNAL_SERVER_ERROR.code).send(MESSAGES.INTERNAL_SERVER_ERROR.message)
    } else if (_user) {
      // user authenticated, concat user payload from jwt to _res.locals.user and forward to next middleware
      _res.locals.user = _user
      _next()
    } else {
      // invalid JWT
      _res.status(MESSAGES.UNAUTHORIZED.code).send(_info)
    }
  })(_req, _res, _next)
}

// validate login (local strategy)
module.exports.validateLogin = function (_req, _res, _next) {
  PASSPORT.authenticate('local', (_error, _user, _info) => {
    if (_error) {
      LOGGER.logError(_error)
      // passport error
      _res.status(MESSAGES.BAD_REQUEST.code).send(_error)
    } else if (_user) {
      // user authenticated, concat user payload from jwt to _res.locals.user and forward to next middleware
      _res.locals.user = _user
      _next()
    } else {
      // unknown user or wrong password or user not active or linked with Microsoft or Google
      _res.status(MESSAGES.UNAUTHORIZED.code).send(_info)
    }
  })(_req, _res)
}

// Middleware for allowing access to certain roles
// module.exports.adminRoute = function (_req, _res, _next) {
//   // Admin role id check
//   if (_res.locals.user.roleId === 1) {
//     _next()
//   } else {
//     _res.status(MESSAGES.UNAUTHORIZED.code).json(MESSAGES.UNAUTHORIZED)
//   }
// }

// Middleware to upload files
// module.exports.uploadFile = (_req, _res, _next) => {
//   // file name or user id (however file management is intended) <----- update the line below
//   const dirName = _req.params.userid
//
//   // file mime type allowed <----- update the line below
//   const fileMimeTypeAllowed = 'image/jpeg'
//
//   // main folder
//   const root = 'public/'
//
//   // create folder for org if not exists
//   const DIR = createDirIfNotExist(dirName)
//
//   function createDirIfNotExist (_id) {
//     const path = root + '/' + _id
//     if (!fs.existsSync(path)) {
//       fs.mkdir(path, { recursive: true }, (err) => {
//         if (err) throw err
//       })
//     }
//     return path
//   }
//
//   const storage = multer.diskStorage({
//     destination: (_req, file, cb) => {
//       cb(null, DIR)
//     },
//     filename: (_req, file, cb) => {
//       const FILE_FORMAT = file.mimetype.split('/')
//       cb(null, _req.params.userid + '.' + FILE_FORMAT[FILE_FORMAT.length - 1])
//     }
//   })
//
//   const upload = multer({
//     storage: storage,
//     fileFilter: (_req, file, cb) => {
//       if (file.mimetype === fileMimeTypeAllowed) {
//         cb(null, true)
//       } else {
//         cb(null, false)
//         return cb(new Error(MESSAGES.INVALID_FILE_TYPE.message))
//       }
//     }
//   })
//
//   const uploader = upload.single('file')
//   uploader(_req, _res, (_err) => {
//     // if file attached
//     if (_req.file) {
//       if (_err) {
//         _res.status(MESSAGES.INTERNAL_SERVER_ERROR.code).send({ error: _err.message })
//       } else {
//         _next()
//       }
//     } else {
//       _res.status(MESSAGES.BAD_REQUEST.code).send(MESSAGES.BAD_REQUEST)
//     }
//   })
// }



module.exports.uploadPicture = (_req, _res, _next) => {
  // file name or user id (however file management is intended) <----- update the line below
  const dirName = _req.params.user // _req.params.userid
  const typeOfPicture = _req.params.type
  const userId = _req.params.id

  // file mime type allowed <----- update the line below
  const fileMimeTypeAllowed = ['image/png', 'image/jpeg', 'image/jpg']

  // main folder
  const root = 'public/'

  // create folder for org if not exists
  let DIR = createDirIfNotExist(dirName)
  DIR = createDirIfNotExist(dirName + '/' + userId)
  DIR = createDirIfNotExist(dirName + '/' + userId + '/' + typeOfPicture)

  function createDirIfNotExist (_id) {
    const path = root + '/' + _id
    if (!fs.existsSync(path)) {
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err
      })
    }
    return path
  }

  const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
      cb(null, DIR)
    },
    filename: (_req, file, cb) => {
      const FILE_FORMAT = file.mimetype.split('/')
      // cb(null, _req.body.userid + '.' + FILE_FORMAT[FILE_FORMAT.length - 1])
      cb(null,file.originalname)
    }
  })

  const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
      if (fileMimeTypeAllowed.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error(MESSAGES.INVALID_FILE_TYPE.message))
      }
    }
  })

  const uploader = upload.single('file')
  uploader(_req, _res, (_err) => {
    // if file attached
    if (_req.file) {
      if (_err) {
        _res.status(MESSAGES.INTERNAL_SERVER_ERROR.code).send({ error: _err.message })
      } else {
        _next()
      }
    } else {
      _res.status(MESSAGES.INVALID_PICTURE_TYPE.code).send(MESSAGES.INVALID_PICTURE_TYPE)
    }
  })
}


module.exports.uploadFile = (_req, _res, _next) => {
  // file name or user id (however file management is intended) <----- update the line below
  const dirName = _req.params.user // _req.params.userid
  const typeOfPicture = _req.params.type
  const userId = _req.params.id

  // file mime type allowed <----- update the line below
  const fileMimeTypeAllowed = ['application/pdf']

  // main folder
  const root = 'public/'

  // create folder for org if not exists
  let DIR = createDirIfNotExist(dirName)
  DIR = createDirIfNotExist(dirName + '/' + userId)
  DIR = createDirIfNotExist(dirName + '/' + userId + '/' + typeOfPicture)

  function createDirIfNotExist (_id) {
    const path = root + '/' + _id
    if (!fs.existsSync(path)) {
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err
      })
    }
    return path
  }

  const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
      cb(null, DIR)
    },
    filename: (_req, file, cb) => {
      const FILE_FORMAT = file.mimetype.split('/')
      // cb(null, _req.body.userid + '.' + FILE_FORMAT[FILE_FORMAT.length - 1])
      cb(null,file.originalname)
    }
  })

  const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
      if (fileMimeTypeAllowed.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error(MESSAGES.INVALID_FILE_TYPE.message))
      }
    }
  })

  const uploader = upload.single('file')
  uploader(_req, _res, (_err) => {
    // if file attached
    if (_req.file) {
      if (_err) {
        _res.status(MESSAGES.INTERNAL_SERVER_ERROR.code).send({ error: _err.message })
      } else {
        _next()
      }
    } else {
      _res.status(MESSAGES.INVALID_FILE_TYPE.code).send(MESSAGES.INVALID_FILE_TYPE)
    }
  })
}
