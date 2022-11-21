import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_MICROPHONE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
};

const PLATFORM_PHOTO_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const REQUEST_PERMISSION_TYPE = {
  microphone: PLATFORM_MICROPHONE_PERMISSIONS,
  photo: PLATFORM_PHOTO_PERMISSIONS,
};

const PERMISSION_TYPE = {
  microphone: 'microphone',
  photo: 'photo',
};

class AppPermission {
  //Add Single Permission
  checkpermission = async (type): Promise<boolean> => {
    console.log('AppPermission checkpermission type: ', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log('AppPermission permission type: ', permissions);
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      console.log('AppPermission result type: ', result);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return this.requestPermission(permissions);
    } catch (error) {
      console.log('AppPermission result error: ', error);
      return false;
    }
  };

  //Add Multiple Permission
  requestMultiple = async (types): Promise<boolean> => {
    console.log('AppPermission requestMultiplePermission type: ', types);
    const results1 = [];
    for (const type of types) {
      const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];
      console.log('AppPermission permission result: ', permission);
      if (permission) {
        const result = await this.requestPermission(permission);
        results1.push(result);
      }
    }
    for (const result of results1) {
      if (!result) {
        return true;
      }
    }
    return false;
  };
  //Ask Permission from user
  requestPermission = async (permissions): Promise<boolean> => {
    console.log('AppPermission requestPermission type: ', permissions);
    try {
      const result = await request(permissions);
      console.log('AppPermission requestPermission result: ', result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('AppPermission requestPermission error: ', error);
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
