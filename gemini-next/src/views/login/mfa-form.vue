<template>
  <a href="/#/login">
  <img src="../../assets/login/logo.png" width="350" style="margin-top: -30%; cursor: pointer;" :title="$t('user.form.mfa_to_login')"/>
  </a>
  <br />
  <a-form
    ref="formRef"
    :model="mfaForm"
    layout="vertical"
    :rules="rules"
    >
    <div>
      <p style="text-align: center;font-size: 90%; margin-top: 3px;">{{$t('user.form.mfa_operate_top')}}</p>
    </div>
    <div style="margin: auto 38%">
      <img src="../../assets/login/otp_auth.png" width="104" height="174" style="opacity: 0.5; margin-top: 3px;">
    </div>
    <div style="text-align: center;font-size: 90%; margin-top: 6px;">
      <p>{{$t('user.form.mfa_operate_bot')}}</p>
    </div>
    <a-form-item :label="$t('user.form.mfa_input')" name="mfa_code">
      <a-input v-model:value="mfaForm.mfa_code" style="margin-top: 3px;" :placeholder="$t('user.form.mfa_prompt')"></a-input>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { UnwrapRef, reactive } from 'vue';
import {message} from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import CommonMixins from "@/mixins/common";
import {MfaForm, postLoginUsermfa,toModifiedMfa} from "@/apis/loginApi";
import router from "@/router";
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

const { regExpMfaCode } = CommonMixins();

const store = useStore();
const route = useRoute();

const { t } = useI18n();

const username = router.currentRoute.value.query.username as string;
const password = router.currentRoute.value.query.password as string;

const mfaForm: UnwrapRef<MfaForm> = reactive({
  username: username,
  password: password,
  is_ldap: false,
  is_oidc: false,
  is_mfa: true,
  mfa_code: '',
});

const onMfaInputChange = async (value: string) => {
  mfaForm.mfa_code = value
  const modifiedMfa = toModifiedMfa(mfaForm);
  const { data } = await postLoginUsermfa(modifiedMfa);
  if (data.code === 1301) {
    return;
  }

  if (data.payload.mfa_account===true) {
    message.success(t('user.form.valid.maf_login_success'));
    store.commit('user/USER_STORE', data.payload);
    store.commit('menu/CHANGE_SELECTED', ['/home']);
    router.replace('/home');
  }

};

const rules = {
  mfa_code: [
    { validator: regExpMfaCode, trigger: 'blur', required: true },
    {
      validator: async (rule: any, value: string, callback: Function) => {
        try {
          await regExpMfaCode(rule, value);
          onMfaInputChange(value);
          callback();
        } catch (error) {
          callback(new Error('Validation failed'));
        }
      },
      trigger: 'blur',
      required: true
    },
  ],
};

</script>