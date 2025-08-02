<template>
    <div class="table_description_list">
        <!-- Lista da Esquerda -->
        <div class="list">
            <h3 class="h3_table_header">Disponíveis</h3>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                        <tr @mouseover="selectedBg" @mouseout="nonSelectedBg" v-for="(item, index) in leftList" :key="index">
                <!-- <label> -->
                    <td class="td">
                        <input :id="'chk_name_' + index" type="checkbox" :value="item" v-model="selectedLeft" />
                        <label :for="'chk_name_' + index">
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
        <div class="right_list">
            <h3 class="h3_table_header">Selecionados</h3>
            <ul class="tree">
                <li>
                    <details open>
                        <summary>Tabelas</summary>
                        <ul>
                            <li>
                            <details v-for="(item, index) in rightList" :key="index" open>
                                <summary>
                                    <div>
                                        <input :id="'chk_name_' + item.table_metadata.table_name" type="checkbox" :value="item" v-model="selectedRight" />
                                        {{ item.table_metadata.table_name }} - {{ item.table_metadata.table_comment }}
                                    </div>
                                </summary>
                                <table class="styled-table">
                                    <thead>
                                        <tr>
                                            <th>Column Name</th>
                                            <th>Data type</th>
                                            <th>Maximum length</th>
                                            <th>Nullable</th>
                                            <th>Default</th>
                                            <th>User defined type</th>
                                            <th>Comment</th>
                                            <th>Constraint name</th>
                                            <th>Constraint type</th>
                                            <th>FK name</th>
                                            <th>FK table</th>
                                            <th>FK column</th>
                                        </tr>
                                    </thead>
                                    <tr v-for="(column, column_index) in item.table_metadata.columns" :key="column_index">
                                        <td>{{ column.column_name }}</td>
                                        <td>{{ column.data_type }}</td>
                                        <td>{{ column.character_maximum_length }}</td>
                                        <td>{{ column.is_nullable }}</td>
                                        <td>{{ column.column_default }}</td>
                                        <td>{{ column.user_defined_type }} </td>
                                        <td>{{ column.column_comment }} </td>
                                        <td>{{ column.constraints.contraint_name }} </td>
                                        <td>{{ column.constraints.contraint_type }} </td>
                                        <td>{{ column.foreign_keys.foreign_key_name }} </td>
                                        <td>{{ column.foreign_keys.foreign_table_name }} </td>
                                        <td>{{ column.foreign_keys.foreign_column_name }} </td>
                                    </tr>
                                </table>
                            </details>
                            </li>
                        </ul>
                    </details>
                    <!-- Botão para Ações -->
                    <div class="action-button">
                        <button @click="performAction" :disabled="selectedRight.length === 0">Synchronize data dictionary</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "TableDescriptionList",
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
            let items  = element.children;
            element.childNodes.forEach(item => {
                let sibiling = item.nextSibling;
                if (sibiling && sibiling.tagName === 'TD') {
                    sibiling.style.backgroundColor = '#5f5f5f';
                }
            });
            element.style.backgroundColor = '#5f5f5f';
        },
        nonSelectedBg(event) {
            const element = event.currentTarget;
            let items  = element.children;
            element.childNodes.forEach(item => {
                let sibiling = item.nextSibling;
                if (sibiling && sibiling.tagName === 'TD') {
                    sibiling.style.backgroundColor = '#000000';
                }
            });
            element.style.backgroundColor = '#000000';
        },
        // Realiza uma ação com os itens selecionados na lista da direita
        performAction() {
            alert(`Ação realizada com: ${this.selectedRight.map(item => item.table_metadata.table_name).join(', ')}`);
        }
    }
};
</script>

<style src="../styles/TableDescriptionList.css" scoped></style>
