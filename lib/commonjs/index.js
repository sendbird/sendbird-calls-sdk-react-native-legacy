"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SendbirdCalls: true,
  CallsEvent: true,
  DefaultEventType: true,
  DirectCallEventType: true,
  GroupCallEventType: true,
  SendbirdCallsModule: true,
  DirectCall: true,
  Room: true,
  Participant: true,
  LocalParticipant: true,
  DirectCallLogListQuery: true,
  RoomListQuery: true,
  SendbirdError: true,
  DirectCallVideoView: true,
  DirectCallVideoViewProps: true,
  GroupCallVideoView: true,
  GroupCallVideoViewProps: true
};
Object.defineProperty(exports, "CallsEvent", {
  enumerable: true,
  get: function () {
    return _NativeBinder.CallsEvent;
  }
});
Object.defineProperty(exports, "DefaultEventType", {
  enumerable: true,
  get: function () {
    return _NativeBinder.DefaultEventType;
  }
});
Object.defineProperty(exports, "DirectCall", {
  enumerable: true,
  get: function () {
    return _DirectCall.DirectCall;
  }
});
Object.defineProperty(exports, "DirectCallEventType", {
  enumerable: true,
  get: function () {
    return _NativeBinder.DirectCallEventType;
  }
});
Object.defineProperty(exports, "DirectCallLogListQuery", {
  enumerable: true,
  get: function () {
    return _BridgedQuery.DirectCallLogListQuery;
  }
});
Object.defineProperty(exports, "DirectCallVideoView", {
  enumerable: true,
  get: function () {
    return _DirectCallVideoView.default;
  }
});
Object.defineProperty(exports, "DirectCallVideoViewProps", {
  enumerable: true,
  get: function () {
    return _DirectCallVideoView.DirectCallVideoViewProps;
  }
});
Object.defineProperty(exports, "GroupCallEventType", {
  enumerable: true,
  get: function () {
    return _NativeBinder.GroupCallEventType;
  }
});
Object.defineProperty(exports, "GroupCallVideoView", {
  enumerable: true,
  get: function () {
    return _GroupCallVideoView.default;
  }
});
Object.defineProperty(exports, "GroupCallVideoViewProps", {
  enumerable: true,
  get: function () {
    return _GroupCallVideoView.GroupCallVideoViewProps;
  }
});
Object.defineProperty(exports, "LocalParticipant", {
  enumerable: true,
  get: function () {
    return _Participant.LocalParticipant;
  }
});
Object.defineProperty(exports, "Participant", {
  enumerable: true,
  get: function () {
    return _Participant.Participant;
  }
});
Object.defineProperty(exports, "Room", {
  enumerable: true,
  get: function () {
    return _Room.Room;
  }
});
Object.defineProperty(exports, "RoomListQuery", {
  enumerable: true,
  get: function () {
    return _BridgedQuery.RoomListQuery;
  }
});
exports.SendbirdCalls = void 0;
Object.defineProperty(exports, "SendbirdCallsModule", {
  enumerable: true,
  get: function () {
    return _SendbirdCallsModule.default;
  }
});
Object.defineProperty(exports, "SendbirdError", {
  enumerable: true,
  get: function () {
    return _SendbirdError.SendbirdError;
  }
});

var _NativeBinder = _interopRequireWildcard(require("./libs/NativeBinder"));

var _SendbirdCallsModule = _interopRequireDefault(require("./libs/SendbirdCallsModule"));

var _logger = require("./utils/logger");

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _logger[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logger[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _DirectCall = require("./libs/DirectCall");

var _Room = require("./libs/Room");

var _Participant = require("./libs/Participant");

var _BridgedQuery = require("./libs/BridgedQuery");

var _SendbirdError = require("./libs/SendbirdError");

var _DirectCallVideoView = _interopRequireWildcard(require("./libs/DirectCallVideoView"));

var _GroupCallVideoView = _interopRequireWildcard(require("./libs/GroupCallVideoView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const nativeBinder = new _NativeBinder.default();
const SendbirdCalls = new _SendbirdCallsModule.default(nativeBinder);
exports.SendbirdCalls = SendbirdCalls;
//# sourceMappingURL=index.js.map