<template>
  <nav position="fixed left-5 bottom-5" inline-flex gap-2 text-xl>
    <button icon-btn @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>
  </nav>
</template>
