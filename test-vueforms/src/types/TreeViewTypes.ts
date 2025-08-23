import { v4 as uuidv4 } from 'uuid';

const joe = uuidv4();

export interface ITreeNode<T> {
    id: string;
    name: string;
    data: T | null;
    parent: ITreeNode<T> | null;  // Referência direta ao pai
    children: ITreeNode<T>[];
    checked: boolean;
    indeterminate: boolean;
}

export class TreeNode<T> implements ITreeNode<T> {
    id: string;
    name: string;
    data: T | null;
    parent: ITreeNode<T> | null;
    children: ITreeNode<T>[];
    checked: boolean;
    indeterminate: boolean;
    
    constructor(name: string = '', data: T | null = null, parent: ITreeNode<T> | null = null, children: Array<ITreeNode<T>> = []) {
        if (parent && name === '') {
            throw Error('TreeNode with empty name is reserved for the root node!');
        }

        // if (!parent && name !== '') {
        //     throw Error('TreeNode root element should have empty name!')
        // }

        this.id = uuidv4()
        this.name = name;
        this.data = data;
        this.children = children;
        this.parent = parent;
        this.checked = false;
        this.indeterminate = false;
    }
}

function getNameAttribute(obj: any): string {
  return obj.name;
}

export class Tree<T> {
    private root: ITreeNode<T> | null = null;
    private nodes: Map<string, ITreeNode<T>> = new Map();

    constructor(rootData?: T) {
        if (rootData) {
            let hasName: boolean = "name" in (rootData as Object);
            let dbName: string = hasName ? getNameAttribute(rootData) : 'Database';
            this.root = new TreeNode(dbName, rootData);
            this.nodes.set(this.root.name, this.root);1
        }
    }

    addNode(name: string, data: T, parentName: string): void {
        if (!this.nodes.has(parentName)) {
            throw new Error(`Parent node with name ${parentName} not found`);
        }

        const parentNode = this.nodes.get(parentName)!;
        const newNode = new TreeNode(name, data, parentNode);
        parentNode.children.push(newNode);  // O pai recebe o novo nó como filho
        this.nodes.set(name, newNode);
    }

    // Adiciona uma coleção de filhos ao nó atual
    addChildren(parentName: string, children: Array<ITreeNode<T>>): void {
        if (children.length < 1) {
            return;
        }

        if (!this.nodes.has(parentName)) {
            throw new Error(`Parent node with name ${parentName} not found`);
        }

        for (const child of children) {
            this.addChild(parentName, child)
        }
    }

    // Adiciona uma coleção de filhos ao nó atual
    addChild(parentName: string, child: ITreeNode<T>): void {
        if (!this.nodes.has(parentName)) {
            throw new Error(`Parent node with name ${parentName} not found`);
        }

        // atualiza o parent para manter integridade
        const parentNode = this.nodes.get(parentName)!;
        child.parent = parentNode;

        // Adiciona o nó filho
        parentNode.children.push(child);
        this.nodes.set(child.name, child)
        if (child.children.length > 0) {
            this.setNodesFromChildren(child.children);
        }
    }

    setNodesFromChildren(children: ITreeNode<T>[]) {
        for (const child of children) {
            if (child.children.length > 0) {
                this.setNodesFromChildren(child.children);
            }
            this.nodes.set(child.name, child);
        }
    }

    // Encontra um nó pelo ID
    findNode(name: string): ITreeNode<T> | null {
        return this.nodes.get(name) || null;
    }

    // Navegação para cima (pai)
    getParent(nodeName: string): ITreeNode<T> | null {
        const node = this.findNode(nodeName);
        return node ? node.parent : null;
    }

    // Navegação para baixo (filhos)
    getChildren(nodeName: string): ITreeNode<T>[] {
        const node = this.findNode(nodeName);
        return node ? node.children : [];
    }

    // Verifica se um nó é raiz
    isRoot(nodeName: string): boolean {
        const node = this.findNode(nodeName);
        return node ? node.parent === null : false;
    }

    // Obtém o caminho desde a raiz até o nó especificado
    getPath(nodeName: string): ITreeNode<T>[] {
        const path: ITreeNode<T>[] = [];
        let currentNode = this.findNode(nodeName);

        while (currentNode) {
            path.unshift(currentNode);
            currentNode = currentNode.parent;
        }

        return path;
    }

    getRoot() : ITreeNode<T> | null {
        return this.root;
    }
}

