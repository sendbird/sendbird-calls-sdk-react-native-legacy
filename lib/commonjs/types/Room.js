"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomType = exports.RoomState = void 0;
let RoomType;
exports.RoomType = RoomType;

(function (RoomType) {
  RoomType["SMALL_ROOM_FOR_VIDEO"] = "SMALL_ROOM_FOR_VIDEO";
  RoomType["LARGE_ROOM_FOR_AUDIO_ONLY"] = "LARGE_ROOM_FOR_AUDIO_ONLY";
})(RoomType || (exports.RoomType = RoomType = {}));

let RoomState;
exports.RoomState = RoomState;

(function (RoomState) {
  RoomState["OPEN"] = "OPEN";
  RoomState["DELETED"] = "DELETED";
})(RoomState || (exports.RoomState = RoomState = {}));
//# sourceMappingURL=Room.js.map