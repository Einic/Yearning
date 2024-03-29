<template>
  <PageHeader
    :title="$t('common.profile.title')"
    :sub-title="$t('common.profile.subtitle')"
  ></PageHeader>
  <a-card>
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="10">
        <a-form
          ref="formRef"
          :model="formItem"
          layout="vertical"
          :rules="rules"
        >
          <a-form-item :label="$t('user.form.user')">
            <a-input
              v-model:value="store.state.user.account.user"
              disabled
            ></a-input>
          </a-form-item>
          <a-form-item :label="$t('user.form.dept')">
            <a-input v-model:value="formItem.department"></a-input>
          </a-form-item>
          <a-form-item :label="$t('user.form.real_name')">
            <a-input v-model:value="formItem.real_name"></a-input>
          </a-form-item>
          <a-form-item :label="$t('user.form.email')">
            <a-input v-model:value="formItem.email"></a-input>
          </a-form-item>
          <a-form-item :label="$t('common.theme')">
            <a-select v-model:value="formItem.theme" @change="changeTheme">
              <a-select-option key="dark" value="dark"
                >{{ $t('common.theme.dark') }}
              </a-select-option>
              <a-select-option key="light" value="light"
                >{{ $t('common.theme.light') }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('user.password.new')" name="password">
            <a-input-password
              v-model:value="formItem.password"
            ></a-input-password>
          </a-form-item>
          <a-form-item
            :label="$t('user.password.confirm')"
            name="confirm_password"
          >
            <a-input-password
              v-model:value="formItem.confirm_password"
            ></a-input-password>
          </a-form-item>

          <a-form-item :label="$t('user.form.mfa_auth')" name="mfa_auth">
            <a-switch id="mfa-switch" v-model:checked="isMfaChecked" @change="toggleMFA"></a-switch>
          </a-form-item>

          <div v-if="isMfaChecked">
            <div style="margin-top: -20px; font-size: 90%;">{{ $t('user.form.mfa') }}</div>

            <div style="cursor: pointer; display: flex; justify-content: center; margin-top: 10px;" :title="$t('user.form.mfa_refresh_qrcode')">
              <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="qrcode" style="width: 200px; height: 200px;" @click="setQrCodeAndSecret">
            </div>

            <div style="margin-top: 10px; font-size: 90%;">Secret: {{ mfaSecret }}</div>

            <a-form-item :label="$t('user.form.mfa_input')" name="mfa_code">
              <a-input v-model:value="formItem.mfa_code" style="margin-top: -5px;" :placeholder="$t('user.form.mfa_prompt')"></a-input>
            </a-form-item>
          </div>

          <a-form-item>
            <a-button
              block
              type="primary"
              @click="() => updateUserInfo(formItem, false)"
              >{{ $t('common.save') }}</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import { useStore } from '@/store';
  import { onMounted, ref,watch } from 'vue';
  import CommonMixins from '@/mixins/common';
  import PageHeader from '@/components/pageHeader/pageHeader.vue';
  import { RuleObject } from 'ant-design-vue/lib/form/interface';
  import { getUserInfo, RegisterForm, updateUserInfo } from '@/apis/user';
  import { useI18n } from 'vue-i18n';
  import qrcode from 'qrcode';
  import { getUsermfa,postUsermfa } from '@/apis/user';
  import {message} from "ant-design-vue";

  const { t } = useI18n();

  const store = useStore();

  const formItem = ref<RegisterForm>({
    password: '',
    confirm_password: '',
    real_name: '',
    email: '',
    department: '',
    theme: 'dark',
    // lang: 'en_US',
    is_mfa: 0,
    mfa_code: 0,
    mfa_secret: '',
  });

  // Monitor is_mfa changes and convert to Boolean value
  watch(formItem, (newValue) => {
    isMfaChecked.value = !!newValue.is_mfa;
  });

  // Whether to check the calculated attribute of MFA switch
  const isMfaChecked = ref<boolean>(!!formItem.value.is_mfa);

  const qrCodeUrl = ref<string | null>(null);
  const mfaSecret = ref<string | null>(null);

  // Get and set QR Code URL and MFA Secret
  const setQrCodeAndSecret = async () => {
      try {
        const {data} = await getUsermfa();
        if (data && data.payload && data.payload.qrCodeUrl && data.payload.secret) {
          const qrCodeDataURL = await qrcode.toDataURL(data.payload.qrCodeUrl);
          qrCodeUrl.value = qrCodeDataURL;
          mfaSecret.value = data.payload.secret;
        } else {
          console.error('API does not return correct QR code URL and 2FA');
        }
      } catch (error) {
        console.error('An error occurred while obtaining secret and QR code information:', error);
      }
  };

  const toggleMFA = async (isChecked: boolean) => {
    formItem.value.is_mfa = isChecked ? 1 : 0;
    if (isChecked) {
      await setQrCodeAndSecret();
    } else {
      qrCodeUrl.value = null;
      mfaSecret.value = null;
    }
  };

  const onMfaInputChange = async (value: string) => {
    try {
      const response = await postUsermfa(value, mfaSecret.value!);
      const { payload } = response.data;
      if (payload === 'Valid 2FA passcode') {
        formItem.value.mfa_secret = mfaSecret.value ?? formItem.value.mfa_secret;
        message.success(t('user.form.valid.maf_success'));
      } else {
        message.warn(t('user.form.valid.mfa_error'));
      }
    } catch (error) {
      message.error(t('user.form.valid.mfa_error'));
    }
  };


  const changeTheme = (e: any) => {
    localStorage.setItem('theme', e);
    location.reload();
  };


  const validPassword = async (rule: RuleObject, value: string) => {
    const pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!pPattern.test(value)) {
      return Promise.reject(t('user.form.valid.password'));
    }
    if (value !== formItem.value.password && value !== '') {
      return Promise.reject('输入的密码不一致');
    } else {
      return Promise.resolve();
    }
  };

  const { regExpPassword } = CommonMixins();
  const { regExpMfaCode } = CommonMixins();

  const rules = {
    password: [{ validator: regExpPassword, trigger: 'blur', required: true }],
    confirm_password: [
      { trigger: 'blur', message: '请确认密码', required: true },
      { required: true, validator: validPassword, trigger: 'blur' },
    ],
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

  onMounted(async () => {
    const { data } = await getUserInfo();
    formItem.value = data.payload;
    if (formItem.value.is_mfa) {
      toggleMFA(true)
    }
    localStorage.getItem('theme') === null
      ? (formItem.value.theme = 'dark')
      : (formItem.value.theme = localStorage.getItem('theme') as string);
    localStorage.getItem('lang') === null
      ? (formItem.value.lang = 'zh_CN')
      : (formItem.value.lang = localStorage.getItem('lang') as string);
  });

</script>
