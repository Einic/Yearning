import { request, COMMON_URI, Res } from '@/config/request';
import { CommonPage } from '@/types';
import axios from 'axios';

interface UpdateMFARequest {
  is_mfa: number;
}

export interface UserParams {
  page: number;
  find: UserExpr;
}

export interface UserExpr {
  dept: string;
  username: string;
  real_name: string;
  email: string;
}

export interface UserTableData {
  username: string;
  id: string;
  department: string;
  real_name: string;
  email: string;
}

export interface UserResp {
  data: UserTableData[];
  page: number;
}

export interface RegisterForm {
  username?: string;
  password: string;
  confirm_password: string;
  real_name: string;
  department: string;
  email: string;
  theme?: string;
  lang?: string;
  is_mfa: number;
  mfa_code: number;
  mfa_secret: string;
}

export interface IUserProfile {
  user: RegisterForm;
}

export interface Password {
  origin: string;
  password: string;
  confirm_password: string;
}

export interface Target {
  auditor: string[];
  ddl_source: string[];
  dml_source: string[];
  query_source: string[];
}

export interface RespGroups {
  own: string[];
  groups: Groups[];
  target: Target;
}

export interface Groups {
  name: string;
  id: number;
}

export interface IUpdatePassword {
  password: Password;
  username: string;
  isManager: boolean;
}

export function updatePassword(params: IUpdatePassword) {
  return request({
    url: params.isManager
      ? `${COMMON_URI}/manage/user?tp=password`
      : `${COMMON_URI}/common/edit?tp=password`,
    method: params.isManager ? 'POST' : 'PUT',
    data: {
      password: params.password.password,
      origin: params.password.origin,
      username: params.username,
    },
  });
}

export function getUserGroups(user: string) {
  return request.get(`${COMMON_URI}/fetch/groups`, {
    params: { user: user },
  });
}

export function updateUserGroups(groups: string[], user: string) {
  return request.post(`${COMMON_URI}/manage/user?tp=policy`, {
    group: groups,
    username: user,
  });
}

export function deleteUserAccount(user: string) {
  return request.delete(`${COMMON_URI}/manage/user`, {
    params: { user: user },
  });
}

export function getUserInfo() {
  return request.get(`${COMMON_URI}/fetch/userinfo`);
}

export function getUsermfa() {
  return request.get(`${COMMON_URI}/otp/usermfa`);
}

export async function postUsermfa(passcode: string, mfa_secret: string) {
  try {
    // Parse the passcode to an integer (assuming it's a valid number)
    const intPasscode = parseInt(passcode);

    // Check if parsing was successful (optional)
    if (isNaN(intPasscode)) {
      throw new Error('Invalid passcode format. Please enter a number.');
    }

    const response = await request.post(`${COMMON_URI}/otp/validate`, {
      Passcode: intPasscode,
      mfa_secret: mfa_secret,
    });
    return response;
  } catch (error) {
    throw error;
  }
}


export function getUserList(params: CommonPage<UserExpr>) {
  return request.put<Res<UserResp>>(`${COMMON_URI}/manage/user`, params);
}

export function updateUserInfo(user: RegisterForm, isManager: boolean) {
  return request.post(
    isManager
      ? `${COMMON_URI}/manage/user?tp=edit`
      : `${COMMON_URI}/common/edit?tp=edit`,
    user
  );
}

export function updateUserPrincipal() {
  return request.post(`${COMMON_URI}/manage/user?tp=principal`);
}

export function signUpUser(register: RegisterForm, isManager: boolean) {
  return request.post(
    isManager ? `${COMMON_URI}/manage/user?tp=add` : '/register',
    register
  );
}

// export function queryMargeGroup(groups: string[]) {
//   return request.get(`${COMMON_URI}/manage/policy`, {
//     params: { group: groups.join(',') },
//   });
// }
