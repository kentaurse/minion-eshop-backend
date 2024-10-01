module.exports = {
    SOCKET: '/socket',
  
    SOCKET_TYPES: {
      CHAT: 'SOCKET_TYPE_CHAT',
      LOGGEDUSERS: 'SOCKET_TYPE_LOGGEDUSERS',
      RELAX: 'SOCKET_TYPE_RELAX',
    },
  
    CHAT_CONSTS: {
      // ----- Server to Client -----
      S2C_CHAT_ERROR:                   'S2C_CHAT_ERROR',
      S2C_CHAT_AUTHORIZED:              'S2C_CHAT_AUTHORIZED',
      S2C_CHAT_UNAUTHORIZED:            'S2C_CHAT_UNAUTHORIZED',
      S2C_CHAT_ACTIVEINFO:              'S2C_CHAT_ACTIVEINFO',
  
      S2C_CHAT_GROUP_NEW:               'S2C_CHAT_GROUP_NEW',
      S2C_CHAT_GROUP_EDIT:              'S2C_CHAT_GROUP_EDIT',
      S2C_CHAT_GROUP_ARCHIVE:           'S2C_CHAT_GROUP_ARCHIVE',    
  
      S2C_CHAT_ROOM_MESSAGE_NEW:        'S2C_CHAT_ROOM_MESSAGE_NEW',
      S2C_CHAT_ROOM_MESSAGE_FILES:      'S2C_CHAT_ROOM_MESSAGE_FILES',
      S2C_CHAT_ROOM_MESSAGE_EDIT:       'S2C_CHAT_ROOM_MESSAGE_EDIT',
      S2C_CHAT_ROOM_MESSAGE_DELETE:     'S2C_CHAT_ROOM_MESSAGE_DELETE',
      S2C_CHAT_ROOM_MESSAGE_RECOMMEND:  'S2C_CHAT_ROOM_MESSAGE_RECOMMEND',
      S2C_CHAT_ROOM_MESSAGE_RECORD:     'S2C_CHAT_ROOM_MESSAGE_RECORD',
      S2C_CHAT_ROOM_MESSAGE_FILE_DOWNLOAD:  'S2C_CHAT_ROOM_MESSAGE_FILE_DOWNLOAD',
  
      S2C_CHAT_ROOM_USER_ENTER:         'S2C_CHAT_ROOM_USER_ENTER',
      S2C_CHAT_ROOM_USER_LEAVE:         'S2C_CHAT_ROOM_USER_LEAVE',
      S2C_CHAT_ROOM_USER_TYPING:        'S2C_CHAT_ROOM_USER_TYPING',
      S2C_CHAT_ROOM_USER_STOPTYPING:    'S2C_CHAT_ROOM_USER_STOPTYPING',
  
      S2C_CHAT_ROOM_CREATE:             'S2C_CHAT_ROOM_CREATE',
      S2C_CHAT_ROOM_EDIT:               'S2C_CHAT_ROOM_EDIT',
      S2C_CHAT_ROOM_ARCHIVE:            'S2C_CHAT_ROOM_ARCHIVE',
      S2C_CHAT_ROOM_LOAD_MOREMESSAGES:  'S2C_CHAT_ROOM_LOAD_MOREMESSAGES',
  
  
      // ----- Client to Server -----
      C2S_CHAT_AUTHORIZATION:           'C2S_CHAT_AUTHORIZATION',
      C2S_CHAT_DISCONNECT:              'C2S_CHAT_DISCONNECT',
  
      C2S_CHAT_GROUP_NEW:               'C2S_CHAT_GROUP_NEW',
      C2S_CHAT_GROUP_EDIT:              'C2S_CHAT_GROUP_EDIT',
      C2S_CHAT_GROUP_ARCHIVE:           'C2S_CHAT_GROUP_ARCHIVE',
  
      C2S_CHAT_ROOM_MESSAGE_NEW:        'C2S_CHAT_ROOM_MESSAGE_NEW',
      C2S_CHAT_ROOM_MESSAGE_FILES:      'C2S_CHAT_ROOM_MESSAGE_FILES',
      C2S_CHAT_ROOM_MESSAGE_EDIT:       'C2S_CHAT_ROOM_MESSAGE_EDIT',
      C2S_CHAT_ROOM_MESSAGE_DELETE:     'C2S_CHAT_ROOM_MESSAGE_DELETE',
      C2S_CHAT_ROOM_MESSAGE_RECOMMEND:  'C2S_CHAT_ROOM_MESSAGE_RECOMMEND',
      C2S_CHAT_ROOM_MESSAGE_RECORD:     'C2S_CHAT_ROOM_MESSAGE_RECORD',
      C2S_CHAT_ROOM_MESSAGE_FILE_DOWNLOAD: 'C2S_CHAT_ROOM_MESSAGE_FILE_DOWNLOAD',
  
      C2S_CHAT_ROOM_USER_ENTER:         'C2S_CHAT_ROOM_USER_ENTER',
      C2S_CHAT_ROOM_USER_LEAVE:         'C2S_CHAT_ROOM_USER_LEAVE',
      C2S_CHAT_ROOM_USER_TYPING:        'C2S_CHAT_ROOM_USER_TYPING',
      C2S_CHAT_ROOM_USER_STOPTYPING:    'C2S_CHAT_ROOM_USER_STOPTYPING',
  
      C2S_CHAT_ROOM_CREATE:             'C2S_CHAT_ROOM_CREATE',
      C2S_CHAT_ROOM_EDIT:               'C2S_CHAT_ROOM_EDIT',
      C2S_CHAT_ROOM_ARCHIVE:            'C2S_CHAT_ROOM_ARCHIVE',
      C2S_CHAT_ROOM_LOAD_MOREMESSAGES:  'C2S_CHAT_ROOM_LOAD_MOREMESSAGES',
  
  
      // ----- Message Type -----
      CHAT_MESSAGE_TYPE_NORMAL:         'NORMAL',
      CHAT_MESSAGE_TYPE_FILE:           'FILE',
      CHAT_MESSAGE_TYPE_EDITED:         'EDITED',
      CHAT_MESSAGE_TYPE_DELETED:        'DELETED',
      CHAT_MESSAGE_TYPE_USER_ADD:       'USER_ADDED',
      CHAT_MESSAGE_TYPE_USER_LEAVE:     'USER_LEAVE',
      CHAT_MESSAGE_TYPE_USER_REMOVED:   'USER_REMOVED',
      CHAT_MESSAGE_TYPE_RECORD:         'RECORD',
  
      // ----- Default Message Loading Count -----
      MESSAGE_LOAD_COUNT:         20,
    },
  
    AUTHORIZATION_CONSTS: {
      // ----- Server to Client -----
      S2C_AUTH_ERROR:                   'S2C_AUTH_ERROR',
      S2C_AUTH_AUTHORIZED:              'S2C_AUTH_AUTHORIZED',
      S2C_AUTH_UNAUTHORIZED:            'S2C_AUTH_UNAUTHORIZED',
      S2C_AUTH_USERLISTINFO:            'S2C_AUTH_USERLISTINFO',
  
      // ----- Client to Server -----
      C2S_AUTH_AUTHORIZATION:           'C2S_AUTH_AUTHORIZATION',
      C2S_AUTH_REGISTERPAGEURL:         'C2S_AUTH_REGISTERPAGEURL',
    },
  
    LOGGEDUSERS_CONSTS: {
      // ----- Server to Client -----
      S2C_LOGGEDUSERS_USERS:            'S2C_LOGGEDUSERS_USERS',
      S2C_LOGGEDUSERS_UNAUTHORIZED:     'S2C_LOGGEDUSERS_UNAUTHORIZED',
  
      // ----- Client to Server -----
      C2S_LOGGEDUSERS_CONNECT:          'C2S_LOGGEDUSERS_CONNECT',
      C2S_LOGGEDUSERS_DISCONNECT:       'C2S_LOGGEDUSERS_DISCONNECT',
      C2S_LOGGEDUSERS_REGISTER_ACTION:  'C2S_LOGGEDUSERS_REGISTER_ACTION',
    },
  
    NOTIFICATION_CONSTS: {
      // ----- Server to Client -----
      S2C_NOTIFICATION_BROADCAST:       'S2C_NOTIFICATION_BROADCAST',
  
      // ----- Client to Server -----
      C2S_NOTIFICATION_CREATE:          'C2S_NOTIFICATION_CREATE',
      C2S_NOTIFICATION_READ:            'C2S_NOTIFICATION_READ',
      C2S_NOTIFICATION_READ_BY_OBJID:   'C2S_NOTIFICATION_READ_BY_OBJID',
    },
  
    RELAX_CONSTS: {
      // ----- Server to Client -----
      S2C_RELAX_ERROR:                  'S2C_RELAX_ERROR',
      S2C_RELAX_AUTHORIZED:             'S2C_RELAX_AUTHORIZED',
      S2C_RELAX_UNAUTHORIZED:           'S2C_RELAX_UNAUTHORIZED',
      S2C_RELAX_ACTIVEINFO:             'S2C_RELAX_ACTIVEINFO',
  
      S2C_RELAX_ROOM_JOIN:              'S2C_RELAX_ROOM_JOIN',   
  
      S2C_RELAX_GAMEROOM_CREATE:        'S2C_RELAX_GAMEROOM_CREATE',
      S2C_RELAX_GAMEROOM_JOIN:          'S2C_RELAX_GAMEROOM_JOIN',
      S2C_RELAX_GAMEROOM_VISIT:         'S2C_RELAX_GAMEROOM_VISIT',
      S2C_RELAX_GAMEROOM_FINISH:        'S2C_RELAX_GAMEROOM_FINISH',
      S2C_RELAX_GAMEROOM_ROOMTIME:      'S2C_RELAX_GAMEROOM_ROOMTIME',
      S2C_RELAX_GAMEROOM_OPERATE:       'S2C_RELAX_GAMEROOM_OPERATE',
      S2C_RELAX_GAMEROOM_INFO:          'S2C_RELAX_GAMEROOM_INFO',
  
      // ----- Client to Server -----
      C2S_RELAX_AUTHORIZATION:          'C2S_RELAX_AUTHORIZATION',
      C2S_RELAX_DISCONNECT:             'C2S_RELAX_DISCONNECT',
  
      C2S_RELAX_ROOM_JOIN:              'C2S_RELAX_ROOM_JOIN',   
  
      C2S_RELAX_GAMEROOM_CREATE:        'C2S_RELAX_GAMEROOM_CREATE',
      C2S_RELAX_GAMEROOM_JOIN:          'C2S_RELAX_GAMEROOM_JOIN',
      C2S_RELAX_GAMEROOM_VISIT:         'C2S_RELAX_GAMEROOM_VISIT',
      C2S_RELAX_GAMEROOM_FINISH:        'C2S_RELAX_GAMEROOM_FINISH',
      C2S_RELAX_GAMEROOM_ROOMTIME:      'C2S_RELAX_GAMEROOM_ROOMTIME',
      C2S_RELAX_GAMEROOM_OPERATE:       'C2S_RELAX_GAMEROOM_OPERATE',
      C2S_RELAX_GAMEROOM_INFO:          'C2S_RELAX_GAMEROOM_INFO',
  
      // ----- NORMAL -----
      first:                            'first',
      room:                             'room',
      tetris:                           'tetris',
      chess:                            'chess',
      // tankwar                        'tankwar',
      // kingofsea                      'kingofsea',
  
      all:                              'all',
      tetris:                           'tetris',
      chess:                            'chess',
  
      PLAYER_STATUS_NONE:         0,        // NONE
      PLAYER_STATUS_WAIT:         1,        // Waiting!
      PLAYER_STATUS_READY:        2,        // READY
      PLAYER_STATUS_ON:           3,        // On playing.
      PLAYER_STATUS_ROUND_WIN:    4,        // Round Victory!
      PLAYER_STATUS_ROUND_FAIL:   5,        // Round Fail!
      PLAYER_STATUS_GAME_WIM:     6,        // Game Victory!
      PLAYER_STATUS_GAME_FAIL:    7,        // Game Fail!
  
      MATCH_GAME_STATUS_INIT:     'init',
      MATCH_GAME_STATUS_ON:       'on',
      MATCH_GAME_STATUS_OFF:      'off',
  
      MATCH_EVENT_NEW:            'new',
      MATCH_EVENT_READY:          'ready',
      MATCH_EVENT_NEXT:           'next',
  
      ROOM_STATUS_WAIT:           'wait',
      ROOM_STATUS_READY:          'ready',
      ROOM_STATUS_ON:             'on',
      ROOM_STATUS_ROUND_OFF:      'halfoff',
      ROOM_STATUS_MATCH_OFF:      'off',
  
    },
  
  }