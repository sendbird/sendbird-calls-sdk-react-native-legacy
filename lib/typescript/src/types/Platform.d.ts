/**
 * @platform iOS
 * @description AVAudioSession.RouteChangeReason {@link https://developer.apple.com/documentation/avfaudio/avaudiosession/routechangereason}
 */
export declare enum RouteChangeReason {
    unknown = 0,
    newDeviceAvailable = 1,
    oldDeviceUnavailable = 2,
    categoryChange = 3,
    override = 4,
    wakeFromSleep = 5,
    noSuitableRouteForCategory = 6,
    routeConfigurationChange = 7
}
/**
 * @platform iOS
 * @description AVAudioSession.Port {@link https://developer.apple.com/documentation/avfaudio/avaudiosession/port}
 */
export declare enum AVAudioSessionPort {
    /** input port types **/
    lineIn = "lineIn",
    builtInMic = "builtInMic",
    headsetMic = "headsetMic",
    /** output port types **/
    lineOut = "lineOut",
    headphones = "headphones",
    bluetoothA2DP = "bluetoothA2DP",
    builtInReceiver = "builtInReceiver",
    builtInSpeaker = "builtInSpeaker",
    HDMI = "HDMI",
    airPlay = "airPlay",
    bluetoothLE = "bluetoothLE",
    /** port types that refer to either input or output **/
    bluetoothHFP = "bluetoothHFP",
    usbAudio = "usbAudio",
    carAudio = "carAudio",
    virtual = "virtual",
    PCI = "PCI",
    fireWire = "fireWire",
    displayPort = "displayPort",
    AVB = "AVB",
    thunderbolt = "thunderbolt"
}
