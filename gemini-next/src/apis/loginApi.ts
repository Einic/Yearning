import {COMMON_URI, request} from '@/config/request';

export interface LoginFormProps {
  username: string;
  password: string;
  is_ldap: boolean;
  is_oidc: boolean;
  is_mfa:  boolean,
}

export interface LoginFrom extends LoginFormProps {
}

export interface MfaForm extends LoginFormProps {
  mfa_code: string;
}

interface ModifiedMfa extends Omit<MfaForm, 'mfa_code'> {
  mfa_code: number;
}

export function signIn(login: LoginFrom) {
  return request.post(login.is_ldap ? '/ldap' : '/login', login);
}

export function systemRegisterState() {
  return request.get('/fetch');
}

export function systemLang() {
  return request.get('/lang');
}

export function getOIDCState() {
  return request.get('/oidc/state');
}

export function toModifiedMfa(mfaForm: MfaForm): ModifiedMfa {
  return {
    ...mfaForm,
    mfa_code: parseInt(mfaForm.mfa_code, 10),
  };
}

export function postLoginUsermfa(mfa: ModifiedMfa) {
  return request.post( '/mfa', mfa);
}