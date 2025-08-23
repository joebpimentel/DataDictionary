<template>
  <div class="tree-view">
    <TreeNodeComponent v-for="node of treeRoot.children" :key="node.id" :node="node"
      @check-change="handleCheckChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeNodeComponent from './TreeNodeComponent.vue';
import { ITreeNode, TreeNode } from '../../types/TreeViewTypes';
import { DBElement } from '../../types/DBTypes';


export default defineComponent({
  name: "TreeViewComponent",
  components: {
    TreeNodeComponent
  },
  props: {
    treeRoot: {
      type: TreeNode<DBElement>,
      required: true
    }
  },
  methods: {
    handleCheckChange(node: ITreeNode<DBElement>) {
      // Atualize o estado dos nós pais/children conforme necessário
      this.updateParentStates(node);
      this.updateChildrenStates(node);
    },
    updateParentStates(node: ITreeNode<DBElement>) {
      // Lógica para atualizar os estados dos nós pais
      let parent = this.findParent(node.id);
      while (parent) {
        const children = this.getChildren(parent.id);
        const checkedCount = children.filter(c => c.checked).length;
        const indeterminateCount = children.filter(c => c.indeterminate).length;

        if (checkedCount === children.length) {
          parent.checked = true;
          parent.indeterminate = false;
        } else if (checkedCount > 0 || indeterminateCount > 0) {
          parent.checked = false;
          parent.indeterminate = true;
        } else {
          parent.checked = false;
          parent.indeterminate = false;
        }

        parent = this.findParent(parent.id);
      }
    },
    updateChildrenStates(node: ITreeNode<DBElement>) {
      // Lógica para atualizar os estados dos nós filhos
      if (node.children && node.children.length) {
        node.children.forEach(child => {
          child.checked = node.checked;
          child.indeterminate = false;
          this.updateChildrenStates(child);
        });
      }
    },
    findParent(nodeId: string): ITreeNode<DBElement> | null {
      // Implemente a lógica para encontrar o nó pai
      // (depende da estrutura da sua árvore)
      return null

    },
    getChildren(nodeId: string): Array<ITreeNode<DBElement>> {
      // Implemente a lógica para obter os filhos de um nó
      // (depende da estrutura da sua árvore)

      return [];
    }
  }
});
</script>

<style scoped>
.tree-view {
  /* Estilos específicos do container principal */
  padding: 8px;
  font-family: Arial, sans-serif;
}
</style>
