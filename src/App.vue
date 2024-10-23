<template>
  <div flex="~ col" h-screen w-full p="x-6 y-6" text="gray-700 dark:gray-200">
    <TheHeader />
    <main id="main" mt-4 w-full flex-1 overflow-auto>
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
