// NOTE: This file must follow the native-side convention.

/**
 * @platform iOS
 * @description AVAudioSession.RouteChangeReason {@link https://developer.apple.com/documentation/avfaudio/avaudiosession/routechangereason}
 */
export enum RouteChangeReason {
  /// The reason is unknown.
  unknown,

  /// A new device became available (e.g. headphones have been plugged in).
  newDeviceAvailable,

  /// The old device became unavailable (e.g. headphones have been unplugged).
  oldDeviceUnavailable,

  /// The audio category has changed (e.g. AVAudioSessionCategoryPlayback has been changed to
  /// AVAudioSessionCategoryPlayAndRecord).
  categoryChange,

  /// The route has been overridden (e.g. category is AVAudioSessionCategoryPlayAndRecord and
  /// the output has been changed from the receiver, which is the default, to the speaker).
  override,

  /// The device woke from sleep.
  wakeFromSleep,

  /// Returned when there is no route for the current category (for instance, the category is
  /// AVAudioSessionCategoryRecord but no input device is available).
  noSuitableRouteForCategory,

  /// Indicates that the set of input and/our output ports has not changed, but some aspect of
  /// their configuration has changed.  For example, a port's selected data source has changed.
  /// (Introduced in iOS 7.0, watchOS 2.0, tvOS 9.0).
  routeConfigurationChange,
}

/**
 * @platform iOS
 * @description AVAudioSession.Port {@link https://developer.apple.com/documentation/avfaudio/avaudiosession/port}
 */
export enum AVAudioSessionPort {
  /** input port types **/
  /// Line level input on a dock connector
  lineIn = 'lineIn',

  /// Built-in microphone on an iOS device
  builtInMic = 'builtInMic',

  /// Microphone on a wired headset.  Headset refers to an accessory that has headphone outputs paired with a microphone.
  headsetMic = 'headsetMic',

  /** output port types **/
  /// Line level output on a dock connector
  lineOut = 'lineOut',

  /// Headphone or headset output
  headphones = 'headphones',

  /// Output on a Bluetooth A2DP device
  bluetoothA2DP = 'bluetoothA2DP',

  /// The speaker you hold to your ear when on a phone call
  builtInReceiver = 'builtInReceiver',

  /// Built-in speaker on an iOS device
  builtInSpeaker = 'builtInSpeaker',

  /// Output via High-Definition Multimedia Interface
  HDMI = 'HDMI',

  /// Output on a remote Air Play device
  airPlay = 'airPlay',

  /// Output on a Bluetooth Low Energy device
  bluetoothLE = 'bluetoothLE',

  /** port types that refer to either input or output **/
  /// Input or output on a Bluetooth Hands-Free Profile device
  bluetoothHFP = 'bluetoothHFP',

  /// Input or output on a Universal Serial Bus device
  usbAudio = 'usbAudio',

  /// Input or output via Car Audio
  carAudio = 'carAudio',

  /// Input or output that does not correspond to real audio hardware
  virtual = 'virtual',

  /// Input or output connected via the PCI (Peripheral Component Interconnect) bus
  PCI = 'PCI',

  /// Input or output connected via FireWire
  fireWire = 'fireWire',

  /// Input or output connected via DisplayPort
  displayPort = 'displayPort',

  /// Input or output connected via AVB (Audio Video Bridging)
  AVB = 'AVB',

  /// Input or output connected via Thunderbolt
  thunderbolt = 'thunderbolt',
}
