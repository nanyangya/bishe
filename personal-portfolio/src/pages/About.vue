<template>
  <div class="about">
    <SectionHeader
      title="关于我"
      :subtitle="`${profile.name} · ${profile.title}`"
    />
    <p class="bio">{{ profile.bio }}</p>

    <section class="panel">
      <h3>成长时间线</h3>
      <Timeline :items="profile.timeline" />
    </section>

    <section class="grid">
      <div class="panel">
        <h3>技能评级</h3>
        <SkillMeter :items="profile.skills" />
      </div>
      <div class="panel">
        <h3>联系方式</h3>
        <ContactLinks :items="profile.contacts" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Timeline from "../components/about/Timeline.vue";
import SkillMeter from "../components/about/SkillMeter.vue";
import ContactLinks from "../components/about/ContactLinks.vue";
import SectionHeader from "../components/common/SectionHeader.vue";
import { profile } from "../data/profile";
</script>

<style scoped>
.about {
  padding: clamp(1.5rem, 4vw, 2.75rem);
  flex: 1;
  background: var(--bg);
  color: var(--text);
}

.bio {
  max-width: 58ch;
  text-align: center;
  margin: 0 auto 1.2rem;
  line-height: 1.6;
}

.panel {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1rem;
  background: var(--surface);
  margin-bottom: 1rem;
}

h3 {
  margin: 0 0 0.8rem;
  color: var(--text-h);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 860px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
