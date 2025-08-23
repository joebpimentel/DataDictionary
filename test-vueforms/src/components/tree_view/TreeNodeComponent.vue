<template>
  <div class="tree-node">
    <div class="node-content">
      <input
        type="checkbox"
        :checked="node.checked"
        :indeterminate.prop="node.indeterminate"
        @change="toggleCheck"
      />
      <span @click="toggleExpand">{{ node.name }}</span>
    </div>
    <div v-if="isExpanded && node.children" class="children">
      <TreeNodeComponent
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @check-change="$emit('check-change', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { DBElement } from '../../types/DBTypes';
import { TreeNode } from '../../types/TreeViewTypes';

export default {
  name: 'TreeNodeComponent',
  props: {
    node: {
      type: TreeNode<DBElement>,
      required: true
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    toggleCheck() {
      this.node.checked = !this.node.checked;
      this.node.indeterminate = false;
      this.$emit('check-change', this.node);
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style>
.tree-node {
  margin-left: 20px;
  background-color: slategray;
}
.node-content {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.children {
  margin-left: 20px;
}
</style>