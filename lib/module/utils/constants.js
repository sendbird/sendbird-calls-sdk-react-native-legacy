import { Platform } from 'react-native';
export const LINKING_ERROR = "The package '@sendbird/calls-react-native' doesn't seem to be linked. Make sure: \n" + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
//# sourceMappingURL=constants.js.map