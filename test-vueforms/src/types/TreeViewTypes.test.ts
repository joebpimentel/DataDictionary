import { describe, expect, test, beforeAll } from 'vitest'
import { TreeNode, Tree } from './TreeViewTypes.js'


// Dados compartilhados
let rootNode: TreeNode<string>;
let child1: TreeNode<string>;
let child2: TreeNode<string>;
let child1_1: TreeNode<string>;
let child1_2: TreeNode<string>;
let child2_1: TreeNode<string>;
let child2_2: TreeNode<string>;
let treeView: Tree<string>;

describe('TreeViewTypes', () => {
    beforeAll(() => {
        // Executado UMA VEZ antes de todos os testes (ótimo para dados imutáveis)
        treeView = new Tree<string>('xpto');
        rootNode = treeView.findNode('') as TreeNode<string>;

        child1 = new TreeNode('child1', "Node 1", rootNode);
        child2 = new TreeNode('child2', "Node 2", rootNode);

        child1_1 = new TreeNode('child1_1', "Node 1.1", child1);
        child1_2 = new TreeNode('child1_2', "Node 1.2", child1);
        child2_1 = new TreeNode('child2_1', "Node 2.1", child2);
        child2_2 = new TreeNode('child2_2', "Node 2.2", child2);
    });

    test('Setup Data', () => {
        // Root node
        expect(rootNode).toBeDefined();
        expect(rootNode).not.toBeNull();
        expect(rootNode.id.length).toBe(36);
        expect(rootNode.name).toBe(``);
        expect(rootNode.data).toBe('xpto');
        expect(rootNode.parent).toBeNull();
        expect(rootNode.children.length).toBe(0);

        // child1
        expect(child1.id.length).toBe(36);
        expect(child1.name).toBe('child1');
        expect(child1.data).toBe('Node 1');
        expect(child1.parent).toBe(rootNode);
        expect(child1.children.length).toBe(0);

        // child2
        expect(child2.id.length).toBe(36);
        expect(child2.name).toBe('child2');
        expect(child2.data).toBe('Node 2');
        expect(child2.parent).toBe(rootNode);
        expect(child2.children.length).toBe(0);

        // child1_1
        expect(child1_1.id.length).toBe(36);
        expect(child1_1.name).toBe('child1_1');
        expect(child1_1.data).toBe('Node 1.1');
        expect(child1_1.parent).toBe(child1);
        expect(child1_1.children.length).toBe(0);

        // child1_2
        expect(child1_2.id.length).toBe(36);
        expect(child1_2.name).toBe('child1_2');
        expect(child1_2.data).toBe('Node 1.2');
        expect(child1_2.parent).toBe(child1);
        expect(child1_2.children.length).toBe(0);

        // child2_1
        expect(child2_1.id.length).toBe(36);
        expect(child2_1.name).toBe('child2_1');
        expect(child2_1.data).toBe('Node 2.1');
        expect(child2_1.parent).toBe(child2);
        expect(child2_1.children.length).toBe(0);

        // child2_2
        expect(child2_2.id.length).toBe(36);
        expect(child2_2.name).toBe('child2_2');
        expect(child2_2.data).toBe('Node 2.2');
        expect(child2_2.parent).toBe(child2);
        expect(child2_2.children.length).toBe(0);
    });


    test('TreeNode', () => {
        rootNode.children.push(child1);
        rootNode.children.push(child2);

        expect(rootNode.children.length).toBe(2);
        expect(rootNode.children[0].id).toBe(child1.id);
        expect(rootNode.children[0].parent);
        expect(rootNode.children[0].parent?.id).toBe(rootNode.id);
        expect(rootNode.children[1].id).toBe(child2.id);
        expect(rootNode.children[1].parent);
        expect(rootNode.children[1].parent?.id).toBe(rootNode.id);

        let badNode: TreeNode<string>;
        expect(() => new TreeNode('', '', rootNode, [])).toThrowError('TreeNode with empty name is reserved for the root node!');
        expect(() => new TreeNode('Bad Root', '', null, [])).toThrowError('TreeNode root element should have empty name!');
    });

    test('TreeView', () => {

        // Test addChild method
        treeView.addChild(rootNode.name, child1);
        let addedChildNode = treeView.findNode(child1.name)!;
        expect(addedChildNode.id).toBe(child1.id);
        expect(addedChildNode.name).toBe('child1');
        expect(addedChildNode.data).toBe('Node 1');
        expect(addedChildNode.parent).toBe(rootNode);
        expect(addedChildNode.children.length).toBe(0);

        treeView.addChild(rootNode.name, child2);
        addedChildNode = treeView.findNode(child2.name)!;
        expect(addedChildNode.id).toBe(child2.id);
        expect(addedChildNode.name).toBe('child2');
        expect(addedChildNode.data).toBe('Node 2');
        expect(addedChildNode.parent).toBe(rootNode);
        expect(addedChildNode.children.length).toBe(0);

        expect(() => treeView.addChild('Non-existent node', child2_1)).toThrowError('Parent node with name Non-existent node not found');

        // Test addChildren
        treeView.addChildren(child1.name, [child1_1, child1_2]);
        let testNode = treeView.findNode(child1.name)!;
        expect(testNode.id).toBe(child1.id);
        expect(testNode.children.length).toBe(2);
        treeView.addChildren(child1.name, []);
        expect(testNode.children.length).toBe(2);

        expect(() => treeView.addChildren('Non-existent node', [child2_1])).toThrowError('Parent node with name Non-existent node not found');


        // getChildren
        let testChildren = treeView.getChildren(testNode.name);
        expect(testChildren.length).toBe(2);
        expect(testChildren[0].id).toBe(child1_1.id)
        expect(testChildren[0].name).toBe(child1_1.name)
        expect(testChildren[0].parent?.id).toBe(testNode.id)
        expect(testChildren[1].id).toBe(child1_2.id)
        expect(testChildren[1].name).toBe(child1_2.name)
        expect(testChildren[1].parent?.id).toBe(testNode.id)

        // getParent
        let testParent = treeView.getParent(testChildren[0].name)!;
        expect(testParent.id).toBe(testNode.id);
        expect(testParent.name).toBe(testNode.name);

        // isRoot
        expect(treeView.isRoot(testParent.name)).toBe(false);
        expect(treeView.isRoot(testChildren[0].name)).toBe(false);
        expect(treeView.isRoot(testChildren[1].name)).toBe(false);
        expect(treeView.isRoot(rootNode.name)).toBe(true);

        // getPath
        let pathFromRootToNode = treeView.getPath(child1_1.name);
        expect(pathFromRootToNode.length).toBe(3);
        expect(pathFromRootToNode[0].name).toBe('');
        expect(pathFromRootToNode[1].name).toBe('child1');
        expect(pathFromRootToNode[2].name).toBe('child1_1');


        // addNode
        treeView.addNode('child2_1', 'Node 2.1', child2.name)
        expect(child2.children.length).toBe(1);
        let addedNode = treeView.findNode('child2_1')!;
        expect(addedNode.parent?.id).toBe(child2.id);
        treeView.addNode('child2_2', 'Node 2.2', child2.name)
        expect(child2.children.length).toBe(2);
        addedNode = treeView.findNode('child2_2')!;
        expect(addedNode.parent?.id).toBe(child2.id);

        expect(() => treeView.addNode('bad_node', 'Bad Parent Node', 'Non-existent node')).toThrowError('Parent node with name Non-existent node not found');
    });
})
