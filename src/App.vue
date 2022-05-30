<script setup lang="ts" name="App">
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.add('light');
}

const isDark = useDark({
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <main text="center gray-700 dark:gray-200">
    <div class="btn" @click="toggleDark()">Toggle</div>

    <router-view v-slot="{ Component, route }">
      <transition
        :name="route.meta.transition || 'fade'"
        :key="route.path"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.btn {
  @apply w-full h-12 flex mb-3 items-center justify-center text-gray-200 bg-gray-700 text-base rounded-md dark:bg-gray-800;
}
</style>
