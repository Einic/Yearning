<template>
  <div v-watermark="{ text: store.state.user.account.user }">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <img :src="logoUrl" style="width: 150px;cursor: pointer;" @click="goToHomePage"/>
        <Menu></Menu>
      </a-layout-sider>

      <a-layout>
        <a-row>
          <a-layout-header :style="{ zIndex: 1, width: '100%' }">
            <a-row>
              <a-col :span="1">
                <menu-unfold-outlined
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <menu-fold-outlined
                    v-else
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
              </a-col>
              <a-col :span="1">
                <a-button type="text" @click="toggle">
                  <template v-if="isFullscreen" #icon>
                    <FullscreenExitOutlined/>
                  </template>
                  <template v-else #icon>
                    <FullscreenOutlined/>
                  </template>
                </a-button>
              </a-col>
              <a-col :span="1" :offset="20">
                <a-dropdown>
                  <a-space>
                    <a-avatar :src="profile" style="cursor: pointer;"
                              @click="() => router.push({ path: '/home/profile' })"
                              :title="$t('common.profile.title')"
                    />
                    <span style="font-weight: bold;cursor: pointer;"
                          @click="() => router.push({ path: '/home/profile' })"
                          :title="$t('common.profile.title')">
                          {{ store.state.user.account.user }}
                    </span>
                  </a-space>
                </a-dropdown>
              </a-col>
            </a-row>
          </a-layout-header>
        </a-row>
        <a-row>
          <a-layout-content
              :style="{ margin: '24px 16px 0', overflow: 'initial' }"
          >
            <router-view v-slot="{ Component }">
              <component :is="Component"/>
            </router-view>
          </a-layout-content>
        </a-row>

        <a-layout-footer :style="{ textAlign: 'center', width: '100%' }">
          <a-space>
            <span>{{ Copyright }}</span>
            <a href="https://next.yearning.io" target="_blank">{{
                $t('common.help')
              }}</a>
            <a href="https://next.yearning.io/sponsor.html" target="_blank">{{
                $t('common.sponsor')
              }}</a>
            <a href="https://www.infvie.com" target="_blank">{{
                $t('common.custom_dev')
              }}</a>
          </a-space>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <a-drawer
        placement="right"
        :closable="false"
        :visible="is_open"
        @close="close"
    >
      <Menu @close="() => (is_open = false)"></Menu>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import {Copyright} from '@/config/vars';
import CommonMixin from '@/mixins/common';
import Menu from '@/components/menu/menu.vue';
import {overrideHeaders} from '@/config/request';
import {useStore} from '@/store';
import profile from '@/assets/comment/3.svg';
import {useRouter} from 'vue-router';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import {useFullscreen} from '@vueuse/core';
import {ref} from 'vue';

const goToHomePage = () => {
  router.push('/');
};

const logoUrl =
    localStorage.getItem('theme') === 'light'
        ? new URL('../../assets/login/logo.jpeg', import.meta.url).href
        : new URL('../../assets/login/logo.png', import.meta.url).href;

const {is_open, close} = CommonMixin();

const store = useStore();

const router = useRouter();

const collapsed = ref<boolean>(false);

const {isFullscreen, toggle} = useFullscreen();

overrideHeaders();

</script>
