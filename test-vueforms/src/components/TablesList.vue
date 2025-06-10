<template>
    <div class="table_description_list">
        <!-- Tables List -->
        <div class="list">
            <h3 class="h3_table_header">Disponíveis</h3>
            <label class="form_label">Selecione o esquema</label>
            <select class="form_select" id="schema_list"  @change="handleSchemaSection">
                <option 
                    v-for="schema in schemaList" 
                    :key="schema.schema_metadata.schema_name" 
                    :value="schema.schema_metadata.schema_name"
                >
                    {{ schema.schema_metadata.schema_name }}
                </option>
            </select>
            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tr @mouseover="selectedBg" @mouseout="nonSelectedBg" v-for="(option, index) in tableList" :key="index">
                    <td class="td">
                        <input
                            class="radio_buttons" 
                            :id="'chk_name_' + index" 
                            type="radio" 
                            v-model="selectedLeft" 
                            :value="option.table_metadata.table_name"/>
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
            <button @click="moveToRight" :disabled="selectedLeft.length === 0">➡️</button>
            <button @click="moveToLeft" :disabled="selectedRight.length === 0">⬅️</button>
        </div>
        
        <div v-if="selectedLeft.length !== 0" class="list">
            <label class="form_label">Table info for table {{ this.selectedLeft }}</label>
            <div>
                <label>Comment: {{ this.selectedTable.table_metadata.table_comment }}</label>
                <table class="styled-table">
                    <thead>
                        <tr >
                            <th v-for="(key, index) in Object.keys(this.selectedTable.table_metadata.columns[0])" :key="index">
                                {{  key  }}
                            </th>
                        </tr>
                    </thead>
                    <tr @mouseover="selectedBg" @mouseout="nonSelectedBg" v-for="(column, index) in this.selectedTable.table_metadata.columns" :key="index">
                        <td class="td" v-for="(value, index) in Object.values(column)"  :key="index">
                            {{ value }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "TablesList",
    props: [
        'schemas',
    ],
    data() {
        return {
            tables: [],
            schemaList: this.schemas.sort((a, b) => a.schema_metadata.schema_name.localeCompare(b.schema_metadata.schema_name)),
            // Lista inicial de itens disponíveis
            tableList: [],
            // Itens selecionados na lista de tabelas
            selectedLeft: [],
            selectedRight: [],
            selectedSchema: null,
            selectedTable: null,
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
        moveToRIght() {
            // this.leftList = [...this.leftList, ...this.selectedRight];
            // this.rightList = this.rightList.filter(item => !this.selectedRight.includes(item));
            // this.rightList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            // this.leftList.sort((a, b) => a.table_metadata.table_name.localeCompare(b.table_metadata.table_name));
            // this.selectedRight = [];
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
        async handleSchemaSection(event, option) {
            let response = [];
            this.tables= [];
            this.selectedLeft = [];
            console.log('Evento:', event); // Objeto nativo do evento
            if (option) {
                console.log('Option:', option.value); // Objeto nativo do evento
            }
            if (event.srcElement) {
                this.selectedSchema = event.srcElement.value;
                console.log("Selecionado: ", this.selectedSchema)
                await axios.get( `http://localhost:8081/api/${this.selectedSchema}/get_table_definitions`)
                    .then(res => {
                        console.log('Resposta do servidor:', res.data);
                        response = res;
                    })
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                    });

                const tables_definitions = response.data;
                tables_definitions.forEach(element => {
                    this.tables.push(element);
                });

                this.tableList = this.tables.sort((a, b) => a.table_metadata.table_comment?.localeCompare(b.table_metadata.table_comment));
            }
        },
        arrayToText(array) {
    return array.map(obj => {
      const chave = Object.keys(obj)[0];
      return `${chave}: ${obj[chave]}`;
    }).join('\n'); // ou ', ' para separar com vírgulas
  }

    },
    watch: {
        async selectedLeft(newValue) {
            console.log("Opção selecionada: ", this.selectedLeft[0])
            this.selectedTable = this.tableList.find((x) => x.table_metadata.table_name == this.selectedLeft);
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
};
</script>

<style src="../styles/TablesList.css" scoped></style>
