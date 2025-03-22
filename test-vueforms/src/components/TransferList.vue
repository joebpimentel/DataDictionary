<template>
    <div class="transfer-list">
        <!-- Lista da Esquerda -->
        <div class="list">
            <h3 class="h3_table_header">Disponíveis</h3>
            <table>
                <tr v-for="(item, index) in leftList" :key="index">
                <!-- <label> -->
                    <td class="td">
                        <input :id="'chk_name_' + index" type="checkbox" :value="item" v-model="selectedLeft" />
                        <label :for="'chk_name_' + index"  @mouseover="selectedBg" @mouseout="nonSelectedBg">
                                {{ item.table_metadata.table_name }} 
                        </label>
                    </td>
                    <td class="td">
                        {{ item.table_metadata.table_comment }}
                    </td>
                <!-- </label> -->
                </tr>
            </table>
        </div>

        <!-- Botões de Ação -->
        <div class="actions">
            <button @click="moveToRight" :disabled="selectedLeft.length === 0">➡️</button>
            <button @click="moveToLeft" :disabled="selectedRight.length === 0">⬅️</button>
        </div>

        <!-- Lista da Direita -->
        <div class="list">
            <h3 class="h3_table_header">Selecionados</h3>
            <ul>
                <table>
                    <tr v-for="(item, index) in rightList" :key="index">
                    <!-- <label> -->
                        <td>
                            <input type="checkbox" :value="item" v-model="selectedRight" />
                        </td>
                        <td class="td">
                            {{ item.table_metadata.table_name }}
                        </td>
                        <td class="td">
                            {{ item.table_metadata.table_comment }}
                        </td>
                    </tr>
                    <!-- </label> -->
                </table>
            </ul>
        </div>

        <!-- Botão para Ações -->
        <div class="action-button">
            <button @click="performAction" :disabled="rightList.length === 0">
                Realizar Ação
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShoppingCartPage",
    props: ['tables'],
    data() {
        return {
            // Lista inicial de itens disponíveis
            leftList: this.tables.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name)),
            // Lista inicial de itens selecionados (vazia)
            rightList: [],
            // Itens selecionados na lista da esquerda
            selectedLeft: [],
            // Itens selecionados na lista da direita
            selectedRight: []
        };
    },
    methods: {
        // Move itens selecionados da esquerda para a direita
        moveToRight() {
            this.rightList = [...this.rightList, ...this.selectedLeft];
            this.leftList = this.leftList.filter(item => !this.selectedLeft.includes(item));
            this.rightList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            this.leftList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            this.selectedLeft = [];
        },
        // Move itens selecionados da direita para a esquerda
        moveToLeft() {
            this.leftList = [...this.leftList, ...this.selectedRight];
            this.rightList = this.rightList.filter(item => !this.selectedRight.includes(item));
            this.rightList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            this.leftList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            this.selectedRight = [];
        },
        selectedBg(event) {
            const element = event.currentTarget;
            element.style.backgroundColor = '#5f5f5f';
            element.style.foregroundColor = '#ff0000';
        },
        nonSelectedBg(event) {
            const element = event.currentTarget;
            element.style.backgroundColor = '#000000';
            element.style.foregroundColor = '#ff0000';
        },
        // Realiza uma ação com os itens selecionados na lista da direita
        performAction() {
            alert(`Ação realizada com: ${this.rightList.map(item => item.name).join(', ')}`);
        }
    }
};
</script>

<style scoped>
.transfer-list {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

.list {
    border: 1px solid #ccc;
    padding: 10px;
    width: 400px;
}

.h3_table_header {
    text-align: left;
}

.td {
    text-align: left;
    width: 400;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 5px 0;
}

.actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.action-button {
    margin-top: 20px;
}
</style>