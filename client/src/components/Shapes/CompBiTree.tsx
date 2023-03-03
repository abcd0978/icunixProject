import type { BT_Node } from "./Node"



// 완전이진트리 노드
/* 
class CompBiTree<T>{
    private root: BT_Node<T>;
    private size: number;
    private height: number;

    constructor() {
        this.root = new BT_Node<T>();
        this.size = 0;
        this.height = 0;
    }

    // Miscmiscellaneous
    getRoot(): BT_Node<T> {
        return this.root;
    }

    getSize(): number {
        return this.size;
    }

    getHeight(): number {
        return this.height;
    }

    getNodes(): BT_Node<T>[] {
        // TODO: BFS로 구현
        return [];
    }


    // Node
    addNode(data: T): CBT<T> {
        const node = new BT_Node<T>();
        node.setData(data);

        if (this.size === 0) {
            this.root = node;
            this.size++;
            return this;
        }

        let result = []
        let current = this.root;
        let tempSize = this.size

        while(tempSize!==1){
            if(tempSize%2===0){
                tempSize/=2;
                result.push(0);
            }else{
                tempSize--;
                tempSize/=2;
                result.push(1)
            }
        }

        while (result.length > 0) {
            if (result.pop() === 0) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (current.left === null) {
            current.left = node;
            node.setParent(current);
        }
        else if (current.right === null) {
            current.right = node;
            node.setParent(current);
        }
        this.size++;
        return this;
    }
}

export type { BT_Node, CBT };*/