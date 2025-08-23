<template>
    <div class="table_description_list">
        <!-- Tables List -->
        <div class="list">
            <h3 class="h3_table_header">Database Schema and Object</h3>
            <label class="form_label">Selecione o esquema</label>
            <TreeViewComponent>
            </TreeViewComponent>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tr @mouseover="selectedBg" @mouseout="nonSelectedBg" v-for="(option, index) in tableList"
                    :key="option.table_metadata.table_name">
                    <td class="td">
                        <input class="radio_buttons" :id="'chk_name_' + index" type="radio" v-model="selectedItem"
                            :value="option.table_metadata.table_name" />
                        <label :for="'chk_name_' + index">
                            {{ option.table_metadata.table_name }}
                        </label>
                    </td>
                    <td class="td">
                        {{ option.table_metadata.table_comment }}
                    </td>
                    <!-- </label> -->
                </tr>
            </table>
        </div>

        <!-- Botões de Ação -->
        <div class="actions">
            <!-- <button @click="moveToRight" :disabled="selectedLeft.length === 0">➡️</button> -->
            <button @click="moveToRight" :disabled="selectedLeft === null">➡️</button>
            <button @click="moveToLeft" :disabled="selectedRight.length === 0">⬅️</button>
        </div>

        <div v-if="selectedLeft?.length !== 0" class="list">
            <label class="form_label">Table info for table {{ selectedLeft }}</label>
            <div>
                <label>Comment: {{ selectedTable?.table_metadata.table_comment ?? 'None' }}</label>
                <table :class="$style['styled-table']">
                    <thead>
                        <tr>
                            <th v-if="selectedTable"
                                v-for="(key, index) in Object.keys(selectedTable.table_metadata.columns[0])"
                                :key="index">
                                {{ key }}
                            </th>
                        </tr>
                    </thead>
                    <tr @mouseover="selectedBg" @mouseout="nonSelectedBg"
                        v-for="(column, index) in selectedTable?.table_metadata.columns" :key="index">
                        <td class="td" v-for="(value, index) in Object.values(column)" :key="index">
                            {{ value }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import axios from "axios";  
import { TableResponseType } from "../types/DBTypes";
import { defineComponent, PropType } from "vue"
import TreeViewComponent from "./tree_view/TreeViewComponent.vue";

interface ITable extends TableResponseType {
    id: number
}

export default defineComponent({
    name: "DBEntitiesTreeView",
    data() {
        return {
            tables: new Array<ITable>(),
            // Lista inicial de itens disponíveis
            tableList: new Array<ITable>(),
            // Itens selecionados na lista de tabelas
            selectedLeft: null as Array<ITable>|null,
            selectedItem: null,
            selectedRight: [],
            selectedSchema: null as string|null,
            selectedTable: null as ITable|null,
        };
    },
    methods: {
        // Move itens selecionados da direita para a esquerda
        moveToLeft() {
            // this.leftList = [...this.leftList, ...this.selectedRight];
            // this.rightList = this.rightList.filter(item => !this.selectedRight.includes(item));
            // this.rightList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            // this.leftList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            // this.selectedRight = [];
        },
        moveToRight() {
            // this.leftList = [...this.leftList, ...this.selectedRight];
            // this.rightList = this.rightList.filter(item => !this.selectedRight.includes(item));
            // this.rightList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            // this.leftList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            // this.selectedRight = [];
        },
        selectedBg(event: Event) {
            const element = event.currentTarget as HTMLBaseElement;
            if (element) {
                if (element.childNodes) {
                    element.childNodes.forEach(item => {
                        let sibiling = item.nextSibling as HTMLBaseElement;
                        if (sibiling && sibiling.tagName === 'TD') {
                            sibiling.style.backgroundColor = '#5f5f5f';
                        }
                    });
                    element.style.backgroundColor = '#5f5f5f';
                }
            }
        },
        nonSelectedBg(event: Event) {
            const element = event.currentTarget as HTMLBaseElement;
            if (element) {
                if (element.childNodes) {
                    element.childNodes.forEach(item => {
                        let sibiling = item.nextSibling as HTMLBaseElement;
                        if (sibiling && sibiling.tagName === 'TD') {
                            sibiling.style.backgroundColor = '#000000';
                        }
                    });
                    element.style.backgroundColor = '#000000';
                }
            }
        },
        // onLabelClicked(event) {
        //     console.log("label clicked: ", event);
        // },
        // Realiza uma ação com os itens selecionados na lista da direita
        // async handleTableSection(event, option) {
        //     console.log('Evento:', event); // Objeto nativo do evento
        //     if (option) {
        //         console.log('Option:', option.value); // Objeto nativo do evento
        //     }
        //     if (event.currentTarget.id) {
        //         let elements = event.currentTarget.id.split('_');
        //         let hasTableDefinition = false;
        //         if (elements.length > 0) {
        //             let index = Number(elements.pop());
        //             if (index != NaN) {
        //                 if (this.tables.length > index && this.selectedSchema != null) {
        //                     this.selectedTable = this.tables[index].table_metadata.table_name;
        //                     console.log("Selected Table: ", this.selectedTable);
        //                     let response = [];
        //                     await axios.get(`http://localhost:8081/api/get_dd_table/${this.selectedSchema}/${this.selectedTable}`)
        //                         .then(res => {
        //                             console.log('Resposta do servidor:', res.data);
        //                             response = res;
        //                         })
        //                         .catch(error => {
        //                             console.error('Erro na requisição:', error);
        //                         });
        //                 }
        //             }
        //         }
        //     }
        // },
        async handleSchemaSection(evt:  Event) {
            let response: axios.AxiosResponse<any, any>;
            this.tables= [];
            this.selectedLeft = null;
            const target = evt.currentTarget as HTMLSelectElement;
            console.log('Evento:', evt); // Objeto nativo do evento
            if (target) {
                console.log('Option:', target.selectedOptions); // Objeto nativo do evento
                this.selectedSchema = target.selectedOptions[0].value;
                console.log("Selecionado: ", this.selectedSchema)
                await axios.get( `http://localhost:8081/api/${this.selectedSchema}/get_table_definitions`)
                    .then(res => {
                        console.log('Resposta do servidor:', res.data);
                        response = res;
                        const tables_definitions = response.data as Array<TableResponseType>;
                        tables_definitions.forEach((element: TableResponseType, index: number): void => {
                            this.tables.push({...element, id: index } );
                        });

                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                    });

                
                this.tableList = this.tables.sort((a: TableResponseType, b: TableResponseType) => a.table_metadata.table_comment?.localeCompare(b.table_metadata.table_comment));
            }
        },  
        // arrayToText(array) {
        //     return array.map(obj => {
        //         const chave = Object.keys(obj)[0];
        //         return `${chave}: ${obj[chave]}`;
        //     }).join('\n'); // ou ', ' para separar com vírgulas
        // }

    },

    watch: {
        async selectedLeft(newValue: string) {
            console.log("Opção selecionada: ", this.selectedLeft
                ? this.selectedLeft[0] ?? ''
                : '');
            this.selectedTable = this.tableList.find((x) => x.table_metadata.table_name === newValue) as ITable|null;
            if (this.selectedTable) {
                console.log("Tabela selecionada: ", this.selectedTable.table_metadata.table_comment);
                let response = [];
                await axios.get(`http://localhost:8081/api/get_dd_table/${this.selectedSchema}/${newValue}`)
                    .then(res => {
                        console.log('Resposta do servidor:', res.data);
                        let data = res.data;

                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                    });
                    
            }
        }
    }
});
</script>

<style module>
.tree {
  --spacing: 1.5rem;
  --radius: 10px;
  text-align: left;
}

.tree li details {
  display: block;
  position: relative;
  padding-left: calc(2 * var(--spacing) - var(--radius) - 2px);
}

.tree ul {
  margin-left: calc(var(--radius) - var(--spacing));
  padding-left: 0;
}

.tree ul li details {
  border-left: 2px solid 
}

.tree ul li details::before  {
  content: '';
  display: block;
  left: -2px;
  position: absolute;
  top: calc(var(--spacing) / -3);
  left: -2px;
  width: calc(var(--spacing) - 2px);
  height: calc(var(--spacing) - 4px);
  border: solid white;
  border-width: 0 0 2px 2px;
}

.tree ul li:last-child details:last-child {
  border-color: transparent;
}

.tree ul li::before  {
  content: '';
  display: block;
  position: absolute;
  top: calc(var(--spacing) / -2);
  left: -2px;
  width: calc(var(--spacing) + 2px);
  height: calc(var(--spacing) + 1px);
  border: solid white;
  border-width: 0 0 2px 2px;
}

.tree summary {
  display: block;
  cursor: pointer;
}

.tree summary::marker,
.tree summary::-webkit-details-marker {
  display: none;
}

.tree summary:focus {
  outline: none;
}

.tree summary:focus-visible {
  outline: 1px dotted #000;
}

.tree li::after,
.tree summary::before {
  content: '';
  display: block;
  position: absolute;
  top: calc(var(--spacing) / 2 - var(--radius));
  left: calc(var(--spacing) - var(--radius) - 1px);
  width: calc(2 * var(--radius));
  height: calc(2 * var(--radius));
  border-radius: 50%;
}

.tree summary::before {
  z-index: 1;
  background: #696 url('../assets/images/expand-collapse.svg') 0 0;
}

.tree summary summary::before {
  z-index: 1;
  background: #696 url('../assets/images/expand-collapse.svg') 0 0;
}

.tree details[open] > summary::before {
  background-position: calc(-2 * var(--radius)) 0;
}

.styled-table {
    border-collapse: collapse;
    margin: 10px 0 10px 0;
    font-size: 1.1em;
    font-family: sans-serif;
    min-width: 200px;
    max-height: 20%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #005050;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid white;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #005050;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

.table_description_list {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

.list {
    border: 1px solid #ccc;
    padding: 10px;
    min-width: 400px;
}

.right_list {
    border: 1px solid #ccc;
    padding: 10px;
    min-width: 1200px;
}

.h3_table_header {
    text-align: left;
}

.form_label {
  font-size: 1.3em;
  font-family: sans-serif;
}

.form_select {
  margin: 1rem;
  padding: 0.5ch;
  font-size: 1.3em;
  font-family: sans-serif;
}
.radio_buttons {
  background-color: #ffffff;
  margin-right: 10px;
  margin-left: -5px;
}

table {
  /* border: 1px solid white; */
  text-align: left;
}
th {
  border: 1px solid white;
}
td {
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  text-align: left;

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
