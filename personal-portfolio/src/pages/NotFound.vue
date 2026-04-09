<template>
  <div class="nf">
    <h2>404 - 页面不存在</h2>
    <p>你访问的地址不存在，可能链接已变更。</p>
    <div class="actions">
      <router-link class="btn" to="/">返回首页</router-link>
      <router-link class="btn btn-secondary" to="/projects">去作品页</router-link>
    </div>
  </div>
</template>

<style scoped>
.nf {
  flex: 1;
  padding: clamp(2rem, 6vw, 4rem) 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.actions {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  transition: transform 0.15s ease, filter 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  filter: brightness(1.05);
  box-shadow: var(--shadow);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-secondary {
  background: color-mix(in srgb, var(--text-h) 82%, var(--accent) 18%);
}
</style>

